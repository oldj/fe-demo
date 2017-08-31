/**
 * Rule
 */

'use strict'

const convert = require('./convert')

const margin = [10, 20] // top, left
const NODE_WIDTH = 60
const NODE_HEIGHT = 30
const NOT_PADDING = [16, 4] // [x, y]

function styleObjToStr (style) {
  let s = ''
  for (let k in style) {
    if (style.hasOwnProperty(k)) {
      s += `${k}:${style[k]};`
    }
  }
  return s
}

function line (ctx, x1, y1, x2, y2, is_out, color, lineWidth) {
  ctx.lineWidth = lineWidth || 1
  ctx.strokeStyle = color || '#b4b4b4'
  ctx.beginPath()
  ctx.moveTo(x1 - 0.5, y1 - 0.5)
  if (is_out) {
    ctx.lineTo(x2 - 0.5, y1 - 0.5)
    ctx.lineTo(x2 - 0.5, y2 - 0.5)
  } else {
    ctx.lineTo(x1 - 0.5, y2 - 0.5)
    ctx.lineTo(x2 - 0.5, y2 - 0.5)
  }
  ctx.stroke()
  ctx.closePath()
}

class Rule {
  constructor (parent, s, r_dict, _dict, options = {}, top = margin[0], left = margin[1]) {
    this.is_not = /^\s*\!/.test(s)
    this._original_s = Array.isArray(s) ? s.slice(0) : s
    this._a = typeof s === 'string' ? s.replace(/^\s*\!/, '') : s
    this.parent = parent
    this.r_dict = r_dict
    this._dict = _dict
    this.options = options
    this.options.styles = options.styles || {}
    this.node_width = this.options.node_width || NODE_WIDTH
    this.node_height = this.options.node_height || NODE_HEIGHT
    this.top = top - (parent ? parent.top : 0)
    this.left = left - (parent ? parent.left : 0)
    this.offset_x = 0
    this.children = []
    this.width = 0
    this.height = 0
    this.el = null

    this._cls = 'c' + (Array.isArray(this._a) ? this._a.join('_') : this._a).replace(/[^\w]/g, '_')

    if ((this.parent && this.parent.is_not)) {
      this.top += NOT_PADDING[1]
      this.left += NOT_PADDING[0]
    }

    if (Array.isArray(s)) {
      this.lg = s[0]
      this.s = s.slice(1)
    } else {
      this.lg = ''
      this.s = s.replace(/^\s*\!/, '')
    }

    this.calc()
  }

  calc () {
    let top = this.top
    let left = this.left
    this.children = []

    if (Array.isArray(this.s)) {
      this.s.map((i, idx) => {
        let r = new Rule(this, i, this.r_dict, this._dict, this.options, top, left)
        this.children.push(r)

        if (this.lg == '&') { // &
          this.width += r.width + (idx > 0 ? margin[1] : 0) + r.offset_x * 2
          this.height = Math.max(this.height, r.height)
          left += r.width + margin[1]
        } else { // |
          this.width = Math.max(this.width, (r.width + r.offset_x * 2))
          this.height += r.height + (idx > 0 ? margin[0] : 0)
          top += r.height + margin[0]
        }
      })
    } else if (this.s.match(/^r/)) {
      let r
      r = new Rule(this, this.r_dict[this.s], this.r_dict, this._dict, this.options, this.top, this.left)
      this.children.push(r)
      this.width = r.width
      this.height = r.height

      if (this.is_not) {
        this.left += margin[0]
        this.offset_x = margin[0]
        this.width += NOT_PADDING[0] * 2
        this.height += NOT_PADDING[1] * 2
      }

    } else {
      // node
      // this.top += margin[0];
      // this.left += margin[1];
      this.width = this.node_width
      this.height = this.node_height

      // if (this.is_not) {
      //     this.left += margin[0];
      //     this.offset_x = margin[0];
      //     this.width += NOT_PADDING[0] * 2;
      //     this.height += NOT_PADDING[1] * 2;
      // }
    }

    // this.adjust();
  }

  each (fn) {
    this.children.map((i) => {
      i.each(fn)
      fn(i)
    })
  }

  getOffset () {
    let top = this.top
    let left = this.left

    let p = this.parent
    while (p) {
      top += p.top
      left += p.left
      p = p.parent
    }

    return {top: top, left: left}
  }

  inout () {
    let offset = this.getOffset()
    let px = this.lg ? Math.floor(margin[1] / 3) : 0
    // let py = this.lg ? margin[0] / 2 : 0;
    this.in_x = offset.left - px
    this.in_y = offset.top + this.height / 2
    this.out_x = offset.left + this.width + px
    this.out_y = offset.top + this.height / 2

    this.each((i) => {
      let p = i.parent
      while (p) {
        if (p.in_x > i.in_x) {
          p.in_x = i.in_x
        }
        if (p.out_x < i.out_x) {
          p.out_x = i.out_x
        }
        p = p.parent
      }
    })
  }

  adjust () {
    this.children.map(i => i.adjust())

    if (!this.parent || this.parent.lg != '&') {
      this.inout()
      return
    }
    let ph = this.parent.height
    let h = this.height

    if (h < ph) {
      this.top += (ph - h) / 2
    }

    this.inout()

  }

  getPrev () {
    if (!this.parent) return null

    if (this.parent.lg !== '&') {
      return this.parent
    }

    let siblings = this.parent.children
    let idx = siblings.findIndex(i => i == this)
    if (idx === 0) {
      return this.parent
    } else {
      return siblings[idx - 1]
    }
  }

  getNext () {
    if (!this.parent) return null

    if (this.parent.lg !== '&') {
      return this.parent
    }

    let siblings = this.parent.children
    let idx = siblings.findIndex(i => i == this)
    if (idx === siblings.length - 1) {
      return this.parent
    } else {
      return siblings[idx + 1]
    }
  }

  drawLines (ctx) {
    this.children.map((i) => {
      i.drawLines(ctx)
    })

    // if (this.parent && !this.parent.lg) return;

    let i = this.getPrev()
    if (i) {
      if (i != this.parent) {
        line(ctx, i.out_x, i.out_y, this.in_x, this.in_y)
      } else {
        line(ctx, i.in_x, i.in_y, this.in_x, this.in_y)
      }
    }
    i = this.getNext()
    if (i) {
      if (i != this.parent) {
        line(ctx, this.out_x, this.out_y, i.in_x, i.in_y, true)
      } else {
        line(ctx, this.out_x, this.out_y, i.out_x, i.out_y, true)
      }
    }
  }

  toStr () {
    let s = convert.toStr(this._original_s, this.r_dict, this._dict)
    s = s.replace(/&/g, ' & ').replace(/\|/g, ' | ')
    return s
  }

  /**
   * @param rules {Array}
   */
  highLight (rules) {
    let keys = []
    for (let k in this._dict) {
      if (this._dict.hasOwnProperty(k)) {
        let v = this._dict[k]
        rules.map((i) => {
          if (i == v) {
            keys.push(k)
          }
        })
      }
    }

    if (!this.el) return
    $(this.el).find('.rule-v-node').removeClass('rule-v-hl')
    keys.map((k) => {
      $(this.el).find('.rule-v-node-' + k).addClass('rule-v-hl')
    })
  }

  render (el) {
    this.el = el
    let html = []
    let style = {
      top: this.top + 'px',
      left: this.left + 'px',
      width: this.width + 'px',
      height: this.height + 'px'
    }
    html.push('<div class="rule '
      + this._cls
      + (this.is_not ? ' not' : '')
      + '" style="' + styleObjToStr(style) + '" data-lg="' + this.lg
      + '" data-x="' + JSON.stringify({
        in_x: this.in_x,
        in_y: this.in_y,
        out_x: this.out_x,
        out_y: this.out_y
      }).replace(/"/g, '&quot;') + '">')

    if (this.is_not) {
      html.push('<div class="rule-not" style="top:' + (this.height / 2 - 7) + 'px;">!</div>')
    }

    if (this.children.length > 0) {
      this.children.map((n) => {
        html.push(n.render())
      })
    } else {
      // node
      let c = this._dict[this._a]
      let style = {
        width: (this.node_width - 2) + 'px;',
        height: (this.node_height - 2) + 'px;',
        'line-height': (this.node_height) + 'px;'
      }
      let custom_style = this.options.styles[c]
      if (custom_style) {
        style = Object.assign(style, custom_style)
      }

      html.push('<div class="rule-v-node node' +
        (this.is_not ? ' not' : '')
        + ` rule-v-node-${this._a}`
        + `" style="${styleObjToStr(style)}"`
        + ' data-a="' + this._a + '"'
        + '>')
      html.push(c)
      // html.push('<div class="rule-v-btn rule-v-btn-add-before">+</div>');
      // html.push('<div class="rule-v-btn rule-v-btn-add-after">+</div>');
      // html.push('<div class="rule-v-btn rule-v-btn-add-top">+</div>');
      // html.push('<div class="rule-v-btn rule-v-btn-add-bottom">+</div>');
      // html.push('<div class="rule-v-btn btn-remove">-</div>');
      html.push('</div>')
    }

    html.push('</div>')
    if (el) {
      let w = this.width + margin[1] * 2
      let h = this.height + margin[0] * 2
      el.css({
          width: w,
          height: h
        })
        .html('<canvas width="' + w + '" height="' + h + '"></canvas>' + html.join(''))

      let c = el.find('canvas')[0]
      let ctx = c.getContext('2d')
      this.drawLines(ctx)

      // start
      line(ctx, 0, this.in_y, this.in_x, this.in_y)
      // end
      line(ctx, this.out_x, this.out_y, this.out_x + margin[1], this.out_y)
    }

    return html.join('')
  }
}

exports.Rule = Rule
