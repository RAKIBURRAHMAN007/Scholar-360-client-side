import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

export const axiosSecure = axios.create({
    baseURL: 'https://scholar360-server.vercel.app/'
})
const UseAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        // console.log('request stopped by', token)
        return config;
    }, function (error) {

        return Promise.reject(error);
    })




    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async(error)=> {
        const status = error.response.status;
        if(status === 401 || status===403){
            await logOut();
            navigate('/login');

        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
    return axiosSecure;

};

export default UseAxiosSecure;