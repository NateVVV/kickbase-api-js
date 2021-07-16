export class TeamRosterSnapshot {
    constructor(date, players) {
        this.date = date;
        this.players = players;
        this.nextRoster = null;
    }
}

export class TeamRoster {
    constructor() {
        this.teamRosterSnapshotList = null;
        this.latestTeamRoster = null;
    }

    getTeamRosterAt(date) {
        if (this.latestTeamRoster == null) return null;
        let teamRoster = this.teamRosterSnapshotList;
        while (date.getTime() > teamRoster.date.getTime()) {
            teamRoster = teamRoster.nextRoster;
        }
        return teamRoster.players;
    }

    addPlayer(player, date) {
        if (this.latestTeamRoster == null) {
            const newRosterSnaphsot = new TeamRosterSnapshot(date, [player]);
            this.teamRosterSnapshotList = newRosterSnaphsot;
            this.latestTeamRoster = newRosterSnaphsot;
            return;
        }

        const latestRoster = this.latestTeamRoster;
        console.assert(
            date.getTime() > latestRoster.getTime(),
            "Date is not newer than the latest snapshot"
        );
        let teamRoster = [...latestRoster.players];
        teamRoster.push(player);
        const newRoster = new TeamRosterSnapshot(date, teamRoster);
        latestRoster.nextRoster = newRoster;
    }

    removePlayer(player, date) {
        const latestRoster = this.latestTeamRoster;
        if (latestRoster == null) throw new Error("Team Roster is empty");
        if (latestRoster.date.getTime() > date.getTime())
            throw new Error("Date is not newer than latest Team Roster");

        const playerIndex = latestRoster.players.findIndex(
            (p) => p.id == player.id
        );
        let newRosterPlayers = [...latestRoster.players];
        newRosterPlayers.splice(playerIndex, 1);
        const newRoster = new TeamRosterSnapshot(date, newRosterPlayers);
        latestRoster.nextRoster = newRoster;
    }
}
