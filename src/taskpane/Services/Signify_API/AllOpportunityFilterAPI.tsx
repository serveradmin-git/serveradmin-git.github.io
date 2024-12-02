
import CRM_Url from '../../Hooks/CRM_Url';
import CRM_Token from '../../Oauth/CRM_Token';
import { GetUserData } from '../../Oauth/GetUserData';

export const AllOpportunityFilterAPI = async () => {
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    const Account_Id = localStorage.getItem('Account_Id');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`);

    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "Opportunities",
        //  "str_query": `opportunities.deleted = 0 AND opportunities.id IN (SELECT ao.opportunity_id FROM accounts_opportunities ao WHERE ao.deleted = 0 AND ao.account_id = '${Account_Id}') `,
        "str_order_by": "",
        "offset": 0,
        "select_fields": [
            "id",
            "name"
        ],
        "link_name_to_fields_array": "",
        "max_results": 5,
        "deleted": "false"
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${API_URL}get_entry_list`, requestOptions);
        const result = await response.json();

        if (result.status === 200 && result.data) {
            return result.data.entry_list; // Return the entry list data
        } else {
            console.error("Error", result.message);
            return []; // Return empty array on error
        }
    } catch (error) {
        console.error("Error", error);
        return []; // Return empty array on fetch failure
    }
}


