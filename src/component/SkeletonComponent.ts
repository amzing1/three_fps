import { Component } from './Component'
import * as Three from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * default is a cube
 */
export class SkeletonComponent extends Component {
  private scene: Three.Scene
  private gltf: GLTF
  constructor(scene: Three.Scene, gltf: GLTF) {
    super()
    this.name = 'skeleton'
    this.scene = scene
    this.gltf = gltf
    this.initialize()
  }

  initialize() {
    this.scene.add(this.gltf.scene)
  }
}
