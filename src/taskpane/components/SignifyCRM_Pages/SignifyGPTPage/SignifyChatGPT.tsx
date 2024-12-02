

import * as React from 'react';
import { Input as BaseInput, InputProps } from '@mui/base/Input';
import { styled } from '@mui/system';
import Navbar from '../Navbar';
import { Box, Button } from '@mui/material';

const Input = React.forwardRef(function CustomInput(
    props: InputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <>

            <Navbar />

            <p style={{ display: "flex", marginLeft: "15px" }}> <img style={{ height: "7%", width: "7%", paddingLeft: "6px" }} src={require("../../../../../assets/chatGPT.png")} alt="My Image" /><span style={{ fontWeight: "bold", fontSize: "16px", paddingLeft: "4px" }}> Chat GPT</span></p>
            <hr />


            <BaseInput
                style={{ margin: "20px", height: "120px" }}
                slots={{
                    root: RootDiv,
                    input: 'input',
                    textarea: TextareaElement,
                }}
                {...props}
                ref={ref}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", '& button': { m: 3, } }}>
                <Button variant='contained' sx={{ background: "#6074ac" }}>Search</Button>
            </Box>
        </>
    );
});

export default function InputMultiline() {
    return <Input aria-label="Demo input" multiline placeholder="Type something…" />;
}

const blue = {
    100: '#DAECFF',
    200: '#80BFFF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const RootDiv = styled('div')`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled('textarea', {
    shouldForwardProp: (prop) =>
        !['ownerState', 'minRows', 'maxRows'].includes(prop.toString()),
})(
    ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
