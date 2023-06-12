import React, { FC, useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/header/search.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/header/close.svg";
import styles from "../../sass/Heaader.module.scss";
import ActionBtn from "./ActionBtn";

interface SearchBlockProps {
  placeholder?: string;
  handlerChange?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const SearchBlock: FC<SearchBlockProps> = ({
  placeholder = "",
  handlerChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (!disable && inputRef.current) inputRef.current.focus();
  }, [disable]);

  const openBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisable(false);
  };
  const closeBlock = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisable(true);
  };

  return (
    <form className={`${styles.HeaderSearch} ${disable ? styles.Disable : ""}`}>
      <ActionBtn clickHandler={openBlock}>
        <SearchIcon />
      </ActionBtn>

      <input ref={inputRef} type="text" placeholder={placeholder} />

      <button
        onClick={() => setDisable(true)}
        type="button"
        className={styles.HeaderSearchBtn}
      ></button>

      <ActionBtn clickHandler={closeBlock} styleLine={styles.HeaderSearchBtn}>
        <CloseIcon />
      </ActionBtn>
    </form>
  );
};

export default SearchBlock;
