import api from "./api";

export const getClasses = () => {
    return api.get("/classes");
};

export const getClassById = (id) => {
    return api.get(`/classes/${id}`);
};

export const createClass = (data) => {
    return api.post("/classes", data);
};

export const updateClass = (id, data) => {
    return api.put(`/classes/${id}`, data);
};

export const deleteClass = (id) => {
    return api.delete(`/classes/${id}`);
};