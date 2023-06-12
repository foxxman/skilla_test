import React, { FC } from "react";
import { ReactComponent as Spinner } from "../../assets/icons/spinner.svg";
import loaderStyles from "../../sass/Loader.module.scss";

interface LoaderProps {
  show: boolean;
}

const Loader: FC<LoaderProps> = ({ show }) => {
  return <div className={loaderStyles.Loader}>{show && <Spinner />}</div>;
};

export default Loader;
