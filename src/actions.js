import { config } from "./config";
import axios from "axios";

const url = config.host;

export const registerUser = async (data, photo) => {
    try {
        const response = await axios.post(
            `${url}/auth/register`,
            { data: data },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        return error.response
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${url}/auth/login`,
            { email: email, password: password },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        return error.response
    }
};

export const getUser = async () => {
    try {
        const response = await axios.get(
            `${url}/auth/user`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('access')}`,
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        return error.response
    }
};

export const refreshJwt = async () => {
    try {
        const response = await axios.get(
            `${url}/auth/refresh?type_=refresh`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('refresh')}`,
                    Accept: "application/json",
                },
            }
        );
        return response;
    } catch (error) {
        return error.response
    }
};

