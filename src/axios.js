import axios from "axios";

const axiosInstance = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://grocsy-backend.vercel.app/",
        // baseURL: "https://grocsy-backend-production.up.railway.app/",
        // baseURL: "http://localhost:5000/",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    })
}

export default axiosInstance;