import * as Three from 'three'
import { WebGLRenderer } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Component } from './component/Component'
import { SkeletonComponent } from './component/SkeletonComponent'
import { Sky } from './settings/Sky'
import { Entity } from './entities/Entity'
import { ak47Path, skyPath } from './utils/assetsPath'
import { Loader } from './utils/loader'
import { CameraComponent } from './component/CameraComponent'

class FPSGameApp {
  private scene: Three.Scene
  private camera: Three.PerspectiveCamera
  private renderer: WebGLRenderer
  private listener: Three.AudioListener
  private loader: Loader
  private clock: Three.Clock
  constructor() {
    this.scene = new Three.Scene()
    this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.renderer = new WebGLRenderer({ antialias: true })
    this.listener = new Three.AudioListener()
    this.loader = new Loader()
    this.clock = new Three.Clock()
  }
  async init() {
    this.setupGraphics()
    await this.entitySetup()
    this.update()
  }
  async setupGraphics() {
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = Three.PCFSoftShadowMap
    this.renderer.toneMapping = Three.ReinhardToneMapping
    this.renderer.toneMappingExposure = 1
    this.renderer.outputEncoding = Three.sRGBEncoding
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x777777)

    const skyTexture = await this.loader.loadTexture(skyPath, 'sky')
    new Sky(this.scene, skyTexture)

    this.windowResizeHandler()
    document.body.appendChild(this.renderer.domElement)
  }

  windowResizeHandler() {
    const { innerWidth, innerHeight } = window
    this.renderer.setSize(innerWidth, innerHeight)
    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()
  }

  async entitySetup() {
    const playerEntity = new Entity('player', this.scene)
    const player = await this.loader.loadGltf(ak47Path, 'player')
    const skeletonComponent = new SkeletonComponent(player)
    const cameraComponent = new CameraComponent(this.camera)
    cameraComponent.setPosition(new Three.Vector3(0, 0, -0.08))
    playerEntity.addComponent(skeletonComponent)
    playerEntity.addComponent(cameraComponent)
  }

  update() {
    requestAnimationFrame(this.animate.bind(this))
  }

  animate() {
    this.renderer.render(this.scene, this.camera)
  }
}

const app = new FPSGameApp()
app.init()
