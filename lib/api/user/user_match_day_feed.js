import axios from "axios";

class MatchDayFeedMeta {
    constructor({ uid, un, ui, lid, ln }) {
        this.userId = uid;
        this.userName = un;
        this.userImmage = ui;
        this.leagueId = lid;
        this.leagueName = ln;
    }
}

class MatchDayFeedItem {
    constructor({ id, comments, date, age, type, source, meta, seasonId }) {
        this.id = id;
        this.comments = comments;
        this.date = new Date(date);
        this.age = age;
        this.type = type;
        this.source = source;
        this.meta = new MatchDayFeedMeta(meta);
        this.seasonId = seasonId;
    }
}

class UserMatchDayFeed {
    constructor({ items }) {
        this.items = items.map((i) => new MatchDayFeedItem(i));
    }
}

export default async function getUserMatchDayFeed(
    accessToken,
    leagueId,
    userId
) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/feed`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new UserMatchDayFeed(data);
    } catch (err) {
        console.log(err);
    }
}
