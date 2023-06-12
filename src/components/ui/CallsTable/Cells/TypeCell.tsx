import React, { FC } from "react";
import { CALL_TYPE } from "../../../../types/calls";
import styles from "../../../../sass/Calls.module.scss";
import { ReactComponent as CallInIcon } from "../../../../assets/icons/arrows/call_in.svg";
import { ReactComponent as CallOutIcon } from "../../../../assets/icons/arrows/call_out.svg";

interface TypeCellProps {
  type: CALL_TYPE;
}
const TypeCell: FC<TypeCellProps> = ({ type }) => {
  return (
    <div className={`${styles.CallsRowCell} justify-center`}>
      {type === CALL_TYPE.IN && <CallInIcon />}
      {type === CALL_TYPE.OUT && <CallOutIcon />}
    </div>
  );
};

export default TypeCell;
