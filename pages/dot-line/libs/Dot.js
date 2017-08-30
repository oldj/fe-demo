/**
 * Dot
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

export default class Dot {
  constructor (board, x, y, options = {}) {
    this.board = board
    this.ctx = board.ctx
    this.x = x
    this.y = y
    this.r = Math.floor(Math.random() * 3 + 3)
    this.color = options.dotColor || '#000000'
    this.lineColorRGB = options.lineColorRGB || [0, 0, 0]
    this.maxLineLength = options.maxLineLength || (board.width / 7)

    let dd = 1
    this.vx = Math.pow(dd * (Math.random() - 1), 2) / dd
    this.vy = Math.pow(dd * (Math.random() - 1), 2) / dd

    let min = 0.1
    if (Math.abs(this.vx) < min) this.vx = min * (Math.random() > 0.5 ? 1 : -1)
    if (Math.abs(this.vy) < min) this.vx = min * (Math.random() > 0.5 ? 1 : -1)
  }

  getNeighbors () {
    let {dots} = this.board
    let neighbors = []
    let maxLineLength = this.maxLineLength

    dots.map(dot => {
      let d = Math.sqrt(Math.pow(this.x - dot.x, 2) + Math.pow(this.y - dot.y, 2))
      if (d <= maxLineLength) {
        neighbors.push({
          dot,
          a: 1 - d / maxLineLength
        })
      }
    })

    return neighbors
  }

  cal () {
    this.neighbors = this.getNeighbors()
    let {width, height} = this.board
    let r = this.r

    this.x += this.vx
    if (this.x < r) {
      this.x = r
      this.vx *= -1
    } else if (this.x >= width - r) {
      this.x = width - r
      this.vx *= -1
    }

    this.y += this.vy
    if (this.y < r) {
      this.y = r
      this.vy *= -1
    } else if (this.y >= height - r) {
      this.y = height - r
      this.vy *= -1
    }
  }

  render () {
    let {ctx, x, y, r, neighbors, lineColorRGB} = this

    // line
    neighbors.map(i => {
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${lineColorRGB.join(', ')}, ${i.a})`
      ctx.moveTo(x, y)
      ctx.lineTo(i.dot.x, i.dot.y)
      ctx.stroke()
    })

    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }
}
