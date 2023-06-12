import React, { useEffect, useState } from "react";
import appStyles from "../../../sass/App.module.scss";
import { useAppDispatch } from "../../../store";
import { loadFilteredCallsList } from "../../../store/reducers/callsReducer";
import { dateToApiFormat } from "../../../utils/formatTime";
import { IFilterItem } from "../../common/FilterListItem";
import SearchBlock from "../../common/SearchBlock";
import Balance from "./Balance";
import DateFilter from "./DateFilter";
import Filter from "./Filter";

export interface IFilter {
  id: string;
  name: string;
  items: IFilterItem[];
}

interface IFilterConfig {
  [index: string]: IFilter;
}

interface IFiltersState {
  [index: string]: {
    value: string;
    label: string;
  };
}

const Filters = () => {
  const dispatch = useAppDispatch();

  const [hideFilter, setHideFilter] = useState<{ [index: string]: boolean }>({
    type: true,
  });

  const [filters, setFilters] = useState<IFiltersState>({
    type: { value: " ", label: "Все звонки" },
    dates: {
      value: `date_start=${dateToApiFormat(
        Date.now() - 3 * 24 * 3600000
      )}&date_end=${dateToApiFormat(Date.now())}`,
      label: "3 дня",
    },
  });

  useEffect(() => {
    dispatch(
      loadFilteredCallsList(50, filters.type.value, filters.dates.value)
    );
  }, [filters]);

  const handleClick = (
    filterName: string,
    value: string | [number, number],
    label: string
  ) => {
    if (typeof value === "string") {
      setFilters((p) => ({ ...p, [filterName]: { value, label } }));
      setHideFilter((p) => ({ ...p, [filterName]: !p[filterName] }));
    } else {
      setFilters((p) => ({
        ...p,
        dates: {
          value: `date_start=${dateToApiFormat(
            value[0]
          )}&date_end=${dateToApiFormat(value[1])}`,
          label,
        },
      }));
    }
  };

  const filtersConfig: IFilterConfig = {
    type: {
      id: "1",
      name: "type",
      items: [
        {
          id: "all",
          label: "Все звонки",
          value: " ",
          handleClick,
          filterName: "type",
        },
        {
          id: "incoming",
          label: "Входящие",
          value: "1",
          handleClick,
          filterName: "type",
        },
        {
          id: "outcoming",
          label: "Исходящие",
          value: "0",
          handleClick,
          filterName: "type",
        },
      ],
    },
  };

  return (
    <div className={appStyles.Container + " " + appStyles.FiltersContainer}>
      <div className="d-flex justify-end w-100">
        <Balance />
        <DateFilter setDatesFilter={handleClick} />
      </div>
      <div className="d-flex w-100">
        <SearchBlock placeholder="Поиск по звонкам" />

        {Object.keys(filtersConfig).map((filterKey) => {
          const filterConfigItem = filtersConfig[filterKey];
          return (
            <Filter
              setOpen={() =>
                setHideFilter((p) => ({
                  ...p,
                  [filterConfigItem.name]: !p[filterConfigItem.name],
                }))
              }
              isOpen={!hideFilter[filterConfigItem.name]}
              key={filterConfigItem.id}
              filter={filterConfigItem}
              currentValue={filters[filterConfigItem.name].label}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
