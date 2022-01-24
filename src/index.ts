import * as Three from 'three'
import { WebGLRenderer } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Component } from './component/Component'
import { SkeletonComponent } from './component/SkeletonComponent'
import { SkyComponent } from './component/SkyComponent'
import { Entity } from './entities/Entity'
import { ak47Path, skyPath } from './utils/assetsPath'
import { Loader } from './utils/loader'

class FPSGameApp {
  private scene: Three.Scene
  private camera: Three.PerspectiveCamera
  private renderer: WebGLRenderer
  private listener: Three.AudioListener
  private loader: Loader
  constructor() {
    this.scene = new Three.Scene()
    this.camera = new Three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 1000)
    this.renderer = new WebGLRenderer({ antialias: true })
    this.listener = new Three.AudioListener()
    this.loader = new Loader()
    this.entitySetup()
    this.setupGraphics()
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

    this.camera.add(this.listener)
    this.camera.lookAt(this.scene.position)
    this.camera.position.set(0, 5, 5)
    this.scene.add(this.camera)
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
    const skyEntity = new Entity('sky')
    const skyTexture = await this.loader.loadTexture(skyPath, 'sky')
    const skyComponent = new SkyComponent(this.scene, skyTexture)
    skyEntity.addComponent(skyComponent)

    const playerEntity = new Entity('player')
    const player = await this.loader.loadGltf(ak47Path, 'player')
    const skeletonComponent = new SkeletonComponent(this.scene, player)
    playerEntity.addComponent(skeletonComponent)
  }

  update() {
    requestAnimationFrame(() => this.renderer.render(this.scene, this.camera))
  }
}

const app = new FPSGameApp()
