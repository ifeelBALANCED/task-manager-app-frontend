export interface SpritesMap {
  sprite:
    | 'add-round-duotone'
    | 'close-ring-duotone-1'
    | 'close-ring-duotone'
    | 'done-round-duotone'
    | 'done-round'
    | 'edit-duotone'
    | 'logo'
    | 'time-atack-duotone'
    | 'trash'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  sprite: {
    filePath: 'sprite.9d120cb9.svg',
    items: {
      'add-round-duotone': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
      },
      'close-ring-duotone-1': {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
      'close-ring-duotone': {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
      'done-round-duotone': {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
      'done-round': {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
      'edit-duotone': {
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
      },
      logo: {
        viewBox: '0 0 40 40',
        width: 40,
        height: 40,
      },
      'time-atack-duotone': {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
      trash: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20,
      },
    },
  },
}
