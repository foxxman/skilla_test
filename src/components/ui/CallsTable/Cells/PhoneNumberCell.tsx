import React, { FC } from "react";
import styles from "../../../../sass/Calls.module.scss";

interface PhoneNumberCellProps {
  phone: string;
}

const PhoneNumberCell: FC<PhoneNumberCellProps> = ({ phone }) => {
  return (
    <div className={styles.CallsRowCell}>
      <p>{phone}</p>
    </div>
  );
};

export default PhoneNumberCell;
