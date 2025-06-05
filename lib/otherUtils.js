import {
  compact,
} from "./utils";

const standardW = 108;
const standardH = 72;
const standardScreenW = 1494; // 屏幕尺寸为1494
const standardScreenH = 1117;
const GAP = 16;

export const getHeightStep = () => {
  const height = window.innerHeight || standardScreenH;
  return Math.round(Math.round(height * 0.02) / (GAP + 1));
};

// 偏移值还原本初，其是变化值而非倍数，
export const dragStep = (oldItem: any, newItem: any, width: number) => {
  const step = {
    x: Math.round(width * 0.0417),
    y: getHeightStep(),
  };
  return {
    ...newItem,
    x: oldItem.x + Math.round((newItem.x - oldItem.x) / step.x) * step.x,
    y: oldItem.y + Math.round((newItem.y - oldItem.y) / step.y) * step.y,
  };
};

export const resizeStep = (oldItem: any, newItem: any, width: number) => {
  const step = {
    x: Math.round(width * 0.0417),
    y: getHeightStep(),
  };
  // const isXChange = oldItem.x === newItem.x;
  // 改x跟不改x是两个东西
  return {
    ...newItem,
    x: oldItem.x + Math.round((newItem.x - oldItem.x) / step.x) * step.x,
    y: oldItem.y + Math.round((newItem.y - oldItem.y) / step.y) * step.y,
    w: oldItem.w + Math.round((newItem.w - oldItem.w) / step.x) * step.x,
    h: oldItem.h + Math.round((newItem.h - oldItem.h) / step.y) * step.y,
  };
};

export const getPlaceholderPosition = (l: any, oldDragItem: any, step: any, layout: any, cols: number) => {
  const compactLayout = compact(layout, 'vertical', cols, undefined, true);
  const sortedL = compactLayout.find(ele => ele.i === l.i);
  return {
      w: sortedL.w,
      h: sortedL.h,
      x: oldDragItem.x + Math.round((sortedL.x - oldDragItem.x) / step.x) * step.x,
      y: oldDragItem.y + Math.round((sortedL.y - oldDragItem.y) / step.y) * step.y,
      placeholder: true,
      i: sortedL.i
    }
}