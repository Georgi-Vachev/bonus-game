const baseAssetsPath = '/assets/'

export default {
  canvas: {
    width: 1280,
    height: 720,
    backgroundColor: 0x424242,
  },
  assets: [
    {
      alias: 'chest_closed',
      src: `${baseAssetsPath}/chest_closed.png`,
    },
    {
      alias: 'chest_empty',
      src: `${baseAssetsPath}/chest_empty.png`,
    },
    {
      alias: 'chest_half_full',
      src: `${baseAssetsPath}/chest_half_full.png`,
    },
    {
      alias: 'chest_full',
      src: `${baseAssetsPath}/chest_full.png`,
    },
  ],
  game: {
    chestCount: 6,
    winAmountScope: [10, 100],
    bonusAmountScope: [100, 600],
  },
  layout: {
    chestRows: 3,
    chestCols: 2,
    chestsAreaHeightRatio: 0.80,
    chestOffSetY: 30
  },
  playButton: {
    widthRatio: 0.2,
    heightRatio: 0.08,
    color: 0x007acc
  },
  chest: {
    width: 200,
    height: 150,
    resultToImage: {
      lose: 'chest_empty',
      win: 'chest_half_full',
      bonus: 'chest_full'
    },
    animations: {
      lose: {
        scale: 0.8,
        duration: 0.2,
        repeat: 3
      },
      win: {
        scale: 1.3,
        duration: 0.3,
        repeat: 2
      },
      bonus: {
        scale: 1.5,
        duration: 0.4,
        repeat: 4,
      }
    }
  },
  main: {
    totalWinText: {
      fontSize: 42,
      fill: 0xffffff,
      align: 'center'
    },
    totalWinStartTween: {
      x: 1.5,
      y: 1.5,
      duration: 2,
      ease: "power2.out",
    },
    totalWinEndTween: {
      x: 1,
      y: 1,
      duration: 0.3,
    }
  },
  bonus: {
    label: {
      fill: "yellow",
      fontSize: 48
    },
    tween: {
      duration: 2,
      x: 1.2,
      y: 1.2,
      yoyo: true,
      repeat: 1,
    }
  }
} 