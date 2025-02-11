import { mirage } from './mirage'

const imageModules = import.meta.glob(
  '/src/assets/maps/**/*.{png,jpg,jpeg,svg}',
  {
    eager: true,
  }
) as Record<
  string,
  {
    default: string
  }
>

export const maps: { [key: string]: string } = {
  ancient: imageModules['/src/assets/maps/ancient.png'].default,
  anubis: imageModules['/src/assets/maps/anubis.png'].default,
  dust2: imageModules['/src/assets/maps/dust2.png'].default,
  inferno: imageModules['/src/assets/maps/inferno.png'].default,
  nuke: imageModules['/src/assets/maps/nuke.png'].default,
  train: imageModules['/src/assets/maps/train.png'].default,
  mirage: imageModules['/src/assets/maps/mirage.png'].default,
}

export type Start = {
  marker: { x: string; y: string }
  desc: string
  image: string[]
}

export type Item = {
  name: string
  end: { x: string; y: string }
  start: Start[]
}
export const map: { [key: string]: Item[] } = {
  mirage: mirage,
}
