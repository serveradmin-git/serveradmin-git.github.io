

import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckboxLabels = ({ onSubjectChange, onBodyTextChange }) => {
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            // Fetching the subject from the mailbox item
            const getSubject = Office.context.mailbox.item.subject;
            onSubjectChange(getSubject);

            // Fetching the body text from the mailbox item
            Office.context.mailbox.item.body.getAsync(
                "text",
                { asyncContext: "This is passed to the callback" },
                function callback(result) {
                    if (result.status === Office.AsyncResultStatus.Succeeded) {
                        const bodyText = result.value;
                        console.log("Body text:", bodyText);
                        onBodyTextChange(bodyText); // Update state with body text
                    } else {
                        console.error("Failed to get body text. Error:", result.error);
                    }
                }
            );
        } else {
            // Clear subject and body text if checkbox is unchecked
            onSubjectChange('');
            onBodyTextChange('');
        }
    };

    return (
        <FormGroup sx={{ paddingLeft: "16px" }}>
            <FormControlLabel
                control={<Checkbox onChange={handleCheckboxChange} />}
                label="Create Case from this email"
            />
        </FormGroup>
    );
};

export default CheckboxLabels;
