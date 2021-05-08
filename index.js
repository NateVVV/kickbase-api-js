import login from "./lib/login.js";
import leagueInfo from "./lib/league_info.js";
import credentials from "./credentials.js";

async function main() {
    let { user, token, leagues } = await login(
        credentials.email,
        credentials.password
    );
    if (user === undefined) throw new Error("could not login.");
    console.log(token);
    console.log(user);
    console.log(leagues);
    const league = await leagueInfo(token, leagues[0].id);
    console.log(league);
}

main();
