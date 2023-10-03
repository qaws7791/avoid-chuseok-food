import Phaser from 'phaser'
import { v4 as uuidv4 } from 'uuid'

import Background from '/images/background.jpg'
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('leaderBoard')
    //get data from start method
  }

  preload() {
    this.load.image('background', Background)
    this.leaderBoard = new LeaderBoard({
      root: 'leaderboard',
    })
  }

  async create() {
    const { x, y, height, width } = this.cameras.main
    const center = {
      x: x + width / 2,
      y: y + height / 2,
    }
    //background
    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0)
    const scaleX = this.sys.canvas.width / backgroundImage.width
    backgroundImage.setScale(scaleX).setScrollFactor(0)
    //text
    const TitleText = this.add
      .text(center.x, y + 100, '순위표')
      .setPadding(10)
      .setFill('#FFF')
      .setFontSize(48)
      .setOrigin(0.5)
      .setDepth(1000)
    //restart button
    const restartText = this.add
      .text(center.x, y + height * (3 / 5), '시작', {
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
      restartText.x - restartText.width / 2 - 10,
      restartText.y - restartText.height / 2 - 10,
      restartText.width + 20,
      restartText.height + 20
    )

    restartText.setInteractive({ useHandCursor: true })
    restartText.on('pointerdown', () => {
      this.scene.start('game')
    })

    //leaderboard

    const scores = await this.leaderBoard.loadFirstPage()

    // display first 5 scores
    const boardHeight = 400
    const boardWidth = 640
    const boardX = (width - boardWidth) / 2
    let boardY = 180
    this.add
      .graphics({ fillStyle: { color: 0x000000, alpha: 0.7 } })
      .fillRoundedRect(boardX, boardY, boardWidth, boardHeight, 20)

    const size = 5

    for (let i = 0; i < size; ++i) {
      const num = this.add
        .text(boardX + 20, boardY + 50, `${i + 1}등`, {
          fontSize: '32px',
          color: '#fff',
          backgroundColor: '#362FD9',
          padding: { left: 10, right: 10, top: 10, bottom: 10 },
        })
        .setOrigin(0, 0.5)

      if (i < scores.length) {
        const scoreItem = scores[i]

        const name = this.add
          .text(num.x + num.width + 10, boardY + 50, scoreItem.userName, {
            fontSize: '32px',
          })
          .setOrigin(0, 0.5)

        const nameWidth = 400
        this.add
          .text(
            name.x + nameWidth + 10,
            boardY + 50,
            scoreItem.score.toString(),
            {
              fontSize: '32px',
            }
          )
          .setOrigin(0, 0.5)
      }

      boardY += 75
    }
  }
}
