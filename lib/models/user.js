export default class User {
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
        this.perms = perms;
        this.points = pt;
        this.facebookId = facebookId;
        this.status = status;
    }
}
