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
    //배경
    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0)
    const scaleX = this.sys.canvas.width / backgroundImage.width

    backgroundImage.setScale(scaleX).setScrollFactor(0, 1)

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

    const startButton = this.createButton(
      x + width / 2,
      y + height * (3 / 5),
      '시작'
    )
    startButton.on('pointerdown', () => {
      this.scene.start('game')
    })

    const LeaderBoardButton = this.createButton(
      x + width / 2,
      y + height * (3 / 5) + 100,
      '리더보드'
    )
    LeaderBoardButton.on('pointerdown', () => {
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

    // 배경색 설정 (흰색)
    borderRect.fillStyle(0x483d8b)

    // 사각형 그래픽 위치 및 크기 설정 (텍스트의 바운딩 박스를 기준)
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
