import React, { FC } from "react";
import styles from "../../sass/Filters.module.scss";

export interface IFilterItem {
  id: string;
  label: string;
  component?: React.ReactNode;
  value?: string | [number, number];
  img?: string;
  filterName?: string;
  handleClick: (
    filterName: string,
    value: string | [number, number],
    label: string
  ) => void;
}

interface FilterListItemProps {
  item: IFilterItem;
}

const FilterListItem: FC<FilterListItemProps> = ({ item }) => {
  return (
    <li
      className={`${styles.FilterListItem} ${
        item.component ? styles.FilterListItemSelf : ""
      }`}
    >
      {!item.component ? (
        <button
          onClick={() =>
            item.value && item.filterName
              ? item.handleClick(item.filterName, item.value, item.label)
              : null
          }
        >
          {item.img && <img src={item.img} alt={item.label} />}
          <span>{item.label}</span>
        </button>
      ) : (
        <>
          <span>{item.label}</span>
          {item.component}
        </>
      )}
    </li>
  );
};

export default FilterListItem;
