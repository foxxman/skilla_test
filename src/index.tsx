import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "rsuite/dist/rsuite.min.css";
import { Provider } from "react-redux";
import { createStore } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// https://www.figma.com/file/4r3AKQQdDqeFeHkE0M598F/Test-task-for-the-developer-(Copy)-(Copy)-(Copy)?node-id=0%3A1&t=ZBkVfSS2FU0Bm5oF-0
// https://spb.hh.ru/vacancy/77121065?hhtmFrom=chat
