import React, { useEffect, useState } from 'react';
import CurrencySelect from '../../components/SignifyCRM_UI/Signify_DropDown/CurrencySelect';
import getLoginCurrencyName from '../../components/SignifyCRM_Pages/LoginPage/SignifySignin';
import { GetUserData } from '../../Oauth/GetUserData';
import CRM_Token from '../../Oauth/CRM_Token';
import CRM_Url from '../../Hooks/CRM_Url';

interface Currency {
    id: string;
    name: string;
}

let getCurrencyDetails: Currency[] = [];

const CRM_CurrencyAPI = () => {

    const userCurrency = getLoginCurrencyName();

    console.log("userCurrency", userCurrency)
    const [currencyName, setCurrencyName] = useState<Currency[]>([]);
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    useEffect(() => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`)

        const raw = JSON.stringify({
            "Api-Key": API_Key,
            "module_name": "mstr_Currency_s",
            "str_query": "mstr_currency_s.deleted = 0",
            "str_order_by": "mstr_currency_s.name ASC",
            "offset": 0,
            "select_fields": [
                "id",
                "full_name",
                "symbol"
            ],
            "link_name_to_fields_array": "",
            "max_results": 999,
            "deleted": "false"
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        // fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/get_entry_list", requestOptions)
        fetch(`${API_URL}get_entry_list`, requestOptions)
            .then((response: Response) => response.json())
            .then((result: any) => {
                const entryList = result.data.entry_list;
                const currencies: Currency[] = entryList.map((entry: any) => ({
                    id: entry.name_value_list.id.value,
                    name: entry.name_value_list.full_name.value
                }));
                const filteredCurrencies = currencies.filter(currency => currency.name.trim() !== ''); // Filter out empty names
                setCurrencyName(filteredCurrencies);
                getCurrencyDetails = filteredCurrencies; // Update the getCurrencyDetails array
            })
            .catch((error: any) => console.error(error));
    }, []);

    return (
        <>
            <CurrencySelect currencyName={currencyName} />
        </>
    );
};

export default CRM_CurrencyAPI;

