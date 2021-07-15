import axios from "axios";

class PlayerInfo {
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
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profile;
        this.profileBigImage = profileBig;
        this.teamImage = team; // unauthorized
        this.teamCover = teamCover; // unauthorized
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

export default async function getPlayerInfo(accessToken, leagueId, playerId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/players/${playerId}`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new PlayerInfo(data);
    } catch (err) {
        console.log(err);
    }
}
