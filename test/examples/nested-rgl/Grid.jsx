import React, { useState, useEffect, useRef, useCallback } from "react";
import GridLayout from "../../../lib/ReactGridLayout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import "./styles.css";

import {
  initalLayout,
  initalChildLayout1,
  initalChildLayout2,
  cols,
  rowHeight,
  rowHeightChild,
  getStringForPos,
  onDragStartGetter,
  onDropGetter,
  onDropDragOver,
  getDroppable,
  reorganizeLayout,
  subject,
} from "./layouts";

function fireCustomEvent(eventName, element, data) {
  "use strict";
  var event;
  data = data || {};
  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, true, true);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
  }

  event.eventName = eventName;
  for (const key in data) {
    event[key] = data[key];
  }
  // event = { ...event, ...data };

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent("on" + event.eventType, event);
  }
}

export const ParentGrid = () => {
  let [layout, setLayout] = useState(initalLayout);
  let [movingId, setMovingId] = useState("");
  const ref = useRef(null);

  const layoutChange = (layout) => {
    console.log(layout);
  };

  useEffect(() => {
    subject.subscribe(() => {
      // if (!getDroppable(layout)) {
      reorganizeLayout(setLayout);
      ref.current.removeDroppingPlaceholder();
      // }
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    // if ()
    // console.log(">>> mousemove", e);
    // fireCustomEvent("dragOver", e.currentTarget, e);
  }, []);

  const handleMouseUp = useCallback((e) => {
    // if ()
    // console.log(">>> mouseup", e);
  }, []);

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div> */}
      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={layoutChange}
        onDrop={onDropGetter(setMovingId, setLayout)}
        onDragStart={onDragStartGetter(setMovingId)}
        // onDragStop={() => reorganizeLayout(setLayout)}
        isDroppable={getDroppable(layout)}
        cols={cols}
        rowHeight={rowHeight}
        width={600}
        isDraggable={true}
        draggableCancel=".child-layout-item"
        onDropDragOver={onDropDragOver}
        ref={ref}
      >
        <div className="parent-layout-item" key={"x"}>
          <ChildGrid1 setMovingId={setMovingId} />
        </div>
        <div className="parent-layout-item" key={"y"}>
          <ChildGrid2 setMovingId={setMovingId} />
        </div>
        {layout
          .filter((item) => !["x", "y"].includes(item.i))
          .map((item) => {
            return (
              <div
                data-id={item.i}
                key={item.i}
                className="parent-item-container parent-layout-item"
                // draggable={true}
                onDragStart={(e) => {
                  window.movingId = e.target.dataset.id;
                  // reorganizeLayout(setLayout);
                }}
              >
                {item.i}
              </div>
            );
          })}
      </GridLayout>
    </div>
  );
};

export const ChildGrid1 = ({ setMovingId }) => {
  let [layout, setLayout] = useState(initalChildLayout1);
  // useEffect(() => {
  //   console.log("Layout1:", layout);
  // }, [layout]);
  const ref = useRef(null);

  const layoutChange = (layout) => {
    console.log(layout);
  };

  useEffect(() => {
    subject.subscribe(() => {
      // if (!getDroppable(layout)) {
      reorganizeLayout(setLayout);
      ref.current.removeDroppingPlaceholder();
      // }
    });
  }, []);

  return (
    <div id="child1">
      <GridLayout
        className="layout child-layout"
        layout={layout}
        onLayoutChange={layoutChange}
        onDrop={onDropGetter(setMovingId, setLayout)}
        onDragStart={onDragStartGetter(setMovingId)}
        isDroppable={getDroppable(layout)}
        cols={cols}
        rowHeight={rowHeightChild}
        width={600}
        isDraggable={true}
        isBounded={false}
        autoSize={true}
        onDropDragOver={onDropDragOver}
        ref={ref}
      >
        {layout.map((item) => (
          <div
            data-id={item.i}
            key={item.i}
            className="child-layout-item child1-layout-item"
            draggable={false}
            onDragStart={(e) => {
              window.movingId = e.target.dataset.id;
              // reorganizeLayout(setLayout);
            }}
          >
            {item.i}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export const ChildGrid2 = ({ setMovingId }) => {
  let [layout, setLayout] = useState(initalChildLayout2);
  const ref = useRef(null);

  useEffect(() => {
    subject.subscribe(() => {
      // if (!getDroppable(layout)) {
      reorganizeLayout(setLayout);
      ref.current.removeDroppingPlaceholder();
      // }
    });
  }, []);

  return (
    <div id="child2">
      <GridLayout
        className="layout child-layout"
        layout={layout}
        // onLayoutChange={layoutChange}
        onDrop={onDropGetter(setMovingId, setLayout)}
        onDragStart={onDragStartGetter(setMovingId)}
        // onDragStop={() => reorganizeLayout(setLayout)}
        onDropDragOver={onDropDragOver}
        isDroppable={getDroppable(layout)}
        cols={cols}
        rowHeight={rowHeightChild}
        isDraggable={true}
        width={600}
        ref={ref}
      >
        {layout.map((item) => (
          <div
            data-id={item.i}
            key={item.i}
            className="child-layout-item child2-layout-item"
            draggable={false}
            onDragStart={(e) => {
              window.movingId = e.target.dataset.id;
            }}
          >
            {item.i}
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
