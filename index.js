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
    let feed = await getCompleteLeagueFeed(accessToken, leagueId);
    return feed.items.filter((i) => i.type == 12 || i.type == 2);
}

async function showComments(token, leagueId, feedId) {
    let feedComments = await getFeedComments(token, leagueId, feedId);
    console.table(feedComments.comments);
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
    //let manager = new Manager(profile, league);
    //console.log(manager);
    let transfers = await getCompleteTransfers(token, league.id);
    let transferExchange = 0;
    for (const transfer of transfers) {
        const playerName = `${transfer.meta.playerFirstName} ${transfer.meta.playerLastName}`;
        let transferType = ((type) => {
            if (type == 12) return "bought";
            if (type == 2) return "selled";
        })(transfer.type);
        console.log(
            transferType,
            transfer.id,
            transfer.date,
            playerName,
            transfer.meta.price
        );
        if (false && transfer.comments > 0) {
            await showComments(token, league.id, transfer.id);
        }

        if (
            transfer.meta.buyerId == user.id ||
            transfer.meta.sellerId == user.id
        ) {
            console.log("This was me");
            // this currently works just with transfers with public transfer market, not with p2p
            if (transfer.type == 12) transferExchange -= transfer.meta.price;
            if (transfer.type == 2) transferExchange += transfer.meta.price;
        }
    }
    console.log("Transfer win:", transferExchange); // this seems to be courrently wrong
    //await getUserPlayers(token, league.id, user.id);
    //await getLeagueQuickstats(token, league.id);
}

main();
