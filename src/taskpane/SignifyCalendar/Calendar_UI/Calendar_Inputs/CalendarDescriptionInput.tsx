
import React, { useEffect, useState } from 'react';

import { Textarea } from '@fluentui/react-components';
import GetModuleAPI from '../../CalendarServices/CalendarAPIs/GetModuleAPI';
import { CircularProgress } from '@mui/material';
import { CalendarDescription } from '../../CalendarHook/CalendarDescription';

const CalendarDescriptionInput = ({ onChange }) => {
    const { mDescription, loading } = GetModuleAPI();
    const [description, setDescription] = useState('');
    const [eventDescription, setEventDescription] = useState('');


    useEffect(() => {
        CalendarDescription()
            .then(description => setEventDescription(description))
            .catch(error => console.error('Failed to retrieve calendar item body:', error));
    }, []);
    console.log("eventDescription", eventDescription);

    useEffect(() => {

        if (mDescription !== undefined) {
            setDescription(mDescription);
        } else {
            setDescription(''); // Or leave it as empty string if mDescription is undefined
        }
    }, [mDescription]);

    const handleDescriptionChange = (event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
        onChange(newDescription);
    };

    const mdescription = description && description.trim() !== ""
        ? description
        : (eventDescription && eventDescription.trim() !== "") ? eventDescription : "";


    return (
        <div style={{ position: 'relative', margin: '3%', width: '94%' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    left: '25%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                    background: '#fff', // Optional: semi-transparent background
                    borderRadius: '4px',
                    padding: '10px',
                    flexDirection: 'row-reverse' // Align items horizontally and handle RTL
                }}>
                    <p style={{ margin: 0 }}> Description.........</p>
                    <CircularProgress size={20} style={{ marginRight: '10px' }} />
                </div>
            )}
            <label>Description</label>
            <Textarea
                id="description"
                value={mdescription}
                onChange={handleDescriptionChange}
                style={{ width: '100%', marginTop: "4px" }} // Adjust to fit the container
            />
        </div>
    );
};

export default CalendarDescriptionInput;
