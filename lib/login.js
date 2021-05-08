import axios from "axios";

async function login(email, password) {
    try {
        const { status, data } = await axios.post(
            "https://api.kickbase.com/user/login",
            {
                email: email,
                password: password,
                ext: false,
            }
        );
        if (status !== 200)
            throw new Error(`Something went wrong. Status ${status}.`);
        const { user, leagues, token } = data;
        return { user, leagues, token };
    } catch (err) {
        console.log(err);
    }
}

export default login;
