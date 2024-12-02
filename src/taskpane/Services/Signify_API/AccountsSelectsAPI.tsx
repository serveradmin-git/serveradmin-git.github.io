import React, { useState, useEffect } from 'react';
import GetEmailBody from '../../Utilty/GetEmailBody';
import CRM_Url from '../../Hooks/CRM_Url';
import CRM_Token from '../../Oauth/CRM_Token';
import { GetUserData } from '../../Oauth/GetUserData';

const AccountsSelectsAPI = ({ name, email }) => {
    const { getEmailAddress, firstName, getName } = GetEmailBody();
    const [accounts, setAccounts] = useState([]);

    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key } = GetUserData()

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`);
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            "module_name": "Accounts",
            "str_query": `accounts.name LIKE '%${name}%' AND accounts.deleted = 0 AND accounts.id IN (SELECT eabr.bean_id FROM email_addr_bean_rel eabr JOIN email_addresses ea ON ( ea.id = eabr.email_address_id ) WHERE eabr.deleted = 0 AND ea.email_address LIKE '%${email}%' AND ea.deleted = 0 AND eabr.bean_module = 'Accounts')`,
            "str_order_by": "accounts.name ASC",
            "offset": 0,
            "select_fields": ["id", "name"],
            "link_name_to_fields_array": "",
            "max_results": 100,
            "deleted": "false"
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${API_URL}get_entry_list`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 200 && result.data) {
                    setAccounts(result.data.entry_list);


                } else {
                    console.error("Error", result.message);
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, [email, name]);

    return (
        <div>

            {/* <AccountInput accounts={accounts} /> */}
        </div>
    );
}

export default AccountsSelectsAPI;
