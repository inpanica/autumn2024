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



export const patchChallenge = async (data) => {
    try {
        const response = await axios.patch(`${url}/challenges`, data, {
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


export const addUserToChallenge = async (data) => {
    try {
        const response = await axios.post(`${url}/challenges/add_user`, data, {
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


export const getUsersChallenges = async () => {
    try {
        const response = await axios.get(`${url}/challenges/by_user`, {
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

export const getChallegensUsers = async (data) => {
    try {
        const response = await axios.post(`${url}/challenges/users_by_challenges`, data, {
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

export const deleteChallenge = async (id_ch) => {
    try {
        const response = await axios.delete(`${url}/challenges/?id_ch=${id_ch}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error
    }
};

export const getUsersAcheivements = async () => {
    try {
        const response = await axios.get(`${url}/challenges/achievement`,{
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

export const getGoals = async () => {
    try {
        const response = await axios.get(`${url}/goals`,{
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


export const postGoal = async (data) => {
    try {
        const response = await axios.post(`${url}/goals`, data, {
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