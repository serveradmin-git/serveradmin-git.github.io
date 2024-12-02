import React, { useState, useEffect } from 'react';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import CRM_Url from '../../../Hooks/CRM_Url';
import CRM_Token from '../../../Oauth/CRM_Token';
import { GetUserData } from '../../../Oauth/GetUserData';
import { CalendarOpportunityList } from '../../Calendar_UI/CalendarSignify_List/CalendarOpportunityList';

const CalendarSearchOpportunity = ({ name, setLoading, hidden }) => {


    const [opportunities, setOpportunities] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    useEffect(() => {
        setLoading(false);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`)
        const raw = JSON.stringify({
            "Api-Key": API_Key,
            "module_name": "Opportunities",
            "str_query": `opportunities.name LIKE '%${name}%' AND opportunities.deleted = 0`,
            "str_order_by": "opportunities.name ASC",
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
                    setOpportunities(result.data.entry_list);
                    setTotalCount(result.data.total_count)
                    setLoading(false);



                } else {
                    console.error("Error", result.message);
                }
            })
            .catch((error) => {
                console.error("Error", error);
            })

    }, [name]);

    if (hidden) {
        return null
    }
    return (
        <div>
            <CalendarOpportunityList opportunities={opportunities} totalCount={totalCount} />
        </div>
    );
}

export default CalendarSearchOpportunity;
