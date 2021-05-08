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
    }) {
        this.email = email;
        this.name = name;
        this.id = id;
        this.profile = profile;
        this.flags = flags;
        this.perms = perms;
    }
}
