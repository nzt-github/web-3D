/*!
 * 360portal.js
 * (c) 2019-2020 
 */
import modelConfig from './config.json'
import VGame from './plugin/index.esm.js'

class Model {
    async init() {
        this.stage = '' //vGame实例
        this.modelArray = [] //vGame模型实例
        this.currentMode = '' //当前模型实例
        this.initCameraPos = '' //摄像机高度
        this.threeBox = new VGame.THREE.Box3
        this.threeVector = new VGame.THREE.Vector3
        this.modelParam = modelConfig.modelVar
        this.commonParam = modelConfig.commonVar
        this.modelPanoramic = this.commonParam.panoramicImg.length > 0
        this.tweenTime = this.modelPanoramic ? 2000 : 600 //设置缓动时间
        this.interception = false

        this.lastModelParam = this.getLastModelParam()
        this.initStage()
        this.initBgMap()
        const envMap = await VGame.Loader.initEnvMap(this.modelParam[0].envUrl)
        const gltf = await this.loadGLTF(this.modelParam[0].modelUrl, this.modelLoadProgress)
            // 加载环境光
        this.stage.scene.environment = envMap
            // 去掉加载动画
        this.initCameraPos = JSON.parse(JSON.stringify(this.stage.camera.position))
        this.adjustModelMaterial(gltf)
        this.initMode(gltf)
        this.setEnvInfo(envMap)
        this.modelLoaded()
        this.resizeCanvas()
        this.initShowTxt()
        this.initColorItem()
        this.addEventListener()
    }
    async loadGLTF(url, loadProcess) {
        return await VGame.Loader.loadGLTF(url, loadProcess)
    }
    addEventListener() {
        this.modeItem = document.querySelectorAll('.mode-list .mode-item')
        this.currentLine = document.querySelector('.mode-current-line')
        document.querySelector('#view-item-free,.view-reset').addEventListener('click', e => {
            if (this.interception) return
            this.freeModel(this.currentMode)
            this.modeItem.forEach(vv => {
                vv.classList.remove("current")
            })
            this.currentLine.setAttribute('style', 'transform:matrix(1, 0, 0, 1, 0, 0)')
            this.findDelegateNode(e, '#view-item-free').classList.add('current')
        })
        document.querySelector('#view-item-show').addEventListener('click', e => {
            if (this.interception) return
            document.querySelector('.view-progress-box .view-progress-li-box strong').click()
            this.modeItem.forEach(vv => {
                vv.classList.remove("current")
            })
            this.currentLine.setAttribute('style', 'transform:matrix(1, 0, 0, 1, 0, 36)')
            this.findDelegateNode(e, '#view-item-show').classList.add('current')
        })
        document.querySelectorAll('.view-progress-box .view-progress-li-box strong').forEach((e, index) => {
            e.addEventListener('click', e => {
                if (this.interception) return
                this.tweenToPos(this.commonParam.showModel[index])
                document.querySelectorAll('.view-progress-li-box strong').forEach((Dom) => {
                    Dom.classList.remove('active')
                })
                this.findDelegateNode(e, '.view-progress-li-box strong').classList.add('active')
                document.querySelector('#view-progress-line-active') && (document.querySelector('#view-progress-line-active').style = 'margin-left:' + (index) * 30 + '%;')
            })
        })
        document.querySelectorAll('.view-colors .color-item').forEach((e, index) => {
            e.addEventListener('click', e => {
                if (!this.modelArray[index]) {
                    this.Toast()
                    return
                }
                if (this.modelArray[index].model.uuid === this.currentMode.model.uuid) return //避免重复加载模型
                this.changeModel(index)
                document.querySelectorAll('.view-colors .color-item').forEach((Dom) => {
                    Dom.classList.remove('current')
                })
                this.findDelegateNode(e, '.view-colors .color-item').classList.add('current')
            })
        })
    }
    freeModel(model) {
        model = model || this.modelArray[0]
        this.currentMode = model
        this.currentMode.freeModeFlag = true
        this.currentMode.control.zoomSpeed = 0.2
        this.setCameraPos()
        this.enlargeCamera()
        this.resetModelPos()
        this.allowScroll()
            //重置缩放比
        model.control.minDistance = this.initCameraPos.z / 2
        model.control.maxDistance = this.initCameraPos.z * 2
        model.tween.stop()
        let rotateJson = this.computeDisParam()
        let rotateTime = this.computeModelAniTime(rotateJson)
        model.tween.to({
            rotateX: rotateJson.x,
            rotateY: rotateJson.y,
            rotateZ: 0,
            time: rotateTime / 1.5,
            type: "outCube"
        }).then(() => {
            model.rotateY = 0
            model.rotateX = 0
            this.resetControl(true)
            if (this.modelPanoramic) return
            model.tween.repeat({
                rotateY: 360,
                time: this.tweenTime
            })
        })
    }
    resetControl(free = true) {
            this.currentMode.control.enableRotate = free
            this.panoramicMode(free)
            this.currentMode.control.update()
        }
        /**
         * scale 放大倍数
         */
    enlargeCamera(scale) {
        scale = scale || 1
        this.stage.camera.position.z = this.initCameraPos.z * scale
    }
    tweenToPos(modelParam, model) {
        if (this.interception) return
        model = model || this.currentMode
        const rotatePos = modelParam.rotatePos
        const scale = modelParam.scale || 1
        const modelPos = modelParam.modelPos || { 'x': model.x, 'y': model.y }
        this.interception = true
        model.freeModeFlag = false
        model.tween.stop()
            //扩大缩放比
        this.currentMode.control.zoomSpeed = 1
        model.control.minDistance = this.initCameraPos.z / 8
        this.panoramicMode(false)
        this.setCameraPos()
        this.enlargeCamera(scale)
        this.resetControl(false)
        this.resetModelPos(model, modelParam.modelPos)
        this.forbidScroll()
        let rotateJson = this.computeDisParam()
        let posX = rotateJson.x + rotatePos.x
        let posY = rotateJson.y + rotatePos.y
        let posZ = rotateJson.z + rotatePos.z
        let rotateTime = this.computeModelAniTime({ x: posX, y: posY, z: posZ })
        rotateTime = rotateTime <= 120 ? 120 : rotateTime
        model.tween.to({
            x: modelPos.x,
            y: modelPos.y,
            time: this.tweenTime
        })
        model.tween.to({
            rotateX: posX,
            rotateY: posY,
            rotateZ: posZ,
            time: rotateTime / 2,
            type: "outCube"
        }).then(() => {
            setTimeout(() => {
                this.interception = false
            }, 500)
        })
    }
    resetModelPos(model, pos = { 'x': 0, 'y': 0 }) {
        model = model || this.currentMode
        model.x = pos.x * this.windowHeight
        model.y = pos.y * this.windowHeight
        model.z = pos.z * this.windowHeight || 0
    }
    computeDisParam(model) {
        model = model || this.currentMode
        let rotateJson = {
            x: parseInt(model.rotateX / 360) * 360,
            y: parseInt(model.rotateY / 360) * 360,
            z: parseInt(model.rotateZ / 360) * 360
        }
        return rotateJson
    }
    computeModelAniTime(pos, model) {
        model = model || this.currentMode
        let timeDifX = Math.abs(model.rotateX - pos.x)
        let timeDifY = Math.abs(model.rotateY - pos.y)
        let timeDifZ = Math.abs(model.rotateZ - pos.z)
        let MaxY_X = timeDifX > timeDifY ? timeDifX : timeDifY
        return timeDifZ > MaxY_X ? timeDifZ : MaxY_X
    }
    initStage() {
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        this.stage = new VGame({
            el: 'canvas',
            width: this.windowWidth,
            height: this.windowHeight,
            zoom: true,
            // light: true
        })
    }
    initMode(modeMaterial) {
        this.box = (new VGame.THREE.Box3).setFromObject(modeMaterial)
        this.BoxLength = this.box.getSize(new VGame.THREE.Vector3).length()
        let model = new VGame.Model(modeMaterial)
        model.gltf = modeMaterial
        model.loadingFlag = true
        model.scale = this.windowHeight / this.commonParam.scaleNumber / this.BoxLength
        model.tween = new VGame.Tween(model);
        !this.modelPanoramic && model.tween.repeat({
            rotateY: 360,
            time: this.tweenTime
        })
        model.freeModeFlag = true
        model.modelPanoramic = this.modelPanoramic
        model.control = this.stage.addControl(model)
        this.currentMode = model
        this.modelArray.push(model)
        this.stage.addChild(model)
    }
    getLastModelParam() {
        let modelArray = []
        for (var i = 1; i < this.modelParam.length; i++) {
            modelArray.push(this.modelParam[i])
        }
        return modelArray
    }
    lazyLoadModel() {
        let modelArray = this.lastModelParam.shift() || {}
        if (!!Object.keys(modelArray).length) {
            VGame.Loader.initEnvMap(modelArray.envUrl).then((envMap) => {
                this.loadGLTF(modelArray.modelUrl).then((res) => {
                    let model = new VGame.Model(res)
                    model.gltf = res
                    model.scale = this.windowHeight / this.commonParam.scaleNumber / this.BoxLengt
                    model.tween = new VGame.Tween(model)
                    model.envMap = envMap
                    model.loadingFlag = true
                    this.modelArray.push(model)
                    this.lazyLoadModel()
                })
            })

        }

    }
    async setEnvInfo(envMap) {
        this.modelArray[0].envMap = envMap
        this.stage.scene.environment = envMap
    }
    async initBgMap() {
        if (!this.commonParam.panoramicImg) return
        let texture = new VGame.THREE.TextureLoader().load(this.commonParam.panoramicImg);
        let sphereGeometry = new VGame.THREE.SphereGeometry(2000, 100, 100);
        sphereGeometry.scale(-1, 1, 1);
        let sphereMaterial = new VGame.THREE.MeshBasicMaterial({ map: texture });
        let sphere = new VGame.THREE.Mesh(sphereGeometry, sphereMaterial);
        // 设置材质对象的纹理贴图
        this.stage.scene.add(sphere)
    }
    adjustModelMaterial(mode) {
        // 手动调整模型材质特性
        VGame.Loader.traverseMat(mode, e => {
            if (e.map) {
                e.map.encoding = VGame.THREE.LinearEncoding
                e.map.magFilter = VGame.THREE.NearestFilter
                e.map.minFilter = VGame.THREE.NearestFilter
                e.map.anisotropy = 1024000
                e.map.needsUpdate = true
            }
            if (e.emissiveMap) {
                e.emissiveMap.encoding = VGame.THREE.LinearEncoding
                e.emissiveMap.magFilter = VGame.THREE.NearestFilter
                e.emissiveMap.minFilter = VGame.THREE.NearestFilter
                e.emissiveMap.anisotropy = 1024000
                e.emissiveMap.needsUpdate = true
            }
            if (e.name === "充电口 耳机孔") {
                e.roughness = 0.6
            }
            if (e.name === "内部黑色金属2" || e.name === "内部黑色金属" || e.name === "内部黑色金属new") {
                e.roughness = 0.6
            }
            if (e.name === "喇叭口") {
                e.roughness = 0
            }
        })
    }
    modelLoadProgress(xhr) {
        let progressInner = document.querySelectorAll('.view-loading .progress-inner')[0]
        progressInner && (progressInner.style.width = xhr.loaded / xhr.total * 100 + "%")
        if (Math.abs(xhr.loaded - xhr.total) < 0.01) {
            document.querySelector('.view-loading div').removeChild(document.querySelector('.progress-bar'))
            document.querySelector('.view-loading div').insertAdjacentHTML("beforeend", "<p>加载完成,360度体验即将呈现</p>")
        }
    }
    modelLoaded() {
        document.querySelector('.view-loading').parentNode.removeChild(document.querySelector('.view-loading'))
        document.body.className = 'env'
        this.lazyLoadModel()
    }
    findDelegateNode(e, elementSelector) {
        // loop parent nodes from the target to the delegation node
        for (var target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches(elementSelector)) {
                return target
            }
        }
    }
    forbidScroll() {
        document.querySelector('#canvas').classList.add('forbidScroll')
        document.querySelector('.view-progress').classList.remove('hidden')
    }
    allowScroll() {
        document.querySelector('#canvas').classList.remove('forbidScroll')
        document.querySelector('.view-progress').classList.add('hidden')
    }
    changeModel(modelIndex) {
            //获取旧模型的值赋值给新模型
            let model = this.currentMode
            const freeModeFlag = model.freeModeFlag
            this.currentMode = this.modelArray[modelIndex]
            this.currentMode.rotateY = model.rotateY
            this.currentMode.rotateX = model.rotateX
            this.currentMode.rotateZ = model.rotateZ
            this.currentMode.control = model.control
            this.currentMode.modelPanoramic = this.modelPanoramic
            this.restoreModelPos(this.currentMode, { 'x': model.x, 'y': model.y, 'z': model.z })
            this.currentMode.freeModeFlag = freeModeFlag
            this.adjustModelMaterial(this.currentMode.gltf)
            this.stage.removeChild(model)
            this.stage.scene.environment = this.currentMode.envMap
            this.currentMode.scale = this.windowHeight / this.commonParam.scaleNumber / this.BoxLength

            this.setCameraPos(this.stage.camera.position)
            this.resetControl(freeModeFlag)
            this.stage.addChild(this.currentMode)
            this.stage.changeModel(this.currentMode)
            this.currentMode.tween.stop()
            freeModeFlag && !this.modelPanoramic && this.currentMode.tween.repeat({
                rotateY: this.currentMode.rotateY + 360,
                time: this.tweenTime
            })
        }
        /**
         * 
         * @param model 
         * @param pos，当前模型位置，不和窗口高度做对比 
         */
    restoreModelPos(model, pos = { 'x': 0, 'y': 0 }) {
        model = model || this.currentMode
        model.x = pos.x
        model.y = pos.y
        model.z = pos.z || 0
    }
    setCameraPos(pos) {
        this.stage.camera.position.x = pos ? pos.x || this.initCameraPos.x : this.initCameraPos.x
        this.stage.camera.position.y = pos ? pos.y || this.initCameraPos.y : this.initCameraPos.y
        this.stage.camera.position.z = pos ? pos.z || this.initCameraPos.z : this.initCameraPos.z
    }
    resizeCanvas() {
        this.stage.camera.aspect = window.innerWidth / window.innerHeight
        this.stage.camera.far = window.innerHeight * 10
        this.stage.camera.updateProjectionMatrix()
        window.onresize = () => {
            this.stage.camera.aspect = window.innerWidth / window.innerHeight
            this.stage.camera.far = window.innerHeight * 10
            this.stage.camera.updateProjectionMatrix()
        }
    }
    Toast() {
        document.querySelector('.toast').classList.remove('hidden')
        setTimeout(() => {
            document.querySelector('.toast').classList.add('hidden')
        }, 1000)
    }
    initShowTxt() {
        document.querySelectorAll('.view-progress-box .view-progress-li-box strong').forEach((vv, vi) => {
            vv.textContent = this.commonParam.showModel[vi].name
        })
    }
    initColorItem() {
        let domStr = ''
        this.commonParam.colorArray.forEach((vv, vi) => {
            domStr += `<div class="color-item"> 
                        <p class="phone-special" >${vv.colorName}</p> 
                        <div> 
                        <div class="color-circle" style="background: url(${vv.backImgSrc}) no-repeat center center"></div> 
                        <div class="color-img"> 
                            <figure class="color-img-silvery lazy-imageom"></figure> 
                        </div> 
                        </div> 
                        </div> `
        })
        document.querySelector('.view-colors .color-box2').insertAdjacentHTML('beforeend', domStr)
        document.querySelector('.color-item').classList.add('current')
    }
    panoramicMode(isAutoRotate = true) {
        if (this.commonParam.panoramicImg.length) {
            this.currentMode.control.autoRotate = isAutoRotate
            return
        }
        this.currentMode.control.autoRotate = false
    }
    showSellInfo() {

    }
}
new Model().init()