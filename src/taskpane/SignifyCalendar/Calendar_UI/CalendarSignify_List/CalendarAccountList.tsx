
import React from 'react';
import { Button, ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RedirectAccount_URL } from '../../../Oauth/Redirect_URL';
let getAccountList
export const CalendarAccountList = ({ accounts, totalCount }) => {
    const navigate = useNavigate();



    const redirectAccountURL = RedirectAccount_URL();

    const handleAccountURLClick = (id) => {

        window.open(redirectAccountURL + id, '_blank');
    };

    const handleSelectAccount = (id, name, module) => {
        const selectAccount = {
            Id: id,
            Name: name,
            Module: module
        }
        getAccountList = selectAccount;
        // console.log("selectAccount", selectAccount)
        navigate('/CalendarHome', { state: { listVaue: selectAccount } });
    }

    return (
        <>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Account ({totalCount})</FormLabel>
            {accounts.map((account) => (
                <ListItem key={account.id.value}>
                    <ListItemButton>
                        <ListItemText sx={{ color: "blue" }} primary={`${account.name_value_list.name.value}`} onClick={() => handleAccountURLClick(account.name_value_list.id.value)} />
                        <Button variant="outlined" onClick={() => handleSelectAccount(account.name_value_list.id.value, account.name_value_list.name.value, account.module_name)} sx={{ color: "#6074ac" }}>Select</Button>
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
};



