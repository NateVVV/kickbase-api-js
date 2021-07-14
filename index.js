import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import getLeaguePersonelInfo from "./lib/api/league/league_personel_info.js";
import getLeagueInfo from "./lib/api/league/league_info.js";
import getLeagues from "./lib/api/league/leagues.js";
import getLeagueUsers from "./lib/api/league/league_users.js";
import getUserProfile from "./lib/api/user/user_profile.js";
import getUserFeed from "./lib/api/user/user_feed.js";
import getLeagueStats from "./lib/api/league/league_stats.js";
import getUserStats from "./lib/api/user/user_stats.js";
import getUserMatchDayFeed from "./lib/api/user/user_match_day_feed.js";
import getMarket from "./lib/api/league/market/market.js";
import getLeagueFeed from "./lib/api/league/feed/league_feed.js";
import getFeedComments from "./lib/api/league/feed/feed_comments.js";
import getUserPlayers from "./lib/api/user/user_players.js";
import getLeagueQuickstats from "./lib/api/league/league_quickstats.js";
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
    console.log(await getLeaguePersonelInfo(token, league.id));
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
    let feed = await getLeagueFeed(token, league.id);
    for (const item of feed.items) {
        if (item.comments > 0) {
            let feedComments = await getFeedComments(token, league.id, item.id);
            console.log(item.id, feedComments);
        }
    }
    let start = feed.items.length;
    while (feed.items.length > 0) {
        feed = await getLeagueFeed(token, league.id, start);
        for (const item of feed.items) {
            if (item.comments > 0) {
                let feedComments = await getFeedComments(
                    token,
                    league.id,
                    item.id
                );
                console.log(item.id);
                for (const comment of feedComments.comments) {
                    console.log(comment.comment);
                }
            }
        }
        start += feed.items.length;
    }
    //await getUserPlayers(token, league.id, user.id);
    await getLeagueQuickstats(token, league.id);
}

main();
