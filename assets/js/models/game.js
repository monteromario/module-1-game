class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 720
    this.canvas.height = 540
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.score = 0
    this.lives = 0
    this.canRestart = false

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)

    this.coins = [
      new Coin(this.ctx, this.randomX(), this.randomY()),
      
    ]
  }
    randomX() {
        return Math.floor(Math.random() * (this.canvas.width - 20));
    }

    randomY() {
        return Math.floor(Math.random() * (this.canvas.height - 20));
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
    this.coins.forEach(coin => coin.draw())
  }

  move() {
    this.macman.move()
  }

  stop() {
      clearInterval(this.drawInterval)
      this.canRestart = true
      this.ctx.save()
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = '32px Arial'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
        'Game over!',
      this.canvas.width / 2,
      this.canvas.height / 3,
    )
        this.ctx.fillText(
        `Score: ${this.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2,
    )
        this.ctx.fillText(
        `Press 'R' to restart`,
      this.canvas.width / 2,
      this.canvas.height * 2 / 3,
    )
    this.ctx.restore()
  }

  restart() {
      this.drawInterval = undefined;
      this.score = 0
    this.lives = 0
    this.canRestart = false

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)

    this.coins = [
      new Coin(this.ctx, this.randomX(), this.randomY()),
      
    ]
      this.start()
  }


  updateScore() {
    document.getElementById('score').innerHTML = this.score
  }

  onKeyEvent(event) {
    switch (event.keyCode) {
      case KEY_R:
        if (this.canRestart) {
            this.restart()
        }
        break;
      default:
        break;
    }
    this.macman.onKeyEvent(event)
  }

  checkCollisions() {
    if (this.coins.length === 0) {
        this.stop()
    }
    const restCoins = this.coins.filter(coin => !this.macman.collidesWith(coin))
    const newPoints = this.coins.length - restCoins.length
    this.score += newPoints
    this.updateScore()
    this.coins = restCoins

  }
}