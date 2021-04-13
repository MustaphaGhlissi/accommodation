import axios from 'axios';

const rootBaseURL = 'https://49011b77e6ef.ngrok.io';

const apiInstance = axios.create({
    baseURL: `${rootBaseURL}`,
});

export {
    apiInstance
}