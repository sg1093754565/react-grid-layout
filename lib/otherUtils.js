import {
  compact,
} from "./utils";

const standardW = 108;
const standardH = 72;
const standardScreenW = 1494; // 屏幕尺寸为1494
const standardScreenH = 1117;
const GAP = 16;

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

export const getHeightStep = () => {
  const height = window.innerHeight || standardScreenH;
  return Math.round(Math.round(height * 0.02) / (GAP + 1));
};

// 偏移值还原本初，其是变化值而非倍数，
export const dragStep = (oldItem: any, newItem: any, step: any) => {
  const transOldItemX = roundNumber((Math.round((oldItem.x) / step.x) * step.x))
  return {
    ...newItem,
    x: transOldItemX + roundNumber(Math.round((newItem.x - oldItem.x) / step.x) * step.x),
    y: oldItem.y + Math.round((newItem.y - oldItem.y) / step.y) * step.y,
  };
};

export const resizeStep = (oldItem: any, newItem: any, step: any) => {
  // const isXChange = oldItem.x === newItem.x;
  // 改x跟不改x是两个东西
  return {
    ...newItem,
    x: oldItem.x + roundNumber(Math.round((newItem.x - oldItem.x) / step.x) * step.x),
    y: oldItem.y + Math.round((newItem.y - oldItem.y) / step.y) * step.y,
    w: oldItem.w + roundNumber(Math.round((newItem.w - oldItem.w) / step.x) * step.x),
    h: oldItem.h + Math.round((newItem.h - oldItem.h) / step.y) * step.y,
  };
};

export const getPlaceholderPosition = (l: any, oldItem: any, step: any, layout: any, cols: number, isResize?: boolean) => {
  const compactLayout = compact(layout, 'vertical', cols, undefined, 'dragPlaceholder');
  const sortedL = compactLayout.find(ele => ele.i === l.i);
  if (isResize) {
    return {
      x: oldItem.x + roundNumber(Math.round((sortedL.x - oldItem.x) / step.x) * step.x),
      y: oldItem.y + Math.round((sortedL.y - oldItem.y) / step.y) * step.y,
      w: oldItem.w + roundNumber(Math.round((sortedL.w - oldItem.w) / step.x) * step.x),
      h: oldItem.h + Math.round((sortedL.h - oldItem.h) / step.y) * step.y,
      static: true,
      i: sortedL
    }
  }
  const transOldItemX = roundNumber((Math.round((oldItem.x) / step.x) * step.x))
  return {
      w: sortedL.w,
      h: sortedL.h,
      x: transOldItemX + roundNumber(Math.round((sortedL.x - oldItem.x) / step.x) * step.x),
      y: oldItem.y + Math.round((sortedL.y - oldItem.y) / step.y) * step.y,
      placeholder: true,
      i: sortedL.i
    }
}