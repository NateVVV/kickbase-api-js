import axios from "axios";

class Player {
    constructor({
        id,
        teamId,
        firstName,
        lastName,
        status,
        position,
        number,
        totalPoints,
        averagePoints,
        marketValue,
        price,
        date,
        expiry,
        lus,
        marketValueTrend,
    }) {
        this.id = id;
        this.teamId = teamId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status; // 0 = fit, 1 = sick, x = out of league?
        this.position = position; // 1 = keeper, 2 = defense, 3 = midfield, 4 = forward
        this.number = number; // ?
        this.totalPoints = totalPoints;
        this.averagePoints = averagePoints;
        this.marketValue = marketValue;
        this.price = price;
        this.marketEntry = new Date(date);
        this.marketExit = ((seconds) => {
            let expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + seconds);
            return expiryDate;
        })(expiry);
        this.lus = lus; // last user id, last users (amount, how many times this player was already bought)?
        this.marketValueTrend = marketValueTrend; // 1 = up, 2 = down
    }
}

class Market {
    constructor({ c, players }) {
        this.c = c; // closed?
        this.players = players.map((p) => new Player(p));
        // sort by expiry date
        this.players.sort((first, second) => first.expiry - second.expiry);
    }
}

export default async function getMarket(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/market/`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new Market(data);
    } catch (err) {
        console.log(err);
    }
}
