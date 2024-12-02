
import CRM_Url from '../../Hooks/CRM_Url';
import CRM_Token from '../../Oauth/CRM_Token';
import { GetUserData } from '../../Oauth/GetUserData';


export const CaseFilterAPI = async () => {
    const API_URL = CRM_Url();
    const LoginToken = CRM_Token();
    const { API_Key, User_ID } = GetUserData();
    const Contact_Id = localStorage.getItem('Contact_Id');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`);

    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "Cases",
        "str_query": `cases.contact_id = '${Contact_Id}'`,
        "str_order_by": "",
        "offset": 0,
        "select_fields": [
            "id",
            "name",
            "subject",
            "due_date"
        ],
        "link_name_to_fields_array": "",
        "max_results": 9999,
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
};
