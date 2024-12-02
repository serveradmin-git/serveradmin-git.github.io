
import React from 'react';
import { Box, Button, Input } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { connectURlValue } from '../SignifyConnectPage/ConnectURL';

const SignifySignin = () => {
    const navigate = useNavigate();
    let conactURL = connectURlValue();
    // console.log(conactURL);

    const redirectURL = "https://serveradmin-git.github.io/assets/redirectLogin.html"
    // const redirectURL = "https://aamirhusnain.github.io/signifycrm/assets/redirectLogin.html"


    const SignifyDialog = () => {
        //  Office.context.ui.displayDialogAsync('https://demo.signifycrm.net/outlook-addin/index.php?action=SeamlessLogin&module=Users&service=microsoft&redirect_uri=https://localhost:3000/assets/redirectLogin.html',
        Office.context.ui.displayDialogAsync(`${conactURL}/index.php?action=SeamlessLogin&module=Users&service=microsoft&redirect_uri=${redirectURL}`,
            { height: 50, width: 50, promptBeforeOpen: false },
            (asyncResult) => {
                if (asyncResult.status === Office.AsyncResultStatus.Failed) {
                } else {
                    // console.log('Dialog opened successfully');
                    const dialog = asyncResult.value;

                    dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
                        if ('message' in arg) {
                            // console.log('Message from dialog:', arg.message);
                            const token = arg.message;
                            localStorage.setItem('API_Token', (token))
                            localStorage.setItem('Backup_Token', (token))


                            // Close the dialog
                            dialog.close();
                            navigate('/Home');
                        } else {
                            console.error('Unexpected message format:', arg);
                        }
                    });

                    dialog.addEventHandler(Office.EventType.DialogEventReceived, (_event) => {
                        // console.log('Dialog closed successfully');
                        // console.log("_event:", _event);
                    });
                }
            }
        );
    };

    return (
        <>
            <Box sx={{ m: 2, display: "flex" }}>
                <Input disabled defaultValue={conactURL} />
                <Link to="/">
                    <Button sx={{ ml: 2 }} variant="contained">Change</Button>
                </Link>
            </Box>
            <Button sx={{ ml: 2 }} variant="contained" onClick={SignifyDialog}>Login</Button>
        </>
    );
};

export default SignifySignin;
