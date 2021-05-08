import axios from "axios";

async function leagueInfo(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/me`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return data;
    } catch (err) {
        console.log(err);
    }
}

export default leagueInfo;
