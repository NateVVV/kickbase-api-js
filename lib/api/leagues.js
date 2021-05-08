import axios from "axios";
import LeagueData from "../models/league_data.js";

export default async function leagues(accessToken) {
    try {
        const { data } = await axios.get(`https://api.kickbase.com/leagues/`, {
            headers: {
                Cookie: `kkstrauth=${accessToken};`,
            },
        });
        const { leagues } = data;
        return leagues.map((league) => new LeagueData(league));
    } catch (err) {
        console.log(err);
    }
}
