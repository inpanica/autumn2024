import { config } from "./config";
import axios from "axios";

const url = config.levelService;

export const getLevel = async () => {
    try {
        const response = await axios.get(`${url}/levels/`, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                Accept: "application/json",
            },
        });
        return response;
    } catch (error) {
        return error.response;
    }
};
