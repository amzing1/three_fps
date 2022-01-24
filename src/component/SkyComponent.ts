import { Component } from './Component'
import * as Three from 'three'

export class SkyComponent extends Component {
  private scene: Three.Scene
  private texture: Three.Texture
  constructor(scene: Three.Scene, skyTexture: Three.Texture) {
    super()
    this.name = 'sky'
    this.scene = scene
    this.texture = skyTexture

    this.initialize()
  }

  initialize() {
    const hemiLight = new Three.HemisphereLight(0xffffff, 0xffffff, 1)
    hemiLight.color.setHSL(0.6, 1, 0.6)
    hemiLight.groundColor.setHSL(0.095, 1, 0.75)
    this.scene.add(hemiLight)

    const skyGeo = new Three.SphereGeometry(1000, 25, 25)
    const skyMat = new Three.MeshBasicMaterial({
      map: this.texture,
      side: Three.BackSide,
      depthWrite: false,
      toneMapped: false,
    })
    const sky = new Three.Mesh(skyGeo, skyMat)
    sky.rotateY(Three.MathUtils.degToRad(-60))
    this.scene.add(sky)
  }
}
