import axios from "axios";

class LeaguePlayer {
    constructor({
        userId,
        userName,
        userProfileUrl,
        buyDate,
        buyPrice,
        matchesTotal,
        marketValueChange,
        marketValueChangePercent,
    }) {
        this.userId = userId;
        this.userName = userName;
        this.userProfileImage = userProfileUrl;
        this.buyDate = new Date(buyDate);
        this.buyPrice = buyPrice;
        this.matchesTotal = matchesTotal;
        this.marketValueChange = marketValueChange;
        this.marketValueChangePercent = marketValueChangePercent;
    }
}

class Season {
    constructor({
        seasonId,
        season,
        points,
        matches,
        startMatches,
        secondsPlayed,
        secondsPerGoal,
        goals,
        assists,
        redCards,
        yellowCards,
        goalFree,
        defensivePoints,
        offensivePoints,
        generalPoints,
        teamPoints,
        goalKeeperPoints,
        defensiveAverage,
        offensiveAverage,
        generalAverage,
        teamAverage,
        goalKeeperAverage,
    }) {
        this.seasonId = seasonId;
        this.season = season;
        this.points = points;
        this.matches = matches;
        this.startingLineUp = startMatches;
        this.secondsPlayed = secondsPlayed;
        this.secondsPerGoal = secondsPerGoal;
        this.goals = goals;
        this.assists = assists;
        this.redCards = redCards;
        this.yellowCards = yellowCards;
        this.goalFree = goalFree; // penalty goals?
        this.defensivePoints = defensivePoints;
        this.offensivePoints = offensivePoints;
        this.generalPoints = generalPoints;
        this.teamPoints = teamPoints;
        this.goalKeeperPoints = goalKeeperPoints;
        this.defensiveAverage = defensiveAverage; // average of defensive points in this team?
        this.offensiveAverage = offensiveAverage;
        this.generalAverage = generalAverage;
        this.teamAverage = teamAverage;
        this.goalKeeperAverage = goalKeeperAverage; // this does not match with general average of goal keeper in this team (this value is 0)
    }
}

class MarketValue {
    constructor({ d, m }) {
        this.date = new Date(d);
        this.value = m;
    }
}

class NextMatch {
    constructor({ d, t1i, t1n, t1y, t1s, t2i, t2n, t2y, t2s, md }) {
        this.date = new Date(d);
        this.t1i = t1i; // team one id?
        this.firstTeamName = t1n;
        this.firstTeamShortName = t1y;
        this.t1s = t1s;
        this.t2i = t2i;
        this.secondTeamName = t2n;
        this.secondTeamShortName = t2y;
        this.t2s = t2s;
        this.matchDay = md;
    }
}

class PlayerStats {
    constructor({
        id,
        teamId,
        userId,
        userProfileUrl,
        userName,
        userFlags,
        firstName,
        lastName,
        profileUrl,
        teamUrl,
        teamCoverUrl,
        status,
        position,
        number,
        points,
        averagePoints,
        marketValue,
        mvTrend,
        mvHigh,
        mvHighDate,
        mvLow,
        mvLowDate,
        leaguePlayer,
        seasons,
        marketValues,
        nm,
        f,
    }) {
        this.id = id;
        this.teamId = teamId;
        this.userId = userId; // current Owner?
        this.userProfileImageUrl = userProfileUrl; // is not complete url
        this.userName = userName;
        this.userFlags = userFlags;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImage = profileUrl;
        this.teamImage = teamUrl;
        this.teamCover = teamCoverUrl;
        this.status = status;
        this.position = position;
        this.number = number;
        this.points = points;
        this.averagePoints = averagePoints;
        this.marketValue = marketValue;
        this.marketValueTrend = mvTrend;
        this.marketValueHigh = mvHigh;
        this.marketValueHighDate = new Date(mvHighDate);
        this.marketValueLow = mvLow;
        this.marketValueLowDate = new Date(mvLowDate);
        this.leaguePlayer = new LeaguePlayer(leaguePlayer);
        this.seasons = seasons.map((s) => new Season(s));
        this.marketValues = marketValues.map((mv) => new MarketValue(mv));
        this.nextMatches = nm.map((match) => new NextMatch(match));
        this.f = f; // flag indicating if player is leaving?
    }
}

export default async function getPlayerStats(accessToken, leagueId, playerId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/players/${playerId}/stats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new PlayerStats(data);
    } catch (err) {
        console.log(err);
    }
}
