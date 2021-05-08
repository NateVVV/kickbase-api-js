import axios from "axios";
import MyLeague from "../models/my_league.js";

async function myLeagueInfo(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/me`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new MyLeague(data);
    } catch (err) {
        console.log(err);
    }
}

export default myLeagueInfo;
