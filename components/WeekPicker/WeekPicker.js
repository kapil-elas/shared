import * as React from 'react';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, startOfWeek } from 'date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function WeekPicker({ weekRange = {}, setWeekRange }) {
    const [selectedDate, setSelectedDate] = React.useState(null);
    // const [weekRange, setWeekRange] = React.useState('');

    const handleWeekChange = (date) => {
        if (date) {
            const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday as the start of the week
            const end = addDays(start, 6); // End of the week (Sunday)
            setSelectedDate(date);
            setWeekRange({
                start_day: start.getTime(),
                end_time: end.getTime(),
                start_time: start.getTime()
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Week"
                value={selectedDate}
                onChange={handleWeekChange}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="MM/dd/yyyy"
            />
        </LocalizationProvider>
    );
}
