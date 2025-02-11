import type { Item } from './types'

export const mirage: Item[] = [
  {
    name: 'vip',
    end: { x: '40%', y: '46%' },
    start: [
      {
        marker: { x: '88%', y: '36%' },
        desc: '匪家VIP快烟',
        image: [
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
          'https://dummyimage.com/300x150',
        ],
      },
      {
        marker: { x: '54.00%', y: '48.50%' },
        desc: '中路续VIP烟',
        image: ['https://dummyimage.com/300x150'],
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
        image: ['https://dummyimage.com/300x150'],
      },
    ],
  },
]
