import axios from "axios";
import config from "../../../config/config";

export const creteIfas = (payload) => {
    return axios.post(`${config.default.creteIfa}`, { data: payload });
};

export const creteIfaPhase2 = (payload) => {
    return axios.post(`${config.default.creteIfasPhase2}`, { data: payload });
};

export const getOfficeDropdown = (payload) => {
    return axios.post(config.default.getOfficeDropdownData, { data: payload });
};