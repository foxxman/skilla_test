import React, { FC } from "react";
import styles from "../../sass/Filters.module.scss";
import FilterListItem, { IFilterItem } from "./FilterListItem";

interface FilterListProps {
  isOpen: boolean;
  items: IFilterItem[];
}

const FilterList: FC<FilterListProps> = ({ isOpen, items }) => {
  return (
    <ul
      className={`${styles.FilterList} ${
        isOpen ? styles.FilterListActive : ""
      }`}
    >
      {items.map((item) => (
        <FilterListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default FilterList;
