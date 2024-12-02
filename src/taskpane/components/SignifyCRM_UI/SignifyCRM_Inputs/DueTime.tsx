import React, { useState } from 'react'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const DueTime = ({ onChange }) => {
    const [selectedTime, setSelectedTime] = useState(null);
    const handleDueTimeChange = (time) => {

        setSelectedTime(time)
        onChange(time);
    };
    return (
        <>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <TimePicker
                        label="Time"
                        value={selectedTime}
                        onChange={handleDueTimeChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </>
    )
}

export default DueTime