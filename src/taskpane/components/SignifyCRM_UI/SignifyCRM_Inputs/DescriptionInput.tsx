import React from 'react';
import { Label } from '@fluentui/react-components'; // Import Label from Fluent UI React
import { GetDescriptionValue } from '../../../Utilty/GetCreateContactValue';
import { Textarea } from '@fluentui/react-components';

const DescriptionInput = ({ onChange }) => {
    const handleDescriptionChange = (event) => {
        const description = event.target.value;
        onChange(description);
    };

    return (
        <>
            <div style={{ marginTop: "15px" }}>
                <Label htmlFor="description">Description</Label><br />
            </div>
            <Textarea
                style={{ marginTop: "1%" }}
                id="description"
                onChange={handleDescriptionChange}
            />
        </>
    );
}

export default DescriptionInput;
