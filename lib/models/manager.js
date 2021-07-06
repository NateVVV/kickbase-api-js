// placeholder for a class which contains all important data for a "manager" ( collects data from UserProfile, LeageData, ...)
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

class Manager {
    constructor(userProfile, leagueData) {
        let {
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
        } = userProfile;
        let {
            id,
            name,
            creator,
            creatorId,
            creation,
            ai,
            t,
            au,
            mu,
            ap,
            pub,
            gm,
            mpl,
            ci,
        } = leagueData;

        this.flags = flags;
        this.perms = perms;
        this.levelAchieved = levelAchieved;
        this.placement = placement;
        this.goalkeeperPoints = pointsGK;
        this.defendersPoints = pointsDEF;
        this.midfielderPoints = pointsMF;
        this.attackerPoints = pointsFWD;
        this.highestTeamValue = highestTeamValue;
        this.teamValues = teamValues;
        this.bought = bought;
        this.sold = sold;
        this.seasons = seasons.map((season) => new Season(season));
        //throw new Error("not for using.")
    }

    get currentSeasonId() {}
    get teamValue() {}
}

export { Manager };
