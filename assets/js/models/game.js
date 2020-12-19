class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 720
    this.canvas.height = 540
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.score = 0
    this.lives = 3
    this.bullets = 0
    this.canRestart = false

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)

    this.coins = []
    this.createCoins()

    this.enemies = []
    this.createEnemies()

    this.mushrooms = []
    this.flowers = []
  }
    randomX() {
        return Math.floor(Math.random() * (this.canvas.width - 40));
    }

    randomY() {
        return Math.floor(Math.random() * (this.canvas.height - 40));
    }

    randomV() {
        return Math.floor(Math.random() * (ENEMIES_MAX_SPEED));
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
    this.enemies.forEach(enemy => enemy.draw())
    this.mushrooms.forEach(mushroom => mushroom.draw())
    this.flowers.forEach(flower => flower.draw())
  }

  move() {
    this.macman.move()
    this.enemies.forEach(enemy => enemy.move())
    this.mushrooms.forEach(mushroom => mushroom.move())
    this.flowers.forEach(flower => flower.move())
  }

  stop() {
      clearInterval(this.drawInterval)
      this.canRestart = true
      this.ctx.save()
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = '64px Press-Start-2P'
        this.ctx.fillStyle = 'red'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
        'Game over!',
      this.canvas.width / 2,
      this.canvas.height / 3,
    )
        this.ctx.font = '32px Press-Start-2P'
        this.ctx.fillStyle = 'white'
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
    this.lives = 3
    this.canRestart = false

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)

    this.coins = []
    this.createCoins()
    this.enemies = []
    this.createEnemies()   
    this.start()

    document.getElementById('icons').innerHTML = ''
    let i = 0
    for (i = 0; i < this.lives; i++) {
        document.getElementById('icons').innerHTML += `<img src="assets/img/mushroom.png" width="25" height="25">`
    }
  }

  createCoins() {
    let i = 0
    for (i = 0; i < INIT_COINS; i++) {
        this.coins.push(new Coin(this.ctx, this.randomX(), this.randomY()))
    }
  }

  createEnemies() {
    let i = 0
    for (i = 0; i < INIT_ENEMIES; i++) {
        this.enemies.push(new Enemy(this.ctx, this.randomX(), this.randomV(), this.randomY(), this.randomV()))
    }
  }
  createMushrooms() {
    this.mushrooms.push(new Mushroom(this.ctx, this.randomX(), this.randomV(), this.randomY(), this.randomV()))
  }

  createFlowers() {
    this.flowers.push(new Flower(this.ctx, this.randomX(), this.randomV(), this.randomY(), this.randomV()))
  }

  updateScore() {
    document.getElementById('score').innerHTML = this.score
    document.getElementById('lives').innerHTML = this.lives
    document.getElementById('icons').innerHTML = ''
    let i = 0
    for (i = 0; i < this.lives; i++) {
        document.getElementById('icons').innerHTML += `<img src="assets/img/mushroom.png" width="25" height="25">`
    }
    document.getElementById('bullets').innerHTML = this.bullets
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

  damageAnimation() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    clearInterval(this.drawInterval)
    this.drawInterval = undefined;
    setTimeout(() => { this.start() }, 600);
    this.ctx.restore
  }

  liveAnimation() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.font = '64px Press-Start-2P'
        this.ctx.fillStyle = 'white'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
        '1UP!',
      this.canvas.width / 2,
      this.canvas.height / 2,
    )
    clearInterval(this.drawInterval)
    this.drawInterval = undefined;
    setTimeout(() => { this.start() }, 600);
    this.ctx.restore
  }

  weaponAnimation() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    clearInterval(this.drawInterval)
    this.drawInterval = undefined;
    setTimeout(() => { this.start() }, 300);
    this.ctx.restore
  }

  checkCollisions() {
    
    if (this.lives === 0) {
        this.stop()
    }
    const restCoins = this.coins.filter(coin => !this.macman.collidesWith(coin))
    const newPoints = this.coins.length - restCoins.length
    this.score += newPoints
    this.updateScore()
    if (this.coins.length > restCoins.length) {
        let i = 0
        for (i = 0; i < INIT_COINS; i++) {
        restCoins.push(new Coin(this.ctx, this.randomX(), this.randomY()))
        this.createEnemies()
        }   
        if (this.score != 0 && this.score % MUSHROOM_FREQ === 0) {
        this.createMushrooms()
        setTimeout(() => { this.mushrooms = [] }, MUSHROOM_TIME);
        }
        if (this.score != 0 && this.score % FLOWER_FREQ === 0) {
        this.createFlowers()
        setTimeout(() => { this.flowers = [] }, FLOWER_TIME);
        }
    }
    this.coins = restCoins

    const restEnemies = this.enemies.filter(enemy => !this.macman.collidesWith(enemy))
    if (this.enemies.length > restEnemies.length) {
        this.damageAnimation()
        this.lives--
        this.enemies = restEnemies
        this.updateScore()
    }

    const restMushrooms = this.mushrooms.filter(mushroom => !this.macman.collidesWith(mushroom))
    if (this.mushrooms.length > restMushrooms.length) {
        this.liveAnimation()
        this.lives++
        this.mushrooms = restMushrooms
        this.updateScore()
    }

    const restFlowers = this.flowers.filter(flower => !this.macman.collidesWith(flower))
    if (this.flowers.length > restFlowers.length) {
        this.weaponAnimation()
        this.bullets++
        this.flowers = restFlowers
        this.updateScore()
    }

  }
}