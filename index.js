import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import getLeaguePersonelInfo from "./lib/api/league/league_personel_info.js";
import getLeagueInfo from "./lib/api/league/league_info.js";
import getLeagues from "./lib/api/league/leagues.js";
import getLeagueUsers from "./lib/api/league/league_users.js";
import getUserProfile from "./lib/api/league/user/user_profile.js";
import getUserFeed from "./lib/api/league/user/user_feed.js";
import getLeagueStats from "./lib/api/league/league_stats.js";
import getUserStats from "./lib/api/league/user/user_stats.js";
import getUserMatchDayFeed from "./lib/api/league/user/user_match_day_feed.js";
import getMarket from "./lib/api/league/market/market.js";
import getLeagueFeed from "./lib/api/league/feed/league_feed.js";
import getFeedComments from "./lib/api/league/feed/feed_comments.js";
import getUserPlayers from "./lib/api/league/user/user_players.js";
import getLeagueQuickstats from "./lib/api/league/league_quickstats.js";
import getPlayerInfo from "./lib/api/player/info.js";
import getPlayerFeed from "./lib/api/player/feed.js";
import getPlayerPoints from "./lib/api/player/points.js";
import getPlayerStats from "./lib/api/player/stats.js";
import { Manager } from "./lib/models/manager.js";
import { TeamRoster } from "./lib/models/team_roster.js";

async function getCompleteLeagueFeed(accessToken, leagueId) {
    const itemsPerPage = 30;
    let feed = await getLeagueFeed(accessToken, leagueId);
    if (feed.items.length == 0) return null;

    // collect all the pages
    let feedPages = [feed];
    let start = feed.items.length;
    while (feed.items.length == itemsPerPage) {
        feed = await getLeagueFeed(accessToken, leagueId, start);
        start += feed.items.length;
        feedPages.push(feed);
    }
    if (feedPages.length == 1) return feedPages[0];
    let baseFeed = feedPages[0];

    // summarize all in one single feed
    for (let i = 1; i < feedPages.length; i++) {
        baseFeed.items.push(...feedPages[i].items);
    }
    // sort
    baseFeed.items.sort((first, second) => second.age - first.age);
    return baseFeed;
}

async function getCompleteTransfers(accessToken, leagueId) {
    let completeFeed = await getCompleteLeagueFeed(accessToken, leagueId);
    completeFeed.items.filter((i) => i.type == 12 || i.type == 2);
    return completeFeed;
}

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
    let feed = await getCompleteTransfers(token, league.id);
    for (const item of feed.items) {
        const playerId = item.meta.playerId;
        const playerName = `${item.meta.playerFirstName} ${item.meta.playerLastName}`;
        if (item.type == 12) {
            console.log("bought", item.id, item.date, playerName);
        } else if (item.type == 2) {
            console.log("selled", item.id, item.date, playerName);
        }
        if (false && item.comments > 0) {
            let feedComments = await getFeedComments(token, league.id, item.id);
            console.table(feedComments.comments);
            //console.log(item.meta);
            //console.log(await getPlayerInfo(token, league.id, playerId));
            let playerFeed = await getPlayerFeed(token, league.id, playerId);
            //console.log(playerFeed);
            let playerPoints = await getPlayerPoints(token, playerId);
            //console.log(playerPoints);
            if (false && playerPoints.seasons.length > 0)
                console.table(
                    playerPoints.seasons[playerPoints.seasons.length - 1].m
                );
            const playerStats = await getPlayerStats(
                token,
                league.id,
                playerId
            );
            //console.log(playerStats);
        }
    }
    //await getUserPlayers(token, league.id, user.id);
    //await getLeagueQuickstats(token, league.id);
}

main();
