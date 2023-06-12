import React, { FC, useEffect, useState } from "react";
import styles from "../../../sass/Filters.module.scss";
import { ReactComponent as ArrowSmDown } from "../../../assets/icons/arrows/arrow-sm-down.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/filters/calendar.svg";
import ActionBtn from "../../common/ActionBtn";
import FilterList from "../../common/FilterList";
import { IFilterItem } from "../../common/FilterListItem";
import { DateRangePicker } from "rsuite";
import { dateToApiFormat } from "../../../utils/formatTime";

interface DateFilterProps {
  setDatesFilter: (
    filterName: string,
    value: string | [number, number],
    label: string
  ) => void;
}

const DateFilter: FC<DateFilterProps> = ({ setDatesFilter }) => {
  const [openList, setOpenList] = useState<boolean>(false);
  const [dates, setDates] = useState<[number, number]>([
    Date.now() - 3 * 24 * 3600000,
    Date.now(),
  ]);

  useEffect(() => {
    setDatesFilter("dates", dates, label);
    // console.log();
  }, [dates]);

  const [label, setLabel] = useState<string>("3 дня");

  const handleClick = (
    filterName: string,
    value: string | [number, number] | undefined,
    label: string
  ) => {
    if (value && typeof value !== "string") {
      setDates(value);
      setLabel(label);
      setOpenList(false);
    }
  };

  const filterOptions: IFilterItem[] = [
    {
      id: "3days",
      label: "3 дня",
      filterName: "dates",
      value: [Date.now() - 3 * 24 * 3600000, Date.now()],
      handleClick,
    },
    {
      id: "week",
      filterName: "dates",
      label: "Неделя",
      value: [Date.now() - 7 * 24 * 3600000, Date.now()],
      handleClick,
    },
    {
      id: "month",
      filterName: "dates",
      label: "Месяц",
      value: [Date.now() - 30 * 24 * 3600000, Date.now()],
      handleClick,
    },
    {
      id: "year",
      filterName: "dates",
      label: "Год",
      value: [Date.now() - 365 * 24 * 3600000, Date.now()],
      handleClick,
    },
    {
      id: "custom_dates",
      filterName: "dates",
      label: "Указать даты",
      component: (
        <DateRangePicker
          className="DateFilterRange"
          size="md"
          showOneCalendar
          placeholder="__.__.__-__.__.__"
          caretAs={CalendarIcon}
          placement="bottomEnd"
          onChange={(value) => {
            if (value)
              handleClick(
                "dates",
                [value[0].getTime(), value[1].getTime()],
                value[0].toLocaleDateString("ru") +
                  " " +
                  value[1].toLocaleDateString("ru")
              );
          }}
        />
      ),
      handleClick: () => {},
    },
  ];

  const changeDateFilter = (change: number) => {
    let index = filterOptions.findIndex((op) => op.label === label) + change;
    if (index === -1)
      handleClick("dates", filterOptions[0].value, filterOptions[0].label);
    if (index === filterOptions.length - 1) index = 0;
    if (index < 0) index = filterOptions.length - 2;

    console.log(index);

    if (filterOptions[index].value && index >= 0)
      handleClick(
        "dates",
        filterOptions[index].value,
        filterOptions[index].label
      );
  };

  return (
    <div className={styles.DateFilter}>
      <ActionBtn
        clickHandler={() => {
          changeDateFilter(-1);
        }}
        styleLine={styles.DateFilterArrowLeft}
      >
        <ArrowSmDown />
      </ActionBtn>

      <p className={styles.DateFilterState}>
        <ActionBtn clickHandler={(e) => setOpenList((p) => !p)}>
          <CalendarIcon />
        </ActionBtn>
        <span>{label}</span>
      </p>

      <ActionBtn
        clickHandler={() => {
          changeDateFilter(+1);
        }}
        styleLine={styles.DateFilterArrowRight}
      >
        <ArrowSmDown />
      </ActionBtn>

      <FilterList items={filterOptions} isOpen={openList} />
    </div>
  );
};

export default DateFilter;
