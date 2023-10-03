import Phaser from 'phaser'
import { v4 as uuidv4 } from 'uuid'

import Background from '/images/background.jpg'
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'

const Form = `
<div id="input-form" style="padding: 15px; background-color: #ffffff66; border-radius: 12px;">
<input type="text" name="name" placeholder="이름" maxlength="20" minlength="1" value="" style="padding: 10px; font-size: 20px; width: 400px;"/>
<button id="submit" style="padding: 8px; font-size: 18px;">저장</button>
</div>`
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('gameOver')
    //get data from start method
  }

  init(data) {
    this.score = data.score
  }

  preload() {
    this.load.image('background', Background)
  }

  create() {
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
    const gameOverText = this.add
      .text(center.x, y + height * (1 / 5), 'Game Over')
      .setFill('#FFF')
      .setFontSize(48)
      .setOrigin(0.5)
      .setDepth(1000)
    const timeText = this.add
      .text(center.x, y + height * (2 / 5), `Score: ${this.score}`)
      .setFill('#FFF')
      .setFontSize(48)
      .setOrigin(0.5)
      .setDepth(1000)
    //restart button
    const restartText = this.add
      .text(center.x, y + height * (3 / 5), '재시작', {
        font: '48px Arial',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setDepth(1000)

    const borderRect = this.add.graphics()

    // 배경색 설정 (흰색)
    borderRect.fillStyle(0x483d8b)

    // 사각형 그래픽 위치 및 크기 설정 (텍스트의 바운딩 박스를 기준으로 함)
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

    //nickname
    const element = this.add.dom(width / 2, height / 2).createFromHTML(Form)

    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    )

    this.returnKey.on('down', (event) => {
      const name = element.getChildByName('name')
      if (name.value != '') {
        this.recordScore(uuidv4(), name.value, this.score)
          .then(() => {
            alert(`${name.value}의 기록을 저장하였습니다.`)
            name.value = ''
            this.scene.start('leaderBoard')
          })
          .catch(() => {
            alert('기록 저장에 실패하였습니다.')
          })
      }
    })

    const button = element.getChildByID('submit')
    button.addEventListener('click', () => {
      const name = element.getChildByName('name')
      if (name.value != '') {
        this.recordScore(uuidv4(), name.value, this.score)
          .then(() => {
            alert(`${name.value}의 기록을 저장하였습니다.`)
            name.value = ''
            this.scene.start('leaderBoard')
          })
          .catch(() => {
            alert('기록 저장에 실패하였습니다.')
          })
      }
    })
  }

  async recordScore(id, name, score) {
    this.leaderBoard = new LeaderBoard({
      root: 'leaderboard',
    })
    this.leaderBoard.setUser({
      userID: id,
      userName: name,
    })
    await this.leaderBoard.post(score)
  }
}
