import axios from 'axios';

const client = axios.create({
    withCredentials: true
});

// const client = axios.create();

export default client;