// fake out the code
export const natsWrapper = {
    client: {
        publish: (subject: string, data: string, callback: () => void) =>{
            callback();
        },
    },
};