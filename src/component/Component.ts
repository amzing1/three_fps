import * as Three from 'three'
import { Entity } from '../entities/Entity'

export class Component {
  parent: Entity | null
  name: string
  constructor() {
    this.name = 'Componet'
    this.parent = null
  }

  setParent(parent: Entity) {
    this.parent = parent
  }
}
