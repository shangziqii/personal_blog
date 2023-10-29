import axios from "axios";

export const clockInApi = (data: object) => {
    return axios.post('/api/blog/clockIn', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
}