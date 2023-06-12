import React from "react";
import styles from "../../../sass/Heaader.module.scss";
import appStyles from "../../../sass/App.module.scss";
import ProgressBlock, { PROGRESS_COLORS } from "./ProgressBlock";
import SearchBlock from "../../common/SearchBlock";
import arrowSmDown from "../../../assets/icons/arrows/arrow-sm-down.svg";
import UserMenu from "./UserMenu";
import getHeaderDate from "../../../utils/getHeaderDate";

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={`d-flex justify-between ${appStyles.Container}`}>
        <p className={styles.HeaderDate}>{getHeaderDate()}</p>

        <div className="d-flex">
          <ProgressBlock
            label="Новые звонки"
            labelProgress="20 из 30 шт"
            lineProgress={66}
            color={PROGRESS_COLORS.SUCCESS}
          />
          <ProgressBlock
            label="Качество разговоров"
            labelProgress="40%"
            lineProgress={40}
            color={PROGRESS_COLORS.WARNING}
          />
          <ProgressBlock
            label="Конверсия в заказ"
            labelProgress="67%"
            lineProgress={67}
            color={PROGRESS_COLORS.DANGER}
          />
        </div>

        <SearchBlock />

        <div className={styles.HeaderPerson}>
          <span>ИП Сидорова Александра Михайловна</span>
          <button>
            <img src={arrowSmDown} alt="open" />
          </button>
        </div>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
