

import React from 'react';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const CalendarStartDateInput = ({ startDate, onDateChange, onTimeChange, hidden }) => {
    const parsedDate = startDate.dates ? dayjs(startDate.dates) : null;
    const parsedTime = startDate.times ? dayjs(startDate.times, 'HH:mm', true) : null;

    if (hidden) {
        return null; // Render nothing if `hidden` is true
    }
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ marginTop: "10px" }}>
                    <DatePicker
                        sx={{ width: "95%", paddingLeft: "2%" }}
                        label="Start Date*"
                        value={parsedDate}
                        onChange={onDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']} sx={{ marginTop: "10px" }}>
                    <TimePicker
                        sx={{ width: "95%", paddingLeft: "2%" }}
                        label="Time"
                        value={parsedTime}
                        onChange={onTimeChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </>
    );
};

export default CalendarStartDateInput;



