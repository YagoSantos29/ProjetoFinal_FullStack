import api from "./api";

export const login = (email, password) => {
    return api.post("/auth/login", {
        email,
        password
    });
};