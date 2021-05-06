import axios from "axios";

async function login(email, password) {
    try {
        const request = await axios.post("https://api.kickbase.com/user/login", {
            email: email,
            password: password,
            ext: false,
        });
        const token = request.data.token;
        const leagues = request.data.leagues;
        return {request, token, leagues};
    } catch (err) {
        console.log(err);
    }
}

export default login;
