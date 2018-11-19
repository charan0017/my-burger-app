import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-app-c5e87.firebaseio.com/'
});

export default instance;
