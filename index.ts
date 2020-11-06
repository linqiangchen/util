/**
 * @author:陈林强
 * @timer:2020-10-24
 * @email:1715503491@qq.com
 * @version:1.0
 * @title:封装一个自己常用的工具类js
 * @note:
 */
/**
 * 产生[min,max]范围内的整数
 * @param min 范围下限
 * @param max 范围上限
 * @return 范围内的整数
 * @example randomInt(10,20) => 15
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
/**
 * 产生随机数字验证码
 * @param length 验证码位数，范围2到10,-1表示随机位数
 * @example codeNum(4) => 4681
 */
export function codeNum(length: number = 6): string {
  if (length === -1) {
    return Math.random().toFixed(15).toString().slice(-randomInt(2, 8));
  } else if (length >= 2 && length <= 10) {
    return Math.random().toString().slice(-length);
  } else {
    return "null";
  }
}
/**
 * 产生随机验证码包括数字，字母（大小写）
 * @param len 验证码位数
 * @example randomCode(6) => By5Z1Y
 */
export function randomCode(len: number = 6): string {
  var arr: string[] = [];
  for (let i = 0, n = len; i < n; i++) {
    do {
      var ascii = randomInt(48, 122);
    } while ((ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97));
    arr[i] = String.fromCharCode(ascii);
  }
  return arr.join("");
}
/**
 * 自定义排序
 * @param arr 需要进行排序的数组
 * @param type 排序方式：1升序，2：降序，3：随机
 * @return 排好序的数组
 * @example _sort([1,3,2],1) => [1,2,3]
 */
export function _sort(arr: any[], type: 1 | 2 | 3) {
  return arr.sort((a, b) => {
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
/**
 * 补零，返回字符串
 * @param num 需要补零的数字或字符串
 * @param len 希望补成多少位，默认为两位
 * @param str 用什么填补，默认用'0'
 * @param location 插入位置，before：前面，after：后面
 * @example addZero(4) => '04'
 */
export function addZero(
  num: number | string,
  len: number = 2,
  str: string = "0",
  location: "before" | "after" = "before"
): string {
  //传入位数,自动补零
  len = len - num.toString().length;
  let tmp: string = "";
  for (var i = 0; i < len; i++) {
    tmp += location === "before" ? str + num : num + str;
  }
  return tmp || num + "";
}
/**
 * 传入索引交换两个元素的值
 * @param arr 需要交换元素的数组
 * @param fir 第一个元素下标
 * @param sec 第二个元素下标
 * @example swap([1,2],0,1)
 */
export function swap(arr: any[], fir: number, sec: number) {
  //交换数组中的两个值的位置
  var temp = arr[fir];
  arr[fir] = arr[sec];
  arr[sec] = temp;
}
/**
 * 产生随机16进制的颜色
 * @example randomColor() => '#f2f2f2'
 */
export function randomColor(): string {
  //产生随机的颜色
  var map = [1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  var str = "#";
  for (var i = 0; i < 6; i++) {
    var index = randomInt(0, 15);
    str += map[index];
  }
  return str;
}
/**
 * 根据对象某个属性进行排序,返回一个新数组
 * @param arr 需要排序的数组，请确保传入一个对象数组
 * @param property 排序的依据，请确保数组中的每一个对象都拥有该属性，
 * 能够进行排序的类型为string | number | bigint
 * 请确保该属性的值为上述类型中的一种
 * @param type 排序规则：0：降序1：升序
 */
export function sortByProp<T>(arr: T[], property: keyof T, type: 0 | 1): T[] {
  let _arr = [...arr];
  _arr.sort((a, b) =>
    type
      ? (a[property] as any) - (b[property] as any)
      : (b[property] as any) - (a[property] as any)
  );
  return _arr;
}
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
 *@example formatDate('Y-M-D H-M-S') => 2020年10月24日 12时10分24秒
 */
type TimeType =
  | "Y-M-D H-M-S"
  | "y-m-d h-m-s"
  | "Y-M-D"
  | "y-m-d"
  | "H-M-S"
  | "h-m-s"
  | "Y-M-D H-M"
  | "y-m-d h-m"
  | "M-D"
  | "m-d";
export function formatDate(type: TimeType, time: number = Date.now()): string {
  const date = new Date(time);
  let year = date.getFullYear();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let hour = addZero(date.getHours());
  let minute = addZero(date.getMinutes());
  let second = addZero(date.getSeconds());
  switch (type) {
    case "H-M-S":
      return hour + "时" + minute + "分" + second + "秒";
    case "h-m-s":
      return hour + ":" + minute + ":" + second + "秒";
    case "M-D":
      return month + "月" + day + "日";
    case "m-d":
      return month + "-" + day + "-";
    case "Y-M-D":
      return year + "年" + month + "月" + day + "日";
    case "y-m-d":
      return year + "-" + month + "-" + day;
    case "Y-M-D H-M":
      return (
        year + "年" + month + "月" + day + "日 " + hour + "时" + minute + "分"
      );
    case "y-m-d h-m":
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    case "Y-M-D H-M-S":
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hour +
        "时" +
        minute +
        "分" +
        second +
        "秒"
      );
    case "y-m-d h-m-s":
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    default:
      return "";
  }
}
interface Obj {
  [prop: string]: any;
  [prop: number]: any;
}
/**
 * 深克隆对象(不能克隆null，undefined和函数)
 * @param obj 需要克隆的对象
 */
export function clone(obj: Obj): Obj {
  if (typeof obj === "object") {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return {};
  }
}
/**
 * 深获取对应的星期
 * @param type 返回类型：0 => '星期一' ，1 => '周一' 默认为 0
 * @param time 时间戳默认为当前时间
 */
export function getWeek(type: 0 | 1 = 1, time: number = Date.now()): string {
  let date = new Date(time);
  const week1 = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const week2 = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return type ? week1[date.getDay()] : week2[date.getDay()];
}

/**
 * 对象转化为查询字符串
 * @param data 需要转化的对象
 */
export function parseData(data: {}) {
  let arr = Object.entries(data);
  let tmp = arr.map((item) => item.join("=")).join("&");
  return arr.length ? "?" + tmp : "";
}
interface parseUrlObj {
  [props: string]: string;
}
/**
 * url参数转化为对象
 * @param url 需要转化的参数字符串 格式为‘?name=111&age=12' 或者 'http://eveal.cn:3000/dist/post?name=111&age=12'
 * @example parseUrl('http://eveal.cn:3000/dist/post?name=111&age=12') => { name: '111', age: '12' }
 */
export function parseUrl(url: string) {
  let obj: parseUrlObj = {};
  let str = url.split("?");
  if (!str.length) {
    return obj;
  }
  let target = str[str.length - 1];
  target
    .split("&")
    .map((item) => item.split("="))
    .forEach(([key, val]) => {
      obj[key] = val;
    });
  return obj;
}

/**
 * 格式化数字
 * @param num 需要格式化的数字
 * @param fixed 固定多少位小数,默认为2
 * @param limit 最小范围，当num > limit 才格式化数字.默认为10000
 * @example formatNumber(541346445,3,10000) => 5.413亿
 */
export function formatNumber(num:number,fixed:number = 2,limit:number = 10000):string{
    if(num <= limit){
        return num.toString()
    }else if(num < 100000000){
        return (num/10000).toFixed(fixed) + '万'
    }else if(num> 100000000){
        return (num/100000000).toFixed(fixed) + '亿'
    }else{
        return (num/1000000000000).toFixed(fixed) + '万亿'
    }
}


