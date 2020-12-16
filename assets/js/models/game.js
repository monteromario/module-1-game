class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 720
    this.canvas.height = 540
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()
      }, this.fps);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.background.draw()
    this.macman.draw()
  }

  move() {
    this.macman.move()
  }

  onKeyEvent(event) {
    this.macman.onKeyEvent(event)
  }

  checkCollisions() {

  }
}