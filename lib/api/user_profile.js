import axios from "axios";
import { Manager } from "../models/manager.js";

export default async function userProfile(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/profile`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        console.log(data);
        return new Manager(data);
    } catch (err) {
        console.log(err);
    }
}
