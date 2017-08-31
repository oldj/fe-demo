/**
 * add_brackets.spec.js
 */

'use strict'

const {test} = require('ava')
const checkAndAdd = require('./add_brackets').checkAndAdd

test('rule-visualization: basic', t => {
  t.is(checkAndAdd('1&2'), '1&2')
  t.is(checkAndAdd('1&2&3'), '1&2&3')
  t.is(checkAndAdd('1|2|3'), '1|2|3')

  t.is(checkAndAdd('1&2|3'), '(1&2)|3')
  t.is(checkAndAdd('1|2&3'), '1|(2&3)')
  t.is(checkAndAdd('1&2|3|4'), '(1&2)|3|4')
  t.is(checkAndAdd('1&2|3|4&5'), '(1&2)|3|(4&5)')

  t.is(checkAndAdd('1&2|3|4&5&6&7|8|9'), '(1&2)|3|(4&5&6&7)|8|9')
})

test('rule-visualization: with brackets', t => {
  t.is(checkAndAdd('1|(2&3)|4'), '1|(2&3)|4')
  t.is(checkAndAdd('1|(2&3|31)|4'), '1|((2&3)|31)|4')
  t.is(checkAndAdd('1|(2&3|31)|4&5'), '1|((2&3)|31)|(4&5)')
  t.is(checkAndAdd('(1|(2&3|31)|4&5)'), '(1|((2&3)|31)|(4&5))')
  t.is(checkAndAdd('1|(2&3|31&32|33)|4&5'), '1|((2&3)|(31&32)|33)|(4&5)')
  t.is(checkAndAdd('1|(2&3|31&32|(33&34|35))|4&5'), '1|((2&3)|(31&32)|((33&34)|35))|(4&5)')

  t.is(checkAndAdd('1&2&(3|4)&(5|6|(7&8&(9|10|11&12)&13))'), '1&2&(3|4)&(5|6|(7&8&(9|10|(11&12))&13))')
})
