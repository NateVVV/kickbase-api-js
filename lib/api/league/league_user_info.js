import axios from "axios";

class MyLeague {
    constructor({
        budget,
        teamValue,
        placement,
        points,
        ttm,
        cmd,
        flags,
        proExpiry,
        perms,
        se,
        csid,
        nt,
        ntv,
        nb,
        ga,
        un,
    }) {
        this.budget = budget;
        this.teamValue = teamValue;
        this.placement = placement;
        this.points = points;
        this.ttm = ttm;
        this.cmd = cmd;
        this.flags = flags;
        this.proExpiry = new Date(proExpiry);
        this.permissions = perms;
        this.se = se;
        this.csid = csid;
        this.nt = nt;
        this.ntv = ntv;
        this.nb = nb;
        this.ga = ga;
        this.un = un;
    }
}

export default async function getLeagueUserInfo(accessToken, leagueId) {
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
