import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as Three from 'three'

type Asset = GLTF | Three.Texture

export class Loader {
  private gltfLoader: GLTFLoader
  private textureLoader: Three.TextureLoader
  public loadedAssets: Map<string, Asset>
  constructor() {
    this.gltfLoader = new GLTFLoader()
    this.textureLoader = new Three.TextureLoader()
    this.loadedAssets = new Map()
  }

  loadGltf(asset: string, name: string): Promise<GLTF> {
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        asset,
        (gltf) => {
          this.loadedAssets.set(name, gltf)
          resolve(gltf)
        },
        undefined,
        (error) => reject(error)
      )
    })
  }

  loadTexture(asset: string, name: string): Promise<Three.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        asset,
        (texture) => {
          this.loadedAssets.set(name, texture)
          resolve(texture)
        },
        undefined,
        (error) => reject(error)
      )
    })
  }
}
