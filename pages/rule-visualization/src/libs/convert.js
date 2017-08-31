/**
 * convert
 */

'use strict';

const add_brackets = require('./add_brackets');

function toStr(a, r_dict, _dict) {
    a = a.slice(0);
    let lg = a.shift();

    a = a.map(i => {
        let is_not = i.startsWith('!');
        if (is_not) {
            i = i.replace(/^!/g, '');
        }

        let r;

        if (i.startsWith('_')) {
            r = _dict[i];
        } else if (i.startsWith('r')) {
            r = '(' + toStr(r_dict[i], r_dict, _dict) + ')';
        } else {
            r = i;
        }

        return (r && is_not ? '!' : '') + r;
    });

    let s = a.filter(i => !!i).join(lg);
    s = add_brackets.checkAndAdd(s);
    s = removeUnnecessaryBrackets(s);
    return s;
}

exports.toStr = toStr;

function toObj(my_rules) {
    let _dict = {};
    let r_idx = 0;
    let r_dict = {};
    let idx = 0;

    my_rules = my_rules.replace(/\d+/g, function (m) {
        let k = '_' + r_idx;
        _dict[k] = m;
        r_idx++;
        return k;
    });

    function parseLg(m) {
        let lg = '';
        if (m.indexOf('&') > -1) {
            lg = '&';
        } else if (m.indexOf('|') > -1) {
            lg = '|';
        }
        m = m.replace(/([&\|])/g, ' $1 ').replace(/[\(\)&\|]/g, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ').split(' ');
        if (m.length === 1) {
            lg = '&';
        }
        lg && m.unshift(lg);
        return m;
    }

    let loop_left = 100;
    while (loop_left > 0 && my_rules.indexOf('(') != -1) {
        // let r = RULE.replace(/\([^\(\)]*?\)/g, 'rr');
        my_rules = my_rules.replace(/\([^\(\)]*?\)/g, function (m) {
            let k = 'r' + idx;
            r_dict[k] = parseLg(m);
            idx++;
            return k;
        });
        loop_left--;
    }
    my_rules = parseLg(my_rules);

    return {
        rules: my_rules,
        r_dict: r_dict,
        _dict: _dict
    };
}

exports.toObj = toObj;


function clean(my_rules) {
    // 替换全角符号
    my_rules = (my_rules || '')
        .replace(/！/g, '!')
        .replace(/（/g, '(')
        .replace(/）/g, ')')
    ;

    my_rules = my_rules
        .replace(/\!\s*/g, '!')
        .replace(/\!\!/g, '')
        .replace(/\(\s*(\!*\d+)\s*\)/g, '$1')
        .replace(/\!*\s*\(\s*\)/g, '')
    ;

    if (!my_rules) return '';

    // 语法检验
    // if (my_rules.split('(').length != my_rules.split(')').length) {
    //     throw new Error('Syntax Error!');
    // }
    if (!/[\d\!\(\)&\|\s]+/.test(my_rules)) {
        throw new Error('Syntax Error!');
    }
    try {
        eval(my_rules);
    } catch (e) {
        console.log(my_rules);
        throw new Error('Syntax Error!');
    }

    return removeUnnecessaryBrackets(my_rules);
}

exports.clean = clean;


function removeUnnecessaryBrackets(s) {

    let s1;
    for (let i = 0; i < 100; i++) {
        s1 = s
            .replace(/([&|\|])\s*\((\d+([&|\|])[^\(\)]+?)\)/g, (m, $1, $2, $3) => {
                if ($1 == $3) {
                    return $1 + $2;
                } else {
                    return m;
                }
            })
            .replace(/\((\d+([&|\|])[^\(\)]+?)\)\s*([&|\|])/g, (m, $1, $2, $3) => {
                if ($2 == $3) {
                    return $1 + $2;
                } else {
                    return m;
                }
            })
        ;

        if (s1 == s) break;
        s = s1;
    }

    return s;
}

exports.removeUnnecessaryBrackets = removeUnnecessaryBrackets;
