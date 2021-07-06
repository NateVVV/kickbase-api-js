import axios from "axios";

class Meta {
    constructor({uid, un, ui, lid, ln}) {
        this.uid = uid
        this.un = un
        this.ui = ui
        this.lid = lid
        this.ln = ln
    }
}

class Item {
    constructor({id, comments, date, age, type, source, meta, seasonId}) {
        this.id = id
        this.comments = comments
        this.date = new Date(date)
        this.age = age
        this.type = type
        this.source = source
        this.meta = new Meta(meta)
        this.seasonId = seasonId
    }
}

class UserFeed {
    constructor({items}) {
        this.items = items.map(i => new Item(i))
    }    
}

export default async function userFeed(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(`https://api.kickbase.com/leagues/${leagueId}/users/${userId}/feed`, {
            headers: {
                Cookie: `kkstrauth=${accessToken};`,
            },
        });
        return new UserFeed(data)
    } catch (err) {
        console.log(err);
    }
}
