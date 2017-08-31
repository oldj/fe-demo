/**
 * add_brackets
 */

'use strict'

function checkAndAdd (rule) {

  function transSimpleRule (simple_rule) {
    let a = simple_rule.split('|')
    if (a.length === 1) return simple_rule
    return a.map(i => {
      if (i.indexOf('&') > -1 && !/^\(.+\)$/.test(i)) {
        return '(' + i + ')'
      }
      return i
    }).join('|')
  }

  let dict = {}
  let loop_left = 100
  let idx = 0
  while (loop_left > 0 && rule.indexOf('(') != -1) {
    // let r = RULE.replace(/\([^\(\)]*?\)/g, 'rr');
    rule = rule.replace(/\([^\(\)]*?\)/g, function (m) {
      let k = 'r' + idx
      dict[k] = transSimpleRule(m)
      idx++
      return k
    })
    loop_left--
  }

  rule = transSimpleRule(rule)

  for (let i = 0; i < 100; i++) {
    if (!rule.match(/\br\d+/)) break
    rule = rule.replace(/\br\d+/g, function (m) {
      return dict[m]
    })
  }

  return rule
}

exports.checkAndAdd = checkAndAdd
