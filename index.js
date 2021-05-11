import credentials from "./credentials.js";
import login from "./lib/api/login.js";
import myLeagueInfo from "./lib/api/my_league_info.js";
import getLeagues from "./lib/api/leagues.js";
import leagueUsers from "./lib/api/league_users.js";

async function main() {
    let { user, token, leagues } = await login(
        credentials.email,
        credentials.password
    );
    if (user === undefined) throw new Error("could not login.");
    console.log(token);
    console.log(user);
    console.log(leagues);
    const league = await myLeagueInfo(token, leagues[0].id);
    console.log(league);
    leagues = await getLeagues(token);
    console.log(leagues);
    let users = await leagueUsers(token, leagues[0].id);
    console.log(users);
}

main();
