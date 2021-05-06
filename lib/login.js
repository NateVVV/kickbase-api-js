import axios from "axios";

async function login(email, password) {
    try {
        let request = await axios.post("https://api.kickbase.com/user/login", {
            email: email,
            password: password,
            ext: false,
        });
        let token = request.data.token;
        let leagues = request.data.leagues;
        return {request, token, leagues};
    } catch (err) {
        console.log(err);
    }
}

export default login;
