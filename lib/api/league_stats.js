import axios from "axios";

export default async function leagueStats(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/stats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        console.log(data);
        const { matchDays } = data;
        const { users } = matchDays[30];
        console.log(users);
    } catch (err) {
        console.log(err);
    }
}
