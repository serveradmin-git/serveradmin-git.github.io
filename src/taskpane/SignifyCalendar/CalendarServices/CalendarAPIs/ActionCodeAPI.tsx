import CRM_Url from "../../../Hooks/CRM_Url";
import CRM_Token from "../../../Oauth/CRM_Token";
import { GetUserData } from "../../../Oauth/GetUserData";


const ActionCodeAPI = async (module) => {
    // const moduleAction = module;
    try {
        const API_URL = CRM_Url();
        const LoginToken = CRM_Token();
        const { API_Key, User_ID } = GetUserData();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${LoginToken}`);

        const raw = JSON.stringify({
            "Api-Key": API_Key,
            "module_name": "actn_ActionCode_s",
            "str_query": `actn_actioncode_s.deleted = 0 AND actn_actioncode_s.action_type = '${module.slice(0, -1)}' AND actn_actioncode_s.status = 'Active'`,
            "str_order_by": "",
            "offset": 0,
            "select_fields": [
                "id",
                "name"
            ],
            "link_name_to_fields_array": "",
            "max_results": 10,
            "deleted": false
        });

        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${API_URL}get_entry_list`, requestOptions);
        const result = await response.json();

        if (response.status === 200 && result.data) {
            const filteredActionCodes = result.data.entry_list.filter(entry => entry.name_value_list.name.value !== ""); // Filter out entries with empty name

            return filteredActionCodes; // Return filtered data
        } else {
            console.error("Error:", result.message || "Failed to fetch data");
            return []; // Return an empty array or handle error as needed
        }
    } catch (error) {
        console.error("Error:", error);
        return []; // Return an empty array or handle error as needed
    }
};

export default ActionCodeAPI;
