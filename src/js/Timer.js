export default class Timer extends Phaser.GameObjects.Text {
  constructor(scene, x, y) {
    super(scene, x, y, '', { font: '48px', fill: '#FFF' })
    this.startTime = Date.now()
    this.endTime = 0
    this.elapsedTime = 0
    this.updating = true
    scene.add.existing(this)
  }

  preUpdate() {
    if (!this.updating) return
    this.updateTime()

    // display elapsed time
    this.setText(this.getElapsedTimeText())
  }

  updateTime() {
    this.endTime = Date.now()
    this.elapsedTime = this.endTime - this.startTime
  }

  getElapsedTime() {
    return this.elapsedTime
  }

  getElapsedTimeText() {
    return this.timeToText(this.elapsedTime)
  }

  pause() {
    this.updating = false
  }

  timeToText(time) {
    const elapsedMilliseconds = time
    const milliseconds = String(Math.floor(elapsedMilliseconds % 200)).padStart(
      3,
      '0'
    )
    const seconds = String(Math.floor(elapsedMilliseconds / 1000)).padStart(
      2,
      '0'
    )
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')

    return `${minutes}:${seconds}:${milliseconds}`
  }
}
