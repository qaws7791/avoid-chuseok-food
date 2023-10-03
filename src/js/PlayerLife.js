export default class PlayerLife {
  constructor(scene, x, y, initialLife) {
    this.scene = scene
    this.x = x
    this.y = y
    this.life = initialLife
    this.maxLife = initialLife

    this.lifeText = this.scene.add
      .text(x, y, ``, {
        fontSize: '32px',
        color: '#fff',
      })
      .setPadding(10)
    this.draw()
  }

  plus(number) {
    this.life = Math.min(this.life + number, this.maxLife)
    this.draw()
  }

  minus(number) {
    this.life = Math.max(this.life - number, 0)
    this.draw()
  }

  isOver() {
    return this.life < 1
  }

  draw() {
    this.lifeText.setText(`❤️: ${~~this.life}`)
  }
}
