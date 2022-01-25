import { Component } from '../component/Component'
import * as Three from 'three'
export class Entity {
  private name: string
  private components: Map<string, Component>
  position: Three.Vector3
  rotation: Three.Quaternion
  private parent: Entity | null
  private object: Three.Object3D
  private scene: Three.Scene

  constructor(name: string, scene: Three.Scene) {
    this.name = name
    this.components = new Map()
    this.position = new Three.Vector3()
    this.rotation = new Three.Quaternion()
    this.parent = null
    this.object = new Three.Object3D()
    this.scene = scene
    this.scene.add(this.object)
  }

  getObject() {
    return this.object
  }

  setParent(parent: Entity) {
    this.parent = parent
    this.object.parent = parent.object
  }

  addComponent(component: Component) {
    component.setParent(this)
    this.components.set(component.name, component)
  }

  getComponent(name: string) {
    return this.components.get(name)
  }
}
