export default class LeagueData {
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
