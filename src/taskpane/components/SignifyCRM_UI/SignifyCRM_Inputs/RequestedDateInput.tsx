
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // Import Day.js library
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const RequestedDateInput = ({ onChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    // Handler for date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        onChange({ date: date.format('YYYY-MM-DD'), time: selectedTime ? selectedTime.format('HH:mm:ss') : null });
        console.log('Selected date:', date);
    };

    // Handler for time change
    const handleTimeChange = (time) => {
        setSelectedTime(time);
        onChange({ date: selectedDate ? selectedDate.format('YYYY-MM-DD') : null, time: time.format('HH:mm:ss') });
        console.log('Selected time:', time);
    };


    useEffect(() => {
        const body = Office.context.mailbox.item;
        const date = new Date(body.dateTimeCreated);

        // Set default date using Day.js
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        const defaultDate = dayjs(formattedDate, 'DD-MM-YYYY');

        // Set default time using Day.js
        const defaultTime = dayjs(date); // Assuming date is already the correct time

        setSelectedDate(defaultDate);
        setSelectedTime(defaultTime);

        // Call onChange to set initial values in parent component
        onChange({ date: defaultDate.format('YYYY-MM-DD'), time: defaultTime.format('HH:mm:ss') });
    }, []);


    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Requested Date*"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker
                        label="Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </>
    );
}

export default RequestedDateInput;
