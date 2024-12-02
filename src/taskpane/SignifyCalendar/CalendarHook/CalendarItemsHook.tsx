

const CalendarItemsHook = async () => {
    if (Office.context.mailbox.item.itemType !== Office.MailboxEnums.ItemType.Appointment) {
        throw new Error('The current item is not an appointment or meeting.');
    }

    const isComposeMode = !!Office.context.mailbox.item.subject.getAsync;

    if (isComposeMode) {
        try {
            const [subjectResult, startResult, endResult] = await Promise.all([
                getAsyncValue(Office.context.mailbox.item.subject),
                getAsyncValue(Office.context.mailbox.item.start),
                getAsyncValue(Office.context.mailbox.item.end)
            ]);

            const startDate = new Date(startResult as string);
            const endDate = new Date(endResult as string);

            const timeDifference = calculateTimeDifference(startDate, endDate);

            return {
                subject: subjectResult,
                startDate: formatDateTime(startDate),
                endDate: formatDateTime(endDate),
                hoursDifference: timeDifference.hours,
                minutesDifference: timeDifference.minutes
            };
        } catch (error) {
            throw new Error(`Failed to get appointment details in compose mode: ${error.message}`);
        }
    } else {
        const startDate = new Date(Office.context.mailbox.item.start);
        const endDate = new Date(Office.context.mailbox.item.end);

        const timeDifference = calculateTimeDifference(startDate, endDate);

        return {
            subject: Office.context.mailbox.item.subject,
            startDate: formatDateTime(startDate),
            endDate: formatDateTime(endDate),
            hoursDifference: timeDifference.hours,
            minutesDifference: timeDifference.minutes
        };
    }

    function getAsyncValue(property) {
        return new Promise((resolve, reject) => {
            property.getAsync(result => {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    resolve(result.value);
                } else {
                    reject(result.error);
                }
            });
        });
    }

    function formatDateTime(date) {

        if (!date) return { dates: '', times: '' };

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return {
            dates: `${year}-${month}-${day}`,
            times: `${hours}:${minutes}`
        };
    }
    function calculateTimeDifference(startDate, endDate) {
        const difference = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
        const hoursDifference = Math.floor(difference / (1000 * 60 * 60)); // Convert milliseconds to hours
        const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Convert remaining milliseconds to minutes

        return {
            hours: hoursDifference,
            minutes: minutesDifference
        };
    }


}

export default CalendarItemsHook
