import { Component } from './Component'
import * as Three from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Entity } from '../entities/Entity'

/**
 * default is a cube
 */
export class SkeletonComponent extends Component {
  private gltf: GLTF
  constructor(gltf: GLTF) {
    super()
    this.name = 'skeleton'
    this.gltf = gltf
    this.gltf.scene.scale.set(0.1, 0.1, 0.1)
    this.object = this.gltf.scene
  }
}
