// placeholder for a class which contains all important data for a "manager" ( collects data from UserProfile, LeageData, ...)
import { UserProfile, TeamValue, MatchDay, Season } from "./user_profile.js";
import LeagueData from "./league_data.js";
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
