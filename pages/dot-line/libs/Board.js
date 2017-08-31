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
    this.dotCount = options.dotCount || Math.floor((width * height / Math.pow(120, 2)))
    this.options = options
    this.bgColor = options.bgColor

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
    let  {width, height, dotCount, options, dots} = this
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot(this, width * Math.random(), height * Math.random(), options))
    }
  }

  cal () {
    this.dots.map(dot => dot.cal())
  }

  render () {
    // clear
    let {ctx, width, height, bgColor} = this
    if (bgColor) {
      ctx.fillStyle = bgColor
      ctx.rect(0, 0, width, height)
      ctx.fill()
    } else {
      ctx.clearRect(0, 0, width, height)
    }

    this.dots.map(dot => dot.render())
  }

  step () {
    this.cal()
    this.render()
  }
}
