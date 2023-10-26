import React, { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment, { Moment } from 'moment';

import CalendarIcon from './CalendarImage/CalendarImage';
import 'react-datepicker/dist/react-datepicker.css';

import s from './Calendar.module.scss';

interface ICalendarProps {
  dateFormat: string;
  showMonthYearPicker: boolean;
  value: Date;
  handleChange: (date: string) => void;
}

const Calendar: React.FC<ICalendarProps> = ({
  dateFormat = 'MM.dd.yyyy',
  showMonthYearPicker,
  value,
  handleChange,
}) => {
  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 2);

  const [selectedDate, setSelectedDate] = useState<Moment>( 
    moment(value, 'DD.MM.YYYY')
  );

  useEffect(() => {
    setSelectedDate(moment(value, 'DD.MM.YYYY'));
  }, [value]);

  const handleDateChange = (date: Moment) => {
    setSelectedDate(date);
    handleChange(date.format('DD.MM.YYYY'));
  };

  const CustomInput = forwardRef<HTMLButtonElement, { onClick?: React.MouseEventHandler }>(({ onClick }, ref) => {
    const [displayDate, setDisplayDate] = useState(
      moment(selectedDate).format('DD.MM.yyyy')
    );

    useEffect(() => {
      setDisplayDate(moment(selectedDate).format('DD.MM.yyyy'));
    }, []);

    return (
      <button type="button" className={s.btn} onClick={onClick} ref={ref}>
        <CalendarIcon width="20" height="18" />
        {displayDate}
      </button>
    );
  });

  const renderCustomDayContents = (dayOfMonth: number, date: Date) => {
    const selectedValue = moment(selectedDate.toDate()).startOf('day');
    const currentValue = moment(date).startOf('day');

    if (selectedValue.isSame(currentValue)) {
      return <div className={s.selectedDay}>{dayOfMonth}</div>;
    }
    return <div className={s.day}>{dayOfMonth}</div>;
  };

  return (
    <>
      <DatePicker
        selected={selectedDate.toDate()}
        onChange={date => handleDateChange(moment(date))}
        customInput={<CustomInput />}
        dateFormat={dateFormat}
        showMonthYearPicker={showMonthYearPicker}
        maxDate={maxDate}
        renderDayContents={renderCustomDayContents}
      />
    </>
  );
}

export default Calendar;