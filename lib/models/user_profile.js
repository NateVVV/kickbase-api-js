class TeamValue {
    constructor({ d, v }) {
        this.day = new Date(d);
        this.value = v;
    }
}

class MatchDay {
    constructor({ s, day, p, pt }) {
        this.season = s;
        this.day = day;
        this.placement = p;
        this.points = pt;
    }
}

class Season {
    constructor({
        seasonId,
        season,
        points,
        averagePoints,
        maxPoints,
        wins,
        matchDays,
    }) {
        this.id = seasonId;
        this.year = season;
        this.points = points;
        this.averagePoints = averagePoints;
        this.maxPoints = maxPoints;
        this.wins = wins;
        this.matchDays = matchDays.map((matchDay) => new MatchDay(matchDay));
    }
}

class UserProfile {
    constructor({
        flags,
        perms,
        levelAchieved,
        currentSeasonId,
        placement,
        pointsGK,
        pointsDEF,
        pointsMF,
        pointsFWD,
        teamValue,
        bought,
        sold,
        highestTeamValue,
        teamValues,
        seasons,
    }) {
        this.flags = flags;
        this.perms = perms;
        this.levelAchieved = levelAchieved;
        this.currentSeasonId = currentSeasonId;
        this.placement = placement;
        this.goalkeeperPoints = pointsGK;
        this.defendersPoints = pointsDEF;
        this.midfielderPoints = pointsMF;
        this.attackerPoints = pointsFWD;
        this.teamValue = teamValue;
        this.highestTeamValue = highestTeamValue;
        this.teamValues = teamValues.map((value) => new TeamValue(value));
        this.bought = bought;
        this.sold = sold;
        this.seasons = seasons.map((season) => new Season(season));
    }
}

export { UserProfile, TeamValue, MatchDay, Season };
