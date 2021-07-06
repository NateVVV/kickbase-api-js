import axios from "axios";
import { User } from "../models/user.js";

class LeagueData {
    constructor({
        id,
        name,
        creator,
        creatorId,
        creation,
        ai,
        t,
        au,
        mu,
        ap,
        pub,
        gm,
        mpl,
        ci,
    }) {
        this.id = id;
        this.name = name;
        this.creator = creator;
        this.creatorId = creatorId;
        this.creation = creation;
        this.activity_index = ai;
        this.totalTransfers = t;
        this.activeUsers = au;
        this.maxUsers = mu;
        this.averagePoints = ap;
        this.isPublic = pub;
        this.picture = ci;
    }
}

async function login(email, password) {
    try {
        const { status, data } = await axios.post(
            "https://api.kickbase.com/user/login",
            {
                email: email,
                password: password,
                ext: false,
            }
        );
        if (status !== 200)
            throw new Error(`Something went wrong. Status ${status}.`);
        const { user, leagues, token } = data;
        return {
            user: new User(user),
            leagues: leagues.map((league) => {
                return new LeagueData(league);
            }),
            token,
        };
    } catch (err) {
        console.log(err);
    }
}

export default login;
