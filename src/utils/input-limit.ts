/**
 * input 输入框限制
 * @param input 入参支持：string
 * @param num 小数位数，默认 2 位小数
 */
export const inputLimit = (input: string, num: number = 2) => {
  const reg = new RegExp(`^(\\.*)(\\d+)(\\.?)(\\d{0,${num}}).*$`);

  if (reg.test(input)) {
    //正则匹配通过，提取有效文本
    input = input.replace(reg, '$2$3$4');
  } else {
    //正则匹配不通过，直接清空
    input = '';
  }

  return input; //返回符合要求的文本（为数字且最多有带2位小数）
};
