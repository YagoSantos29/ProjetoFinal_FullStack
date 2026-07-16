import api from "./api";

export const getGrades = () => {
    return api.get("/grades");
};

export const getGradeById = (id) => {
    return api.get(`/grades/${id}`);
};

export const createGrade = (data) => {
    return api.post("/grades", data);
};

export const updateGrade = (id, data) => {
    return api.put(`/grades/${id}`, data);
};

export const deleteGrade = (id) => {
    return api.delete(`/grades/${id}`);
};