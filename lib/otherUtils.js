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
    x: Math.round(width * 0.04),
    y: getHeightStep(),
  };
  console.log('===> dragStep', step);
  return {
    ...newItem,
    x: oldItem.x + Math.round((newItem.x - oldItem.x) / step.x) * step.x,
    y: oldItem.y + Math.round((newItem.y - oldItem.y) / step.y) * step.y,
  };
};

export const resizeStep = (oldItem: any, newItem: any, width: number) => {
  const step = {
    x: Math.round(width * 0.04),
    y: getHeightStep(),
  };
  console.log('===> resizeStep', step, oldItem.w, oldItem.w + Math.round((newItem.w - oldItem.w) / step.x) * step.x);
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