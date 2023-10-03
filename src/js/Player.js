import Phaser from 'phaser'
import PlayerLife from './PlayerLife'
import { BulletType } from './Bullet'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture)
    this.scene = scene
    this.isDown = false
    this.setDepth(10)
    this.speed = 2
    this.damageTime = 0

    const { x: cameraX, y: cameraY } = this.scene.cameras.main

    // create player life instance
    this.life = new PlayerLife(scene, cameraX + 30, cameraY + 30, 100)

    this.keys = {
      left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
    }

    // create player animation
    scene.anims.create({
      key: 'player-idle',
      frames: this.anims.generateFrameNumbers('player-idle', {
        start: 0,
        end: 8,
      }),
      frameRate: 4,
      repeat: -1,
    })

    scene.anims.create({
      key: 'player-running',
      frames: this.anims.generateFrameNumbers('player-running', {
        start: 0,
        end: 5,
      }),
      frameRate: 24,
      repeat: -1,
    })

    this.play('player-idle')
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.setCollideWorldBounds(true)

    // dynamic physics body
    scene.physics.world.enable(this)
  }

  frameCount = 0

  preUpdate(time, delta) {
    //animation
    if (this.frameCount++ % 30 === 0) {
      this.anims.nextFrame()
    }

    // move player
    const pointer = this.scene.input.activePointer
    this.isDown = false
    if (pointer.isDown) {
      if (pointer.x < this.scene.sys.canvas.width / 2) {
        this.moveTo('left')
      } else {
        this.moveTo('right')
      }
    } else {
      if (this.keys.left.isDown) {
        this.moveTo('left')
      }
      if (this.keys.right.isDown) {
        this.moveTo('right')
      }
    }

    // change player texture
    this.changeTexture()
  }

  moveTo(direction) {
    const { width } = this.frame

    const prevMovement = this.x
    if (direction === 'left') {
      this.x = Math.max(0 + width / 2, this.x - this.speed)
      this.flipX = true
    }
    if (direction === 'right') {
      this.x = Math.min(
        this.scene.sys.canvas.width - width / 2,
        this.x + this.speed
      )
      this.flipX = false
    }
    this.isDown = true

    const changedMovement = Math.abs(prevMovement - this.x)
    this.life.plus(changedMovement / 1000)
  }

  damaged(bullet) {
    bullet.destroy()
    this.life.minus(BulletType[bullet.frame.name].damage)
    this.damageTime = Date.now()
    if (this.life.isOver()) {
      this.scene.gameOver()
      this.destroy()
    }
  }

  changeTexture() {
    if (Date.now() - this.damageTime < 500) {
      return this.setTexture('player-hurt')
    }

    if (this.isDown === false) {
      if (this.anims.currentAnim.key !== 'player-idle') {
        return this.play('player-idle')
      }
    } else {
      if (this.anims.currentAnim.key !== 'player-running') {
        return this.play('player-running')
      }
    }
  }
}
