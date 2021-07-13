import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import getLeagueUserInfo from "./lib/api/league_user_info.js";
import getLeagueInfo from "./lib/api/league_info.js";
import getLeagues from "./lib/api/leagues.js";
import getLeagueUsers from "./lib/api/league_users.js";
import getUserProfile from "./lib/api/user_profile.js";
import getUserFeed from "./lib/api/user_feed.js";
import getLeagueStats from "./lib/api/league_stats.js";
import getUserStats from "./lib/api/user_stats.js";
import getUserMatchDayFeed from "./lib/api/user_match_day_feed.js";
import getMarket from "./lib/api/market.js";
import getLeagueFeed from "./lib/api/league_feed.js";
import getUserPlayers from "./lib/api/user_players.js";
import { Manager } from "./lib/models/manager.js";

async function main() {
    let { user, token, leagues } = await login(
        credentials.email,
        credentials.password
    );
    if (user === undefined) throw new Error("could not login.");
    for (const league of leagues) {
        console.log(league.name, league.id, league.totalTransfers);
    }
    leagues = await getLeagues(token);
    console.log(leagues);
    const league = leagues[2];
    let users = await getLeagueUsers(token, league.id);
    console.log(users);
    let profile = await getUserProfile(token, league.id, user.id);
    //console.log(profile);
    //console.log(profile.seasons[0].matchDays);
    //let manager = new Manager(profile, league);
    //console.log(manager);
    //await getUserFeed(token, league.id, user.id);
    //await getLeagueStats(token, league.id);
    //await getUserStats(token, league.id, user.id); //1707891
    //await getUserMatchDayFeed(token, league.id, user.id);
    //await getMarket(token, league.id);
    //await getLeagueFeed(token, league.id);
    await getUserPlayers(token, league.id, user.id);
}

main();
