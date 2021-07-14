import axios from "axios";

class LeagueData {
    constructor({
        id,
        name,
        creator,
        creatorId,
        creation,
        ai,
        t,
        au,
        mu,
        ap,
        pub,
        gm,
        mpl,
        ci,
    }) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.creatorId = creatorId;
        this.creation = creation;
        this.activity_index = ai;
        this.totalTransfers = t;
        this.activeUsers = au;
        this.maxUsers = mu;
        this.averagePoints = ap;
        this.isPublic = pub;
        this.picture = ci;
    }
}

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
