import {
  compact,
} from "./utils";

export const roundNumber = (num: number, hasDecimal = true) => {
  if (!hasDecimal) {
    return Math.round(num);
  }
  const decimalPlaces = 3;
  const shifted = Number(num + 'e' + decimalPlaces);
  const rounded = Math.round(shifted);
  const result = Number(rounded + 'e-' + decimalPlaces);
  return result;
};

// 偏移值还原本初，其是变化值而非倍数，
export const dragStep = (oldItem: any, newItem: any, step: any) => {
  const transOldItemX = roundNumber((Math.round((oldItem.x) / step.x) * step.x))
  const transOldItemY = roundNumber((Math.round((oldItem.y) / step.y) * step.y))
  return {
    ...newItem,
    x: transOldItemX + roundNumber(Math.round((newItem.x - oldItem.x) / step.x) * step.x),
    y: transOldItemY + roundNumber((newItem.y - oldItem.y) / step.y) * step.y,
  };
};

export const resizeStep = (oldItem: any, newItem: any, step: any) => {
  // const isXChange = oldItem.x === newItem.x;
  // 改x跟不改x是两个东西
  return {
    ...newItem,
    x: oldItem.x + roundNumber(Math.round((newItem.x - oldItem.x) / step.x) * step.x),
    y: oldItem.y + roundNumber(Math.round((newItem.y - oldItem.y) / step.y) * step.y),
    w: Math.max(oldItem.w + roundNumber(Math.round((newItem.w - oldItem.w) / step.x) * step.x), newItem.minW || 0),
    h: Math.max(oldItem.h + roundNumber(Math.round((newItem.h - oldItem.h) / step.y) * step.y), newItem.minH || 0),
  };
};

export const getPlaceholderPosition = (l: any, oldItem: any, step: any, layout: any, cols: number, isResize?: boolean) => {
  const compactLayout = compact(layout, 'vertical', cols, undefined, step, 'dragPlaceholder');
  const sortedL = compactLayout.find(ele => ele.i === l.i);
  if (isResize) {
    return {
      x: oldItem.x + roundNumber(Math.round((sortedL.x - oldItem.x) / step.x) * step.x),
      y: oldItem.y + roundNumber(Math.round((sortedL.y - oldItem.y) / step.y) * step.y),
      w: Math.max(oldItem.w + roundNumber(Math.round((sortedL.w - oldItem.w) / step.x) * step.x), l.minW || 0),
      h: Math.max(oldItem.h + roundNumber(Math.round((sortedL.h - oldItem.h) / step.y) * step.y), l.minH || 0),
      static: true,
      i: sortedL
    }
  }
  const transOldItemX = roundNumber((Math.round((oldItem.x) / step.x) * step.x))
  const transOldItemY = roundNumber((Math.round((oldItem.y) / step.y) * step.y))
  return {
      w: sortedL.w,
      h: sortedL.h,
      x: transOldItemX + roundNumber(Math.round((sortedL.x - oldItem.x) / step.x) * step.x),
      y: transOldItemY + roundNumber(Math.round((sortedL.y - oldItem.y) / step.y) * step.y),
      placeholder: true,
      i: sortedL.i
    }
}