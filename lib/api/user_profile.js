import axios from "axios";
import { Manager } from "../models/manager.js";

export default async function leagues(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/profile`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new Manager(data);
    } catch (err) {
        console.log(err);
    }
}
