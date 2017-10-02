




class Match{

    constructor(tournamentId, round, teams){
        this.tournamentId = tournamentId;
        this.round = round;
        this.teams = teams;
    }

    triggerMatch(){
        const teams = this.teams;
       const teamsInfo = teams.map((teamId) => {
           return this.getTeamInfo(teamId, this.tournamentId)
        });
       console.log("teamsInfo", teamsInfo);
    }

    getTeamInfo(teamId, tournamentId){
        const team = new Team(teamId, tournamentId);
        const teamInfo = team.fetchTeamDetails();
        return teamInfo;
    }
    

}