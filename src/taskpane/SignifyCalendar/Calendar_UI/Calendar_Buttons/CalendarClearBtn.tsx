import { Button } from '@mui/material'
import React from 'react'

const CalendarClearbtn = ({ onClick }) => {
    const handelClearClick = () => {
        onClick()
    }
    return (
        <Button onClick={handelClearClick} sx={{ color: "#6074ac" }}>Clear</Button>
    )
}

export default CalendarClearbtn