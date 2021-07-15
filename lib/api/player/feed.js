import axios from "axios";

class ItemMeta {
    // not complete. Some values are not evaluated
    constructor({
        sid,
        day,
        r1,
        r2,
        oid,
        otn,
        h,
        pid,
        tid,
        tn,
        pfn,
        pln,
        pi,
        p, // contains {i, t, n, f, s, p}
        g,
        cy,
        cr,
        cyr,
        a,
        e,
        t,
        b, // contains {i, n, f}
        v, // value?
        st, // contains {e: {team, text}}
        s, // status? contains values like 'Fit' or 'Fit - Günter trainiert mit dem Team'
    }) {
        this.sid = sid;
        this.day = day;
        this.r1 = r1;
        this.r2 = r2;
        this.oid = oid; // other team id?
        this.otn = otn; // other team name?
        this.h = h;
        this.playerId = pid;
        this.tid = tid;
        this.teamName = tn;
        this.playerFirstName = pfn;
        this.playerLastName = pln;
        this.playerImage = pi;
        this.p = p;
        this.g = g;
        this.cy = cy;
        this.cr = cr;
        this.cyr = cyr;
        this.a = a;
        this.e = e;
        this.t = t;
    }
}

class FeedItem {
    constructor({ id, comments, date, age, type, source, meta, seasonId }) {
        this.id = id;
        this.comments = comments;
        this.date = new Date(date);
        this.age = age; // seconds?
        this.type = type;
        this.source = source;
        this.meta = new ItemMeta(meta);
        this.seasonId = seasonId;
    }
}

class PlayerFeed {
    constructor({ items }) {
        this.items = items.map((i) => new FeedItem(i));
    }
}

export default async function getPlayerFeed(
    accessToken,
    leagueId,
    playerId,
    start = 0
) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/players/${playerId}/feed?start=${start}`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new PlayerFeed(data);
    } catch (err) {
        console.log(err);
    }
}
