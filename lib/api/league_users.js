import axios from "axios";
import { User } from "../models/user.js";

export default async function leagueUsers(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        const { users } = data;
        return users.map((user) => new User(user));
    } catch (err) {
        console.log(err);
    }
}
