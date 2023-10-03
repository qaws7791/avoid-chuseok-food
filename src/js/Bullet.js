import Phaser from 'phaser'

export const BulletType = {
  0: {
    name: '불고기',
    damage: 35,
  },
  1: {
    name: '잡채',
    damage: 15,
  },
  2: {
    name: '파전',
    damage: 30,
  },
  3: {
    name: '밥',
    damage: 25,
  },
  4: {
    name: '송편',
    damage: 20,
  },
}

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'bullets')
    this.isUpdating = true
    this.scene = scene
    this.group = scene.physics.add.group({
      defaultKey: 'bullets',
      // collideWorldBounds: true,
    })

    scene.physics.world.on('worldbounds', (body) => {
      body.gameObject.destroy()
    })
  }

  createBullet(target, speed) {
    const { x, y, width, height } = this.scene.cameras.main
    const center = { x: x + width / 2, y: y + height / 2 }
    const offset = 5
    const mx = Phaser.Math.Between(x + offset, width - offset * 2)
    const bullets = this.group.createMultiple({
      key: 'bullets',
      frameQuantity: 1,
      frame: [Phaser.Math.Between(0, 4)],
      setXY: {
        x: mx,
        y: -20,
      },
      setScale: {
        x: 0.5,
        y: 0.5,
      },
    })

    bullets.forEach((bullet) => {
      bullet.setCircle(8)
      // bullet.setVelocityY(speed)
      bullet.setGravityY(speed)
    })

    Phaser.Actions.Call(bullets, (m) => {
      m.body.onWorldBounds = true
    })

    this.scene.physics.add.overlap(bullets, target, this.checkCollision)
  }

  checkCollision(bullet, target) {
    target.damaged(bullet)
  }

  destroyAll() {
    this.group.clear(true, true)
    this.isUpdating = false
  }
  isUpdating() {
    return this.isUpdating
  }

  update() {
    console.log(this)
  }
}
