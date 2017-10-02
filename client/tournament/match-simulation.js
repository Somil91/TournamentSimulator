




class Match{

    constructor(tournamentId, round, match){
        this.tournamentId = tournamentId;
        this.round = round;
        this.teams = match.teamIds;
        this.allTeamDetails = [];
        this.match = match.match;
        this.endpointService = new EndpointService();
    }

    async triggerMatch(){
        const teams = this.teams;

        let fetchTeamsPromises = [];
        teams.forEach((teamId) => {
            let team = new Team(teamId, this.tournamentId);
            fetchTeamsPromises.push(team.fetchTeamDetails());
        });


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
            winnerTeams.sort((a,b) => a.teamId-b.teamId);
        }

        console.log("Winning Team =", winnerTeams[0]);

        this.setIndicatorLoading(this.round, this.match);
        return winnerTeams[0];

        //Perform Dom Manipulation here for indicator



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
        // console.log(this.response.score);
        // return this.teamDetails;

        return this.response.score;
        
    }

    async getWinnerScore(payload){
        this.response = await this.endpointService.getApiData('/winner', payload);
        return this.response.score;
        
    }

    setIndicatorLoading(roundNo, matchNo){
        let elementId = 'round_'+ roundNo;
        let containerElement = document.getElementById(elementId);
        let childElement = containerElement.children[matchNo];
        childElement.setAttribute('style', 'fill-opacity:1.0;');
    }

}