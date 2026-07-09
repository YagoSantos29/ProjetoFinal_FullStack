import api from "./api";

export const getEnrollments = () => {
    return api.get("/enrollments");
};

export const getEnrollmentById = (id) => {
    return api.get(`/enrollments/${id}`);
};

export const createEnrollment = (data) => {
    return api.post("/enrollments", data);
};

export const updateEnrollment = (id, data) => {
    return api.put(`/enrollments/${id}`, data);
};

export const deleteEnrollment = (id) => {
    return api.delete(`/enrollments/${id}`);
};