import { config } from "./config";
import axios from "axios";

const url = config.levelService;

export const getLevel = async () => {
    try {
        const response = await axios.get(`${url}/levels/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const getInterests = async () => {
    try {
        const response = await axios.get(`${url}/interests/`, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const patchInterests = async (interests) => {
    try {
        const response = await axios.patch(`${url}/interests/`, interests, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};


export const getAllChallenges = async () => {
    try {
        const response = await axios.get(`${url}/challenges/all`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};


export const postChallenge = async (data) => {
    try {
        const response = await axios.post(`${url}/challenges`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error
    }
};
