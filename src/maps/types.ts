import { mirage } from './mirage'

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
