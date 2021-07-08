import axios from "axios";

class FeedMeta {
    constructor({ sid, sn, si, bid, bn, bi, pid, tid, pfn, pln, pi, p }) {
        // matching not evaluated
        this.sellerId = sid;
        this.sellerName = sn;
        this.sellerImage = si;
        this.buyerId = bid;
        this.buyerName = bn;
        this.buyerImage = bi;
        this.playerId = pid;
        this.tid = tid;
        this.playerFirstName = pfn;
        this.playerLastName = pln;
        this.playerImage = pi;
        this.price = p;
    }
}

class FeedItem {
    constructor({ id, comments, date, age, type, source, meta, seasonId }) {
        this.id = id;
        this.comments = comments; // amount of comments
        this.date = new Date(date);
        this.age = age;
        this.type = type; // 12 = bought, 3 = new on transfer market, 2 = selled to transfer market
        this.source = source; // 2 = transfer market?
        this.meta = new FeedMeta(meta);
        this.seasonId = seasonId;
    }
}

class LeagueFeed {
    constructor({ items }) {
        for (const item of items) {
            if (item.meta.pfn == "Sergio") console.log(item);
        }
        this.items = items.map((i) => new FeedItem(i));
        this.items.sort((first, second) => first.age - second.age);
    }
}

export default async function getLeagueFeed(accessToken, leagueId, start = 0) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/feed?start=${start}`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new LeagueFeed(data);
    } catch (err) {
        console.log(err);
    }
}
