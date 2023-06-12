import React from "react";
import Body from "./components/Body";
import NavBar from "./components/NavBar";
import styles from "./sass/App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Body />
    </div>
  );
}

export default App;
