import login from "./lib/login.js";
import leagueInfo from "./lib/league_info.js";
import credentials from "./credentials.js";

async function main() {
    let { token, leagues } = await login(
        credentials.email,
        credentials.password
    );
    let { league } = await leagueInfo(token, leagues[0].id);
    console.log(league);
}

main();
