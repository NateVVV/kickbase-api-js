import axios from "axios";

class S {
    constructor({ t, uid, u, ui, v }) {
        this.t = t; // ? not transfers
        this.userId = uid;
        this.userName = u;
        this.userImage = ui;
        this.transfers = v; // could be amount of transfers
    }
}

class LeagueQuickstats {
    constructor({ n, i, c, cid, ci, cd, m, pt, pa, t, nub, nuw, ntv, s }) {
        this.name = n;
        this.image = i;
        this.creator = c;
        this.creatorId = cid;
        this.creatorImage = ci;
        this.creationDate = new Date(cd);
        this.members = m; // amount of members?
        this.totalPoints = pt; // ?
        this.averagePoints = pa;
        this.transfers = t; // amount of transfers ?
        this.nub = nub; // ? value is 50 000 000
        this.nuw = nuw; // ? value is 200 000 000 -> starting value -> new user worth?
        this.ntv = ntv; // ? value is 100 000 000
        this.s = s.map((value) => new S(value));
    }
}

export default async function getLeagueQuickstats(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/quickstats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new LeagueQuickstats(data);
    } catch (err) {
        console.log(err);
    }
}
