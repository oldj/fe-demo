/**
 * Board
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'

import Dot from './Dot'

export default class Board {
  constructor (el, width, height, options = {}) {
    this.el = el
    this.width = width
    this.height = height
    this.dot_count = options.dot_count || Math.floor(Math.sqrt(width * height) / 10)
    this.options = options
    this.bgColor = options.bgColor || '#ffffff'

    let el_canvas = document.createElement('canvas')
    el.innerHTML = ''
    el_canvas.width = this.width
    el_canvas.height = this.height
    el.appendChild(el_canvas)

    this.ctx = el_canvas.getContext('2d')

    this.parseLineColorRGB()
    this.makeDots()

    setInterval(() => this.step(), 30)
  }

  parseLineColorRGB () {
    let {lineColor, dotColor} = this.options
    lineColor = lineColor || dotColor || '#000000'
    let m = lineColor.match(/#(\w\w)(\w\w)(\w\w)/)
    let r = parseInt(m[1], 16)
    let g = parseInt(m[2], 16)
    let b = parseInt(m[3], 16)
    this.options.lineColorRGB = [r, g, b]
  }

  makeDots () {
    this.dots = []
    let  {width, height, dot_count, options, dots} = this
    for (let i = 0; i < dot_count; i++) {
      dots.push(new Dot(this, width * Math.random(), height * Math.random(), options))
    }
  }

  cal () {
    this.dots.map(dot => dot.cal())
  }

  render () {
    // clear
    let {ctx, width, height, bgColor} = this
    ctx.fillStyle = bgColor
    ctx.rect(0, 0, width, height)
    ctx.fill()

    this.dots.map(dot => dot.render())
  }

  step () {
    this.cal()
    this.render()
  }
}
