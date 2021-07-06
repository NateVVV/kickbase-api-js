import axios from "axios";

class Licenses {
    constructor(permissions) {
        this.pro = permissions.includes(1000);
        this.member = permissions.includes(1001);
    }
    get license() {
        if (this.member) return "Member";
        if (this.pro) return "Pro";
        return "Nothing";
    }
}

class User {
    constructor({
        email,
        name,
        id,
        profile,
        flags,
        perms,
        proExpiry,
        cover,
        vemail,
        pt,
        facebookId,
        status,
    }) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.profile = profile;
        this.flags = flags;
        this.licenses = new Licenses(perms);
        this.points = pt;
        this.facebookId = facebookId;
        this.status = status;
    }
}

export default async function leagueUsers(accessToken, leagueId) {
    try {
        const { data } = await axios.get(
            `https://api.kickbase.com/leagues/${leagueId}/users`,
            {
                headers: {
                    Cookie: `kkstrauth=${accessToken};`,
                },
            }
        );
        const { users } = data;
        return users.map((user) => new User(user));
    } catch (err) {
        console.log(err);
    }
}
