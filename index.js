import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import myLeagueInfo from "./lib/api/my_league_info.js";
import getLeagueInfo from "./lib/api/league_info.js";
import getLeagues from "./lib/api/leagues.js";
import leagueUsers from "./lib/api/league_users.js";
import userProfile from "./lib/api/user_profile.js";
import userFeed from "./lib/api/user_feed.js";
import leagueStats from "./lib/api/league_stats.js";
import userStats from "./lib/api/user_stats.js";
import { Manager } from "./lib/models/manager.js";

async function main() {
    let { user, token, leagues } = await login(
        credentials.email,
        credentials.password
    );
    if (user === undefined) throw new Error("could not login.");
    for(const league of leagues) {
        console.log(league.name, league.id, league.totalTransfers)
    }
    const myLeague = await myLeagueInfo(token, leagues[0].id);
    const leagueInfo = await getLeagueInfo(token, leagues[2].id);
    leagues = await getLeagues(token);
    console.log(leagues);
    const league = leagues[0];
    let users = await leagueUsers(token, league.id);
    console.log(users);
    let profile = await userProfile(token, league.id, user.id);
    console.log(profile);
    console.log(profile.seasons[0].matchDays);
    let manager = new Manager(profile, league);
    console.log(manager);
    await userFeed(token, league.id, user.id);
    await leagueStats(token, league.id);
    await userStats(token, league.id, user.id); //1707891
}

main();
