import axios from 'axios';

const rootBaseURL = 'https://manten-accommodations.azurewebsites.net';

const apiInstance = axios.create({
    baseURL: `${rootBaseURL}`,
});

export {
    apiInstance
}