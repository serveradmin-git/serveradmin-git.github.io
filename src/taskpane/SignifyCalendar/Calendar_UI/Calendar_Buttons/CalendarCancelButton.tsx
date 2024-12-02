import { Button } from '@mui/material'
import React from 'react'

const CalendarCancelButton = ({ onClick }) => {
    return (
        <Button sx={{ color: "#6074ac", width: "40%" }} onClick={onClick}>Cancel</Button>
    )
}

export default CalendarCancelButton;