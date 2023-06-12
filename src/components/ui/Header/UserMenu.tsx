import React from "react";
import styles from "../../../sass/Heaader.module.scss";
import avatar from "../../../assets/images/useravatar.png";
import arrowSmDown from "../../../assets/icons/arrows/arrow-sm-down.svg";
import { ReactComponent as CallIcon } from "../../../assets/icons/navbar/calls.svg";
import { ReactComponent as MailIcon } from "../../../assets/icons/navbar/mail.svg";
import { workers } from "../../../mockData/mockData";
import WorkersList from "./WorkersList";
import LogoutBtn from "../../common/LogoutBtn";

const UserMenu = () => {
  return (
    <div className={styles.UserMenu}>
      <img className={styles.UserMenuAvatar} src={avatar} alt="avatar" />
      <button className={styles.UserMenuOpenBtn}>
        <img src={arrowSmDown} alt="open_menu" />
      </button>
      {/* DROP MENU */}
      <div className={styles.DropMenu}>
        {/* HEADER */}
        <div className={styles.DropMenuHeader}>
          {/* HEADER INFO */}
          <div className={styles.DropMenuHeaderInfo}>
            <span>Упоров Кирилл</span>
            <span>
              Директор
              <div className={styles.Ellipse}></div>
              Санкт-Петербург
            </span>
            <LogoutBtn />
          </div>
          {/* HEADER CONTACTS */}
          <div className={styles.DropMenuHeaderContacts}>
            <p>
              <CallIcon />
              <a href="tel:8 (800) 333-17-21">8 (800) 333-17-21</a>
            </p>
            <p>
              <MailIcon />
              <a href="mailto:hi@skilla.ru">hi@skilla.ru</a>
            </p>
          </div>
        </div>
        {workers.map((workersList) => (
          <WorkersList key={workersList.id} workersList={workersList} />
        ))}
      </div>
    </div>
  );
};

export default UserMenu;
