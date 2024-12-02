import React from 'react';

import { getLeadId } from '../../components/SignifyCRM_Pages/CreateLeadPage/CreateLeade';
import CRM_Url from '../../Hooks/CRM_Url';
import CRM_Token from '../../Oauth/CRM_Token';
import { GetUserData } from '../../Oauth/GetUserData';

const LeadArchiveAPI = (parent_id) => {

    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()

    var body = Office.context.mailbox.item;

    // Extract date components
    var date = new Date(body.dateTimeCreated);
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
    var year = date.getFullYear();
    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');

    // Format the date
    var formattedDate = `${day}-${month}-${year}`;

    var emailInfo = {
        dateTimeCreated: formattedDate,
        cc: body.cc,
        bcc: body.bcc,
        to: body.to[0].emailAddress,
        from: body.from.emailAddress,
        subject: body.subject
    };

    // console.log(emailInfo);

    Office.context.mailbox.item.body.getAsync(
        "html",
        { asyncContext: "This is passed to the callback" },
        function callback(result) {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                // Get the HTML body
                var htmlBody = result.value;
                var mailBody = htmlBody;
                // console.log(mailBody);

                // Now make the API call
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
                myHeaders.append("Authorization", `Bearer ${LoginToken}`);
                const raw = JSON.stringify({
                    "Api-Key": API_Key,
                    "module_name": "Emails",
                    "name_value_list": {
                        "assigned_user_id": User_ID,
                        "parent_type": "Leads",
                        "parent_id": parent_id,
                        "to_addrs": emailInfo.to,
                        "from_addr": emailInfo.from,
                        "cc_addrs": "",
                        "name": emailInfo.subject,
                        "description_html": mailBody,
                        "date_sent": emailInfo.dateTimeCreated,
                        "type": "archived"
                    }
                });

                const requestOptions: RequestInit = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                // fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_entry", requestOptions)
                fetch(`${API_URL}set_entry`, requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        const jsonData = JSON.parse(result);
                        // console.log("Archive", jsonData);
                        const leadOutput = jsonData.data;
                        const jsonLeadId = JSON.parse(leadOutput);
                        const LeadsArchiveId = jsonLeadId.id;
                        // console.log("Lead ID:", LeadsArchiveId);
                        LeadRelation(LeadsArchiveId)
                        // Use the leadId as needed
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                // Handle the error
                console.error(result.error.message);
            }
        }
    );
};

export default LeadArchiveAPI;



const LeadRelation = (LeadsArchiveId) => {
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const createdLeadID = getLeadId();
    const { API_Key } = GetUserData()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`);
    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "Leads",
        "module_id": createdLeadID,
        "link_field_name": "emails",
        "related_ids": [
            LeadsArchiveId,
        ]
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    //  fetch("https://demo.signifycrm.net/outlook-addin/rest_api/v1/rest/set_relationship", requestOptions)
    fetch(`${API_URL}set_relationship`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}