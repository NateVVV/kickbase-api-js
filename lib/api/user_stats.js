import axios from "axios";

class Season {
    constructor({ seasonId, season, points, averagePoints, maxPoints, minPoints, wins, bought, sold, pointsGoalKeeper, pointsDefenders, pointsMidFielders, pointsForwards, averageGoalKeeper, averageDefenders, averageMidFielders, averageForwards }) {
        this.seasonId = seasonId
        this.season = season
        this.points = points
        this.averagePoints = averagePoints
        this.maxPoints = maxPoints
        this.minPoints = minPoints
        this.wins = wins
        this.bought = bought
        this.sold = sold
        this.pointsGoalKeeper = pointsGoalKeeper
        this.pointsDefenders = pointsDefenders
        this.pointsMidFielders = pointsMidFielders
        this.pointsForwards = pointsForwards
        this.averageGoalKeeper = averageGoalKeeper
        this.averageDefenders = averageDefenders
        this.averageMidFielders = averageMidFielders
        this.averageForwards = averageForwards
    }
}

class TeamValue {
    constructor({ d, v }) {
        this.day = new Date(d);
        this.value = v;
    }
}

class LeagueUser {
    constructor({ maxTeamValue, maxTeamValueDate, maxBuyPrice, maxBuyPlayerId, maxBuyFirstName, maxBuyLastName, maxSellPrice, maxSellPlayerId, maxSellFirstName, maxSellLastName }) {
        this.maxTeamValue = maxTeamValue
        this.maxTeamValueDate = new Date(maxTeamValueDate)
        this.maxBuyPrice = maxBuyPrice
        this.maxBuyPlayerId = maxBuyPlayerId
        this.maxBuyFirstName = maxBuyFirstName
        this.maxBuyLastName = maxBuyLastName
        this.maxSellPrice = maxSellPrice
        this.maxSellPlayerId = maxSellPlayerId
        this.maxSellFirstName = maxSellFirstName
        this.maxSellLastName = maxSellLastName
    }
}

class UserStats {
    constructor({ name, flags, profileUrl, coverUrl, placement, points, teamValue, seasons, teamValues, leagueUser }) {
        this.name = name;
        this.flags = flags
        this.profileUrl = profileUrl
        this.coverUrl = coverUrl
        this.placement = placement
        this.points = points
        this.teamValue = teamValue
        this.seasons = seasons.map(s => new Season(s))
        this.teamValues = teamValues.map(v => new TeamValue(v))
        this.LeagueUser = new LeagueUser(leagueUser)
    }
}

export default async function userStats(accessToken, leagueId, userId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users/${userId}/stats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new UserStats(data)
    } catch (err) {
        console.log(err);
    }
}
