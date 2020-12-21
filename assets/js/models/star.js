class Star {
  constructor(ctx, x, vx, y, vy) {
    this.ctx = ctx

    this.x = x
    this.minX = 0
    this.maxX = this.ctx.canvas.width
    this.vx = vx

    this.y = y
    this.minY = 0
    this.maxY = this.ctx.canvas.height
    this.vy = vy

    this.width = 0
    this.height = 0

    this.sprite = new Image()
    this.sprite.src = './assets/img/star_sprite.png'
    this.sprite.isReady = false
    this.sprite.horizontalFrames = 2
    this.sprite.verticalFrames = 1
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 0
    this.sprite.drawCount = 0
    this.sprite.animateCount = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  clear() {

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

  

  move() {

    this.x += this.vx
    this.y += this.vy

    if (this.x + this.sprite.frameWidth >= this.maxX) {
        this.x = this.maxX - this.sprite.frameWidth,
        this.vx = -this.vx
        } else if (this.x <= this.minX) {
        this.x = this.minX;
        this.vx = -this.vx
        }
        
    if (this.y + this.sprite.frameHeight >= this.maxY) {
        this.y = this.maxY - this.sprite.frameHeight;
        this.vy = -this.vy
        } else if (this.y <= this.minY) {
        this.y = this.minY
        this.vy = -this.vy
        }
  }

  animate() {
    if (this.sprite.animateCount % MOVEMENT_FRAMES === 0) {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
    } else {
        this.sprite.horizontalFrameIndex = 1
        this.sprite.verticalFrameIndex = 0
    } 
  }

  resetAnimation() {
    
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }
}