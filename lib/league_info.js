import axios from "axios";

async function leagueInfo(accessToken, leagueId) {
    try {
        let request = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/me`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return { request, league: request.data };
    } catch (err) {
        console.log(err);
    }
}

export default leagueInfo;
