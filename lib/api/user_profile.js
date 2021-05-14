import axios from "axios";
import { UserProfile } from "../models/user_profile.js";

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
        return new UserProfile(data);
    } catch (err) {
        console.log(err);
    }
}
