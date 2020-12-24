class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 720
    this.canvas.height = 540
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.score = 0
    this.highScore = 0
    this.lives = 3
    this.bullets = 0
    this.isStarted = false
    this.canRestart = false
    this.canFire = false
    this.isInvencible = false

    this.background = new Background(this.ctx)
    this.macman = new Macman(this.ctx, 720/2, 540/2)

    this.coins = []
    this.createCoins()

    this.enemies = []
    this.createEnemies()

    this.mushrooms = []
    this.flowers = []
    this.fireballs = []
    this.stars = []

    this.sounds = {
      theme: new Audio('assets/sound/theme.wav'),
      coin: new Audio('assets/sound/coin.wav'),
      liveUp: new Audio('assets/sound/1-up.wav'),
      power: new Audio('assets/sound/power.wav'),
      fireball: new Audio('assets/sound/fireball.wav'),
      liveDown: new Audio('assets/sound/touch.wav'),
      star: new Audio('assets/sound/star.mp3'),
      end: new Audio('assets/sound/end.wav'),
      here_we_go: new Audio('assets/sound/here_we_go.wav'),
      thank_you: new Audio('assets/sound/thank_you.wav'),
      press_start: new Audio('assets/sound/press_start.wav'),
    }
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
    if (!window.localStorage.getItem('highScore')) {
      this.highScore = 0
    } else {
      this.highScore = parseInt(window.localStorage.getItem('highScore'))
    }
    
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()
      }, this.fps);
    }
    this.sounds.theme.loop = true;
    this.sounds.theme.play()
    this.sounds.theme.volume = VOLUME / 3

    this.ctx.font = '0px PressStart'
        this.ctx.fillText('Loading font...',0,0,)
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
    this.fireballs.forEach(fireball => fireball.draw())
    this.stars.forEach(star => star.draw())

    if (this.isInvencible) {
        this.invencibleAnimation()
    }
  }

  move() {
    this.macman.move()
    this.enemies.forEach(enemy => enemy.move())
    this.mushrooms.forEach(mushroom => mushroom.move())
    this.flowers.forEach(flower => flower.move())
    this.fireballs.forEach(fireball => fireball.move())
    this.stars.forEach(star => star.move())
  }

  stop() {
      this.saveScore()
      this.sounds.theme.pause()
      this.sounds.end.play()
      this.sounds.end.volume = VOLUME
      clearInterval(this.drawInterval)
      this.canRestart = true
      this.ctx.save()
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = '42px PressStart'
        this.ctx.fillStyle = 'red'
        this.ctx.textAlign = 'center'
        this.ctx.fillText(
        'Game over!',
      this.canvas.width / 2,
      this.canvas.height / 3,
    )
        this.ctx.font = '18px PressStart'
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
    this.bullets = 0
    this.fireballs = []
    this.stars = []
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

  createFireballs() {
      this.fireballs.push(new Bullet(this.ctx, this.macman.x + this.macman.width/2, this.macman.vx * 2, this.macman.y + this.macman.height/2, this.macman.vy * 2))
      setTimeout(() => { this.fireballs.pop() }, 3000);
  }

  createStars() {
    this.stars.push(new Star(this.ctx, this.randomX(), this.randomV(), this.randomY(), this.randomV()))
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
    document.getElementById('highScore').innerHTML = this.highScore
  }

  saveScore() {
    if (this.highScore > this.score) {
    } 
    else {
      window.localStorage.setItem('highScore',this.score)
    }
  }

  onKeyEvent(event) {
    switch (event.keyCode) {
      case KEY_R:
        if (this.canRestart) {
            this.restart()
        }
        break;
        case KEY_ENTER:
        if (this.isStarted === false) {
            this.isStarted = true
            this.sounds.here_we_go.volume = VOLUME;
            this.sounds.here_we_go.play() 
                document.getElementById("intro").remove();
                document.getElementById("intro_footer").remove();
            setTimeout(() => { 
                document.getElementById("scoreboard").removeAttribute("style")
                document.getElementById("footer").removeAttribute("style")
                this.start() 
            }, 1500);
        }
        break;
        case KEY_FIRE:
        if (this.bullets > 0) {
            this.createFireballs();
            this.sounds.fireball.play()
            this.sounds.fireball.volume = VOLUME
            this.bullets--
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
    this.ctx.restore()
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
    this.ctx.restore()
  }

  weaponAnimation() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    clearInterval(this.drawInterval)
    this.drawInterval = undefined;
    setTimeout(() => { this.start() }, 300);
    this.ctx.restore()
  }

  invencibleAnimation() {
    this.ctx.save()
    this.ctx.beginPath();
    this.ctx.arc(this.macman.x + this.macman.width/2, this.macman.y + this.macman.height/2, 30, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(255, 165, 0, 0.3)'
    this.ctx.fill();
    setTimeout(() => { 
        this.ctx.beginPath();
    this.ctx.arc(this.macman.x + this.macman.width/2, this.macman.y + this.macman.height/2, 40, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(255, 165, 0, 0.4)'
    this.ctx.fill(); 
        }, 150);
    setTimeout(() => { 
        this.ctx.beginPath();
    this.ctx.arc(this.macman.x + this.macman.width/2, this.macman.y + this.macman.height/2, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'
    this.ctx.fill(); 
        }, 150);
    
    this.ctx.restore()
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
        this.sounds.coin.play()
        this.sounds.coin.volume = VOLUME
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
        if (this.score != 0 && this.score % STAR_FREQ === 0) {
        this.createStars()
        setTimeout(() => { this.mushrooms = [] }, MUSHROOM_TIME);
        }
    }
    this.coins = restCoins

    const restEnemies = this.enemies.filter(enemy => !this.macman.collidesWith(enemy))
    if (this.enemies.length > restEnemies.length) {
        if (this.isInvencible) {
            this.enemies = restEnemies
        } else {
        this.damageAnimation()
        this.sounds.liveDown.play()
        this.sounds.liveDown.volume = VOLUME
        this.lives--
        this.enemies = restEnemies
        this.updateScore()
        }
    }

    const restMushrooms = this.mushrooms.filter(mushroom => !this.macman.collidesWith(mushroom))
    if (this.mushrooms.length > restMushrooms.length) {
        this.liveAnimation()
        this.sounds.liveUp.play()
        this.sounds.liveUp.volume = VOLUME
        this.lives++
        this.mushrooms = restMushrooms
        this.updateScore()
    }

    const restFlowers = this.flowers.filter(flower => !this.macman.collidesWith(flower))
    if (this.flowers.length > restFlowers.length) {
        this.weaponAnimation()
        this.sounds.power.play()
        this.sounds.power.volume = VOLUME
        this.bullets+= 3
        this.flowers = restFlowers
        this.updateScore()
    }

    if (this.bullets > 0) {
        let i = 0
        for (i=0; i < this.fireballs.length; i++) {
            let bullet = this.fireballs[i]
            const restEnemies = this.enemies.filter(enemy => !bullet.collidesWith(enemy));
            this.enemies = restEnemies
            }
        }

    const restStars = this.stars.filter(star => !this.macman.collidesWith(star))
    if (this.stars.length > restStars.length) {
        this.weaponAnimation()
        this.stars = restStars
        this.isInvencible = true
        this.sounds.star.play()
        this.sounds.star.volume = VOLUME
        setTimeout(() => { 
            this.isInvencible = false 
            this.sounds.star.pause()
            }, INVENCIBLE_TIME);
    }
    }
}