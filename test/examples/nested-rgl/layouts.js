import { Subject } from "rxjs";

export const cols = 12;
export const rowHeight = 80;
export const rowHeightChild = rowHeight - 20;

export const initalLayout = [
  { i: "x", x: 0, y: 2, w: 12, h: 2, static: true },
  { i: "y", x: 0, y: 0, w: 12, h: 2, static: true },
  { i: "p1", x: 0, y: 4, w: 2, h: 1 },
  { i: "p2", x: 2, y: 4, w: 2, h: 1 },
];

export const initalChildLayout1 = [
  { i: "c1-1", x: 0, y: 0, w: 2, h: 2 },
  { i: "c1-2", x: 2, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  { i: "c1-3", x: 5, y: 0, w: 2, h: 2 },
];

export const initalChildLayout2 = [
  { i: "c2-1", x: 0, y: 0, w: 2, h: 2 },
  { i: "c2-2", x: 2, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
  //   { i: 'c2-3', x: 4, y: 0, w: 1, h: 2 },
];

export const subject = new Subject();

let movingId;

export function getWidgetSize(id) {
  let result;
  [initalChildLayout1, initalChildLayout2].some((layout) => {
    if (layout.find((item) => item.i === id)) {
      result = layout.find((item) => item.i === id);
      return true;
    }
    return false;
  });
  return result || { w: 1, h: 1 };
}

export function getStringForPos(item) {
  return JSON.stringify(item, ["x", "y", "w", "h"], 2);
}

export const onDragStartGetter =
  (setMovingId) => (_, item, newItem, placeholder, e, elem) => {
    console.log("movingId", item.i);
    window.movingId = item.i;
    if (item.i && item.i !== "__dropping-elem__") {
      // window.movingId = item.i;
      setMovingId(movingId);
    }
  };

export const onDropGetter = (setMovingId, layoutSetter) => (_, layoutItem) => {
  console.log("Drop Handler called");

  if (!layoutItem) return;

  let item = layoutItem;
  item.i = window.movingId;
  console.log(JSON.stringify(layoutItem, ["x", "y", "w", "h"], 2));
  layoutSetter((initial) => [...initial, item]);

  subject.next();

  window.movingId = "";
  setMovingId(movingId);
};

export const onDropDragOver = (e) => {
  const size = getWidgetSize(window.movingId);
  return {
    w: size.w,
    h: size.h,
  };
};

export const getDroppable = (layout) => {
  return true;
  if (!movingId) {
    return false;
  }
  return Boolean(!layout.find((item) => item.i === movingId));
};

export const reorganizeLayout = (layoutSetter) => {
  layoutSetter((initial) =>
    initial.filter((item) => item.i !== window.movingId)
  );
};
