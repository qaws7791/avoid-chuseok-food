import Phaser from 'phaser'
import Background from '/images/background.jpg'

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('loading')
  }

  preload() {
    this.load.image('background', Background)
  }

  create() {
    const { x, y, height, width } = this.cameras.main
    //background
    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0)
    const scaleX = this.sys.canvas.width / backgroundImage.width
    backgroundImage.setScale(scaleX).setScrollFactor(0, 1)

    // title
    this.title = this.add
      .text(x + width / 2, y + height / 4, '🌕추석 음식 피하기🍡')
      .setFill('#fff')
      .setFontSize(52)
      .setOrigin(0.5)
      .setDepth(500)
      .setAlign('center')
      .setPadding(30)

    // description
    this.description = this.add
      .text(
        x + width / 2,
        y + height * (2 / 5),
        ['명절 연휴 추석 음식의', '유혹으로부터', '도망치세요!'],
        {
          lineSpacing: 10,
          color: '#fff',
          fontSize: '40px',
        }
      )
      .setOrigin(0.5)
      .setDepth(500)
      .setAlign('center')
      .setPadding(30)

    // start button
    const startButton = this.createButton(
      x + width / 2,
      y + height * (3 / 5),
      '시작'
    )
    startButton.on('pointerdown', () => {
      this.scene.start('game')
    })

    // leaderboard button
    const leaderBoardButton = this.createButton(
      x + width / 2,
      y + height * (3 / 5) + 100,
      '리더보드'
    )
    leaderBoardButton.on('pointerdown', () => {
      this.scene.start('leaderBoard')
    })
  }

  update() {}

  createButton(x, y, text) {
    const buttonText = this.add
      .text(x, y, text, {
        font: '48px Arial',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setDepth(1000)

    const borderRect = this.add.graphics()

    // background color
    borderRect.fillStyle(0x483d8b)

    // rectangle
    borderRect.fillRect(
      buttonText.x - buttonText.width / 2 - 25,
      buttonText.y - buttonText.height / 2 - 10,
      buttonText.width + 50,
      buttonText.height + 20
    )

    return buttonText.setInteractive({
      useHandCursor: true,
    })
  }
}
