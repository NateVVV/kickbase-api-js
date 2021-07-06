import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import myLeagueInfo from "./lib/api/my_league_info.js";
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
    const league = await myLeagueInfo(token, leagues[0].id);
    console.log(league);
    leagues = await getLeagues(token);
    console.log(leagues);
    let users = await leagueUsers(token, leagues[0].id);
    console.log(users);
    let profile = await userProfile(token, leagues[0].id, user.id);
    console.log(profile);
    console.log(profile.seasons[0].matchDays);
    let manager = new Manager(profile, leagues[0]);
    console.log(manager);
    console.log("##################################");
    await userFeed(token, leagues[0].id, user.id);
    await leagueStats(token, leagues[0].id);
    await userStats(token, leagues[0].id, user.id); //1707891
}

main();
