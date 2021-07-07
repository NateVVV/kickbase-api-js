import axios from "axios";

class LeagueInfo {
    constructor({ ai, t, au, mu, rs, us }) {
        this.activityIndex = ai
        this.transfers = t
        this.activeUsers = au
        this.maxUsers = mu
        this.rs = rs
        this.us = us
    }
}

export default async function getLeagueInfo(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/info`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new LeagueInfo(data)
    } catch (err) {
        console.log(err);
    }
}
