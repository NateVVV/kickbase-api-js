import axios from "axios";

class Player {
    constructor({
        id,
        teamId,
        teamName,
        userId,
        firstName,
        lastName,
        profile,
        profileBig,
        team,
        teamCover,
        status,
        position,
        number,
        averagePoints,
        totalPoints,
        marketValue,
        marketValueTrend,
        dayStatus,
    }) {
        this.id = id;
        this.teamId = teamId;
        this.teamName = teamName;
        this.userId = userId; // id of the owner?
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePicture = profile; // unreliable
        this.profileBigPicture = profileBig;
        this.teamPicture = team; // unreliable
        this.teamCover = teamCover; // unreliable
        this.status = status;
        this.position = position;
        this.number = number; // ?
        this.averagePoints = averagePoints;
        this.totalPoints = totalPoints;
        this.marketValue = marketValue;
        this.marketValueTrend = marketValueTrend;
        this.dayStatus = dayStatus; // ?
    }
}

class UserPlayers {
    constructor({ players, err }) {
        this.players = players.map((p) => new Player(p));
        this.error = err; // ?
    }
}

export default async function getUserPlayers(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/players`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new UserPlayers(data);
    } catch (err) {
        console.log(err);
    }
}
