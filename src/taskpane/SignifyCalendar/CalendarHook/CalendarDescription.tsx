
export const CalendarDescription = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        Office.context.mailbox.item.body.getAsync("text", function (result) {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
                const getDescriptons = result.value;
                if (DEBUG) {
                    console.log("getDescriptons", getDescriptons)
                }
                resolve(getDescriptons);
            } else {
                reject(result.error);
            }
        });
    });
}
