




class Match{

    constructor(tournamentId, round, teams, match){
        this.tournamentId = tournamentId;
        this.round = round;
        this.teams = teams;
        this.allTeamDetails = [];
        this.match = match;
        this.endpointService = new EndpointService();
    }

    async triggerMatch(){
        const teams = this.teams;

        let fetchTeamsPromises = [];
        teams.forEach((teamId) => {
            let team = new Team(teamId, this.tournamentId);
            fetchTeamsPromises.push(team.fetchTeamDetails());
        });

        // console.log("Pr array", fetchTeamsPromises);
        let teamsInfo = await Promise.all(fetchTeamsPromises);
        console.log("RS", teamsInfo);

        // 2. get Match Score 
        let payload = { tournamentId: this.tournamentId , round: this.round, match: this.match};
        let matchScore = await this.getMatchScore(payload);


        // 3. Get the Winner 
        let teamScores = teamsInfo.map( (team) => {
            return team.score;
        });

        let winnerPayload = {tournamentId: this.tournamentId, teamScores: teamScores, matchScore: matchScore};
        let winningScore = await this.getWinnerScore(winnerPayload);

        //4. Find the Winner 
        let winnerTeams = teamsInfo.filter((team) => {
            return ( winningScore === team.score );
        });

        if(winnerTeams.length>1){
            winnerTeams.sort((a,b) => a.id-b.id);
        }

        console.log("Winning Team =", winnerTeams[0]);
        return winnerTeams[0];
    }



    async getTeamInfo(teamId){
        const team = new Team(teamId, this.tournamentId);
        let teamInfo = await team.fetchTeamDetails();
        // console.log("Team Info here:", teamInfo);
        this.allTeamDetails.push(teamInfo);
        return teamInfo;
    }


    async getMatchScore(payload){
        this.response = await this.endpointService.getApiData('/match', payload);
        console.log(this.response.score);
        // return this.teamDetails;

        return this.response.score;
        
    }

    async getWinnerScore(payload){
        this.response = await this.endpointService.getApiData('/winner', payload);
        console.log(this.response.score);
        // return this.teamDetails;

        return this.response.score;
        
    }

    // getTeamInfo(teamId, tournamentId){
    //     const team = new Team(teamId, tournamentId);

    //     const getTeamInfo = async() => {
    //         let teamInfo = await team.fetchTeamDetails();
    //         this.allTeamDetails.push(teamInfo)
    //         return teamInfo;
    //     }
    //     // const teamInfo = team.fetchTeamDetails();
    //     // return teamInfo;

    //     // return (getTeamInfo();
    // }
    

}