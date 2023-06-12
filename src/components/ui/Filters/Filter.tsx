import React, { FC } from "react";
import { IFilter } from "./Filters";
import ActionBtn from "../../common/ActionBtn";
import styles from "../../../sass/Filters.module.scss";
import { ReactComponent as ArrowSmDown } from "../../../assets/icons/arrows/arrow-sm-down.svg";
import FilterList from "../../common/FilterList";

interface FilterProps {
  currentValue: string;
  filter: IFilter;
  isOpen: boolean;
  setOpen: () => void;
}

const Filter: FC<FilterProps> = ({ setOpen, isOpen, currentValue, filter }) => {
  return (
    <div
      className={`ml-auto ${styles.Filter} ${isOpen ? styles.FilterOpen : ""}`}
    >
      <p className={styles.FilterState}>{currentValue}</p>

      <ActionBtn styleLine={styles.FilterArrow} clickHandler={(e) => setOpen()}>
        <ArrowSmDown />
      </ActionBtn>

      <FilterList items={filter.items} isOpen={isOpen} />
    </div>
  );
};

export default Filter;
