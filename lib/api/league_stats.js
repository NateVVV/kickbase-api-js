import axios from "axios";

class MatchDayStats {
    constructor({userId, dayEarnings, dayPoints, dayPlacement, dayTendency, teamValue, points, placement, tendency, flags}) {
        this.userId = userId
        this.dayEarnings = dayEarnings
        this.dayPoints = dayPoints
        this.dayPlacement = dayPlacement
        this.dayTendency = dayTendency
        this.teamValue = teamValue
        this.points = points
        this.placement = placement
        this.tendency = tendency
        this.flags = flags
    }
}

class Matchday {
    constructor({day, users}) {
        this.day = day
        this.users = users.map(u => new MatchDayStats(u))
    }
}

class User {
    constructor({id, name, email, facebookId, status, profile, cover, flags, perms}) {
        this.id = id
        this.name = name
        this.email = email
        this.facebookId = facebookId
        this.status = status
        this.profile = profile
        this.cover = cover
        this.flags = flags
        this.perms = perms
    }
}

class LeagueStats {
    constructor({currentDay, matchDays, users}) {
        this.currentDay = currentDay
        this.matchDays = matchDays.map(m => new Matchday(m))
        this.users = users.map(u => new User(u))
    }
}

export default async function leagueStats(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/stats`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        return new LeagueStats(data)
    } catch (err) {
        console.log(err);
    }
}
