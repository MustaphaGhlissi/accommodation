import axios from 'axios';


const apiInstance = rootBaseURL => axios.create({
    baseURL: `${rootBaseURL}`,
});

export {
    apiInstance
}