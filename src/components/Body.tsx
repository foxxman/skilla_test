import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "../sass/App.module.scss";
import { useAppDispatch } from "../store";
import { loadLastCallsList } from "../store/reducers/callsReducer";
import CallsTable from "./ui/CallsTable/CallsTable";
import Filters from "./ui/Filters/Filters";
import Header from "./ui/Header/Header";

const Body = () => {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(loadLastCallsList(50));
  }, []);

  return (
    <div className={styles.ContentBody}>
      <Header />
      <Filters />
      <CallsTable />
    </div>
  );
};

export default Body;
