import type { Item } from './types'
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
export const mirage: Item[] = [
  {
    name: 'vip',
    end: {
      x: '40.00%',
      y: '46.00%',
    },
    start: [
      {
        marker: { x: '88%', y: '36%' },
        desc: '匪家VIP快烟',
        image: [
          imageModules['/src/assets/maps/mirage/vip1.png'].default,
          imageModules['/src/assets/maps/mirage/vip1.png'].default,
        ],
      },
      {
        marker: { x: '54.00%', y: '48.50%' },
        desc: '中路续VIP烟',
        image: [imageModules['/src/assets/maps/mirage/vip1.png'].default],
      },
    ],
  },
  {
    name: 'CT',
    end: {
      x: '45.13%',
      y: '79.63%',
    },
    start: [
      {
        marker: { x: '62.63%', y: '61.63%' },
        desc: 'CT家续烟',
        image: [imageModules['/src/assets/maps/mirage/vip1.png'].default],
      },
    ],
  },
]
