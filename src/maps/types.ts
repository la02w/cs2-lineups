import { mirage } from './mirage'

import ancientPath from '@/assets/maps/ancient.png'
import anubisPath from '@/assets/maps/anubis.png'
import dust2Path from '@/assets/maps/dust2.png'
import infernoPath from '@/assets/maps/inferno.png'
import miragePath from '@/assets/maps/mirage.png'
import nukePath from '@/assets/maps/nuke.png'
import trainPath from '@/assets/maps/train.png'

export const maps: { [key: string]: string } = {
  ancient: ancientPath,
  anubis: anubisPath,
  dust2: dust2Path,
  inferno: infernoPath,
  nuke: nukePath,
  train: trainPath,
  mirage: miragePath,
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
