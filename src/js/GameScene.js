import Phaser from 'phaser'

import Bullets from '/images/bullets.png'
import Background from '/images/background.jpg'
import PlayerIdle from '/images/playerIdle.png'
import PlayerRunning from '/images/player-running.png'
import PlayerHurt from '/images/playerHurt.png'

import Player from './Player.js'
import Bullet from './Bullet.js'
import Timer from './Timer.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
    this.frameCount = 0
  }

  gameOver() {
    const { x, y, height, width } = this.cameras.main
    const gameOverText = this.add
      .text(x + width / 2, y + height / 2, 'Game Over')
      .setFill('#FFF')
      .setFontSize(48)
      .setOrigin(0.5)
      .setDepth(1000)
    const time = this.timer.getElapsedTimeText()
    const timeText = this.add
      .text(x + width / 2, y + height / 2 + 60, time)
      .setFill('#FFF')
      .setFontSize(48)
      .setOrigin(0.5)
      .setDepth(1000)

    this.timer.pause()
    this.bullet.destroyAll()

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('gameOver', { score: this.timer.getElapsedTime() })
    })

    this.scene.start('gameOver', { score: this.timer.getElapsedTime() })
  }

  preload() {
    this.load.image('background', Background)
    this.load.image('player-hurt', PlayerHurt)

    this.load.spritesheet('player-idle', PlayerIdle, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('player-running', PlayerRunning, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('bullets', Bullets, {
      frameWidth: 64,
      frameHeight: 64,
    })
  }

  create() {
    const { x, y, height, width } = this.cameras.main

    const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0)
    const scaleX = this.sys.canvas.width / backgroundImage.width

    backgroundImage.setScale(scaleX).setScrollFactor(0)

    this.player = new Player(this, x + width / 2, (height * 9) / 10, 'player')
    this.player.setScale(scaleX * 10).setScrollFactor(0)

    this.bullet = new Bullet(this)
    this.bullet.setScale(scaleX * 10).setScrollFactor(0)

    this.timer = new Timer(this, x + 30, y + 100)
  }

  update(a) {
    const sec = this.frameCount / 60
    const min = Math.floor(sec / 60)
    if (this.frameCount++ % (30 - min) === 0 && this.bullet.isUpdating) {
      this.bullet.createBullet(this.player, Math.min(200 + sec, 800))
    }
  }
}
