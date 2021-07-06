import axios from "axios";

export default async function userStats(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/stats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
