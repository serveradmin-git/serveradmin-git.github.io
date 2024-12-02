import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';

import { Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CalendarNavbar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation hook for current location

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCalendarBackClick = () => {
        if (location.pathname === '/CalendarSettingPage') {
            navigate(-1); // Go back one step in history stack
        }
        else {
            navigate('/CalendarHome'); // Navigate to '/Home'
        }
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: "#6074ac" }}>
                    <Toolbar>



                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                            onClick={handleCalendarBackClick}
                        >
                            <Tooltip title="Back">
                                <ArrowBackIcon />
                            </Tooltip>
                        </IconButton>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            SignifyCRM
                        </Typography>




                        <div>
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                size="large"
                                aria-label="display more actions"
                                edge="end"
                                color="inherit"
                            >
                                <Tooltip title="More actions">
                                    <MoreIcon />
                                </Tooltip>
                            </IconButton>


                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <Link to="/CalendarSettingPage" style={{ color: "black", textDecoration: "none" }}><MenuItem onClick={handleClose}>Settings</MenuItem> </Link><hr />
                                <MenuItem onClick={handleClose}>Manage add-on</MenuItem>

                            </Menu>
                        </div>


                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default CalendarNavbar