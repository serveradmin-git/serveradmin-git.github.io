import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { GetCloseDateValue } from '../../../Utilty/GetCreateOpportunity';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const CloseDate = ({ onChange }) => {
    const [selectedDate, setSelectedDate] = useState(null);


    const handleCloseDateChange = (date) => {
        setSelectedDate(date);
        onChange(date.format('YYYY-MM-DD'));

    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Close Date*"

                    value={selectedDate}
                    onChange={handleCloseDateChange}
                />

            </DemoContainer>
        </LocalizationProvider>

    )
}

export default CloseDate