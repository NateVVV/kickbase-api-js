import axios from "axios";

class MatchDayPoints {
    constructor({ d, p, sp, ms, t1i, t1s, t2i, t2s, g, a, h }) {
        this.matchDay = d;
        this.points = p;
        this.secondsPlayed = sp; // is 5400 (=90 minutes) for Christian Günther
        this.startingLineUp = ms;
        this.t1i = t1i;
        this.t1s = t1s;
        this.t2i = t2i;
        this.t2s = t2s;
        this.goals = g;
        this.assists = a;
        this.h = h;
    }
}

class SeasonPoints {
    constructor({ i, t, p, mp, ms, m }) {
        this.i = i;
        this.season = t;
        this.points = p;
        this.matchesPlayed = mp;
        this.startingLineUp = ms;
        this.m = m.map((matchDay) => new MatchDayPoints(matchDay));
    }
}

class PlayerPoints {
    constructor({ s }) {
        this.seasons = s.map((season) => new SeasonPoints(season));
    }
}

export default async function getPlayerPoints(accessToken, playerId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/players/${playerId}/points`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new PlayerPoints(data);
    } catch (err) {
        console.log(err);
    }
}
