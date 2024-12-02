

import React from 'react';
import { Label } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-components';

const CaseDescriptionInput = ({ bodyText, onChange }) => {

    const handleInputChange = (event) => {
        onChange(event.target.value); // Pass the new value to the parent component
    };
    return (
        <>
            <div style={{ marginTop: "15px" }}>
                <Label htmlFor="description">Description</Label><br />
            </div>
            <Textarea
                style={{ marginTop: "1%" }}
                id="description"
                onChange={handleInputChange}
                value={bodyText} // Set default value from props
            />
        </>
    );
}

export default CaseDescriptionInput;
