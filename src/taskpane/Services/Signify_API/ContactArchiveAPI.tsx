
import React from 'react'
import CRM_Url from '../../Hooks/CRM_Url';
import CRM_Token from '../../Oauth/CRM_Token';
import { GetUserData } from '../../Oauth/GetUserData';
import { getContactId } from '../../components/SignifyCRM_Pages/CreateContactPage/CreateContact';


const ContactArchiveAPI = () => {
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const { API_Key, User_ID } = GetUserData()
    const ContactID = getContactId();


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

    console.log(emailInfo);

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
                //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
                myHeaders.append("Authorization", `Bearer ${LoginToken}`);
                const raw = JSON.stringify({
                    "Api-Key": API_Key,
                    "module_name": "Emails",
                    "name_value_list": {
                        "assigned_user_id": User_ID,
                        "parent_type": "Contacts",
                        "parent_id": ContactID,
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
                        const ContactOutput = jsonData.data;
                        const jsonContactId = JSON.parse(ContactOutput);
                        const ContactArchiveId = jsonContactId.id;


                        getContactArchiveID(ContactArchiveId)



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
}

export default ContactArchiveAPI

export const getContactArchiveID = (ContactArchiveId) => {
    const API_URL = CRM_Url()
    const LoginToken = CRM_Token()
    const ContactID = getContactId();
    const { API_Key, User_ID } = GetUserData()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    //  myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MTY5NjQwMzUsImp0aSI6ImZ6OUZMTnJYdHlRNGljdE12eFdDZ3c9PSIsImlzcyI6Imh0dHBzOlwvXC9kZW1vLnNpZ25pZnljcm0ubmV0XC9vdXRsb29rLWFkZGluIiwibmJmIjoxNzE2OTY0MDM1LCJleHAiOjE3MTk1NTYwMzUsImRhdGEiOnsidXNlck5hbWUiOiJJbnRlci1TYWxlczAzIiwidXNlcklkIjoiNDdkZjY2MWQtYmNmZS00NTcwLTY2MjAtNWQ1YTgyYzIyNWI4In19.vrtRRwK7M3yt2mlVk9rms_LgxeEY35j_2JTl8suGbpAyp_lz-b3qRjCgtzZYWMtVfHPMMhBWanYSDlkLsxQgrg");
    myHeaders.append("Authorization", `Bearer ${LoginToken}`);
    const raw = JSON.stringify({
        "Api-Key": API_Key,
        "module_name": "Contacts",
        "module_id": ContactID,
        "link_field_name": "emails",
        "related_ids": [
            ContactArchiveId,
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
