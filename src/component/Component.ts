import * as Three from 'three'
import { Entity } from '../entities/Entity'

export class Component {
  parent: Entity | null
  name: string
  protected object: Three.Object3D
  constructor() {
    this.name = 'Componet'
    this.parent = null
    this.object = new Three.Object3D()
  }

  setParent(parent: Entity) {
    this.parent = parent
    parent.getObject().add(this.object)
  }
}
