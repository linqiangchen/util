"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.sortByProp = exports.randomColor = exports.swap = exports.addZero = exports._sort = exports.randomInt = void 0;
/**
     * 产生[min,max]范围内的整数
     * @param min 范围下限
     * @param max 范围上限
     */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.randomInt = randomInt;
/**
     * 自定义排序
     * @param arr 需要进行排序的数组
     * @param type 排序方式：1升序，2：降序，3：随机
     */
function _sort(arr, type) {
    return arr.sort(function (a, b) {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
            default:
                return 0;
        }
    });
}
exports._sort = _sort;
/**
     * 补零，返回字符串
     * @param num 需要补零的数字或字符串
     * @param len 希望补成多少位，默认为两位
     * @param str 用什么填补，默认用'0'
     * @param location 插入位置，before：前面，after：后面
     */
function addZero(num, len, str, location) {
    if (len === void 0) { len = 2; }
    if (str === void 0) { str = '0'; }
    if (location === void 0) { location = 'before'; }
    len = len - num.toString().length;
    var tmp = '';
    for (var i = 0; i < len; i++) {
        tmp += location === 'before' ? (str + num) : (num + str);
    }
    return tmp || num + '';
}
exports.addZero = addZero;
/**
     * 传入索引交换两个元素的值
     * @param arr 需要交换元素的数组
     * @param fir 第一个元素下标
     * @param sec 第二个元素下标
     */
function swap(arr, fir, sec) {
    var temp = arr[fir];
    arr[fir] = arr[sec];
    arr[sec] = temp;
}
exports.swap = swap;
/**
     * 产生随机16进制的颜色
     */
function randomColor() {
    var map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    var str = '#';
    for (var i = 0; i < 6; i++) {
        var index = randomInt(0, 15);
        str += map[index];
    }
    return str;
}
exports.randomColor = randomColor;
/**
     * 根据对象某个属性进行排序,返回一个新数组
     * @param arr 需要排序的数组，请确保传入一个对象数组
     * @param property 排序的依据，请确保数组中的每一个对象都拥有该属性，
     * 能够进行排序的类型为string | number | bigint
     * 请确保该属性的值为上述类型中的一种
     * @param type 排序规则：0：降序1：升序
     */
function sortByProp(arr, property, type) {
    var _arr = __spreadArrays(arr);
    _arr.sort(function (a, b) { return type ? (a[property] - b[property]) : (b[property] - a[property]); });
    return _arr;
}
exports.sortByProp = sortByProp;
/**
     * 格式化时间戳
     * @param time 时间戳
     * @param type 返回格式：
     * Y-M-D H-M-S：2020年10月24日 12时10分24秒
     * y-m-d h-m-s: 2020-10-24 12:10:24
     * Y-M-D：2020年10月24日
     * y-m-d：2020-10-24
     * H-M-S：12时10分24秒
     * h-m-s：12:10:24
     * Y-M-D H-M：2020年10月24日 12时10分
     * y-m-d h-m：2020-10-24 12:10
     * M-D：10月24日
     * m-d：10-24
     */
function formatDate(type, time) {
    if (time === void 0) { time = Date.now(); }
    var date = new Date(time);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    console.log('hour: ', hour);
    var minute = addZero(date.getMinutes());
    var second = addZero(date.getSeconds());
    switch (type) {
        case 'H-M-S':
            return hour + '时' + minute + '分' + second + '秒';
        case 'h-m-s':
            return hour + ':' + minute + ':' + second + '秒';
        case 'M-D':
            return month + '月' + day + '日';
        case 'm-d':
            return month + '-' + day + '-';
        case 'Y-M-D':
            return year + '年' + month + '月' + day + '日';
        case 'y-m-d':
            return year + '-' + month + '-' + day;
        case 'Y-M-D H-M':
            return year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分';
        case 'y-m-d h-m':
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
        case 'Y-M-D H-M-S':
            return year + '年' + month + '月' + day + '日 ' + hour + '时' + minute + '分' + second + '秒';
        case 'y-m-d h-m-s':
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        default:
            return '';
    }
}
exports.formatDate = formatDate;
