class Macman {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.minX = 0
    this.maxX = this.ctx.canvas.width
    this.vx = 0

    this.y = y
    this.minY = 0
    this.maxY = this.ctx.canvas.height
    this.vy = 0

    this.width = 0
    this.height = 0

    this.sprite = new Image()
    this.sprite.src = './assets/img/mario_sprite.png'
    this.sprite.isReady = false
    this.sprite.horizontalFrames = 4
    this.sprite.verticalFrames = 5
    this.sprite.horizontalFrameIndex = 2
    this.sprite.verticalFrameIndex = 2
    this.sprite.drawCount = 0
    this.sprite.animateCount = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }

    this.movements = {
      up: false,
      down: false,
      right: false,
      left: false
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  clear() {
    game.bullets = game.bullets.filter(bullet => bullet.x <= this.ctx.canvas.width)
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      this.sprite.drawCount++
      if (this.sprite.drawCount % ANIMATE_FRAMES === 0) {
          this.sprite.animateCount++
      }
      this.animate()
    }
  }

  onKeyEvent(event) {
      this.movements.up = false;
      this.movements.down = false;
      this.movements.right = false;
      this.movements.left = false;

    const status = event.type === 'keydown'
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status
        break;
      case KEY_DOWN:
        this.movements.down = status
        break;
      case KEY_RIGHT:
        this.movements.right = status
        break;
      case KEY_LEFT:
        this.movements.left = status
        break;
      default:
        break;
    }
  }

  move() {
    if (this.movements.right) {
      this.vx = SPEED
    } else if (this.movements.left) {
      this.vx = -SPEED
    } else if (this.movements.up) {
      this.vy = -SPEED
    } else if (this.movements.down) {
      this.vy = SPEED
    } else {
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x + this.sprite.frameWidth >= this.maxX) {
        this.x = this.maxX - this.sprite.frameWidth
        } else if (this.x <= this.minX) {
        this.x = this.minX
        }
        
    if (this.y + this.sprite.frameHeight >= this.maxY) {
        this.y = this.maxY - this.sprite.frameHeight
        } else if (this.y <= this.minY) {
        this.y = this.minY
        }
  }

  animate() {
    if (this.movements.left) {
        this.animateLeft()
    } else if (this.movements.right) {
        this.animateRight()
    } else if (this.movements.up) {
        this.animateUp()
    } else if (this.movements.down) {
        this.animateDown()
    } 
  }

  animateLeft() {
    if (this.sprite.animateCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 2
    } else {
        this.sprite.horizontalFrameIndex = 1
        this.sprite.verticalFrameIndex = 2
    }
  }

  animateRight() {
    if (this.sprite.animateCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = 2
        this.sprite.verticalFrameIndex = 2
    } else {
        this.sprite.horizontalFrameIndex = 3
        this.sprite.verticalFrameIndex = 2
    }
  }

  animateUp() {
    if (this.sprite.animateCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
    } else {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 1
    }
  }

  animateDown() {
    if (this.sprite.animateCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 3
    } else {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 4 
    }
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }
}