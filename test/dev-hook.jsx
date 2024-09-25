import "react-hot-loader";
import { hot } from "react-hot-loader/root";
// import DevLayout from "./examples/00-showcase.jsx";
import DevLayout from "./examples/nested-rgl/App";
import makeLayout from "./test-hook";

const Layout = makeLayout(DevLayout);

export default hot(Layout);
