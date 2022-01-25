import { Component } from './Component'
import * as Three from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { Entity } from '../entities/Entity'

/**
 * default is a cube
 */
export class CameraComponent extends Component {
  constructor(camera: Three.PerspectiveCamera) {
    super()
    this.name = 'camera'
    this.object = camera
  }

  setParent(parent: Entity) {
    super.setParent(parent)
    this.object.lookAt(parent.getObject().position)
  }

  setPosition(position: Three.Vector3) {
    this.object.position.copy(position)
  }

  setRotation(rotation: Three.Quaternion) {
    this.object.quaternion.copy(rotation)
  }
}
