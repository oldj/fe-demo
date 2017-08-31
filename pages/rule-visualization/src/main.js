/**
 * t2
 */

'use strict'

const convert = require('./libs/convert')
const add_brackets = require('./libs/add_brackets')
const Rule = require('./libs/Rule').Rule

require('./style.less')

class RuleVisualizer {
  constructor (rules, element, options) {
    this.rules = rules
    this.element = $(element)

    this.obj = ruleParseAndShow(this.rules, this.element, options)
  }

  toStr () {
    return this.obj.toStr()
  }

  /**
   * 高亮指定规则
   * @param rules {Array} 规则名，形如：[15, 20]
   */
  highLight (rules) {
    if (!Array.isArray(rules)) {
      rules = [rules]
    }
    this.obj.highLight(rules)
  }
}

function ruleParseAndShow (my_rules, el, options = {}) {

  el.addClass('rule-v-container')

  my_rules = convert.clean(my_rules)
  my_rules = add_brackets.checkAndAdd(my_rules)
  let rules_obj = convert.toObj(my_rules)

  my_rules = rules_obj.rules
  let r_dict = rules_obj.r_dict
  let _dict = rules_obj._dict
  // console.log(JSON.stringify(my_rules));
  // console.log(JSON.stringify(r_dict));
  // console.log(JSON.stringify(_dict));

  if (typeof options === 'function') {
    options = {
      ready: options
    }
  }

  let r = new Rule(null, my_rules, r_dict, _dict, options)
  r.adjust()
  r.each(i => i.inout())
  r.render(el)

  $(el).on('click', '.rule-v-btn', function (e) {
    e.stopPropagation()
    $(el).off()
    let o = $(this)
    let a = o.parent().attr('data-a')

    if (o.hasClass('rule-v-btn-add-after')) {
      _dict[a] = '(' + _dict[a] + '&0)'
    } else if (o.hasClass('rule-v-btn-add-before')) {
      _dict[a] = '(0&' + _dict[a] + ')'
    } else if (o.hasClass('rule-v-btn-add-top')) {
      _dict[a] = '(0|' + _dict[a] + ')'
    } else if (o.hasClass('rule-v-btn-add-bottom')) {
      _dict[a] = '(' + _dict[a] + '|0)'

    } else if (o.hasClass('btn-remove')) {
      _dict[a] = ''
    }

    let new_rule = convert.toStr(my_rules, r_dict, _dict)
    ruleParseAndShow(new_rule, el)
  })

  setTimeout(() => {
    typeof options.ready === 'function' && options.ready()
  }, 1)

  return r
}

window.RuleVisualizer = RuleVisualizer
