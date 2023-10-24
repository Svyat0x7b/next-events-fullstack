import { useRef } from 'react';
import Button from '../ui/Button';
import { OPTIONS_MONTH, OPTIONS_YEAR } from './SearchData';
import classes from './EventsSearch.module.css';

const EventsSearch = (props) => {
    const monthRef = useRef();
    const yearRef = useRef();
    const submitHandler = (e) => {
        e.preventDefault();
        const selectedYear = yearRef.current.value;
        const selectedMonth = monthRef.current.value;

        props.onSearch(selectedYear, selectedMonth);
    };
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label for="year">Year</label>
                    <select id="year" ref={yearRef}>
                        {OPTIONS_YEAR.map((option) => (
                            <option value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <div className={classes.control}>
                    <label for="month">Month</label>
                    <select id="month" ref={monthRef}>
                        {OPTIONS_MONTH.map((option) => (
                            <option value={option.value}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Button>Search</Button>
        </form>
    );
};

export default EventsSearch;
