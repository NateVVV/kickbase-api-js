import axios from "axios";

export default async function userFeed(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(`https://api.kickbase.com/leagues/${leagueId}/users/${userId}/feed`, {
            headers: {
                Cookie: `kkstrauth=${accessToken};`,
            },
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}
