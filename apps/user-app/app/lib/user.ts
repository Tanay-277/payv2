import axios from "axios"

const URL = "http://localhost:8000/api/v2"

export const fetchUser = async (id: string) => {
    try {
        const response = await axios.get(`${URL}/user/${id}?mode=all`, {
            withCredentials: true,
        });
        const data = response.data
        console.log("data", data);
        return data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        console.error(error)
    }
}