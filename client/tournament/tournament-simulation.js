

/**
 * Tournament Api's Calling
 */




class Tournament{
    constructor(){
        this.endpointService = new EndpointService();

    }

    async getTournamentRound(noOfTeams, teamsPerMatch) {
        const payload = {numberOfTeams: noOfTeams, teamsPerMatch: teamsPerMatch};

        try {
            this.tournamentInstance = await this.getInitialTournamentRound(payload);
                    if(this.tournamentInstance.tournamentId){
                        this.evaluateMatches(
                            this.tournamentInstance.tournamentId,
                            this.tournamentInstance.round,
                            this.tournamentInstance.matchUps,
                            teamsPerMatch
                        );
                    }
        } catch(err) {
            this.endpointService.logError(err);
        }

    }


   async getInitialTournamentRound(payload){
       try {
        let tournamentInstance = await this.endpointService.postApiData('/tournament', payload)
        tournamentInstance.round = 0;
        console.log("initial Tournament", tournamentInstance);
        return tournamentInstance;
       } catch(err) {
           this.endpointService.apiCallingError(err);
       }
}
    
    async evaluateMatches(tournamentId, currentRound, matchUps, teamsPerMatch){
        // const tournamentId = this.tournamentInstance.currentRound;
        // const allMatches = this.tournamentInstance.matchUps;
        // const tournamentId = this.tournamentInstance.tournamentId;

        // 1. Formulate the Dom 
        const roundObj = new RoundDomElement('rounds-container', matchUps.length, currentRound); 
        roundObj.drawMatchIndicator();

        // 2. Simulate the Match
        let fetchMatchPromises = [];
        matchUps.forEach((match) => {
            let currentMatch = new Match(tournamentId, currentRound, match);
            fetchMatchPromises.push(currentMatch.triggerMatch());
        });

        let winningTeams = await Promise.all(fetchMatchPromises);

        if(winningTeams.length === 1){
            console.log("Winner is ", winningTeams[0]);
            this.displayWinner(winningTeams[0]);
        } else {
            currentRound += 1;
            let nextRoundMatches = this.getTeamsForNextRound(winningTeams, teamsPerMatch);
            console.log("Next Round teams", nextRoundMatches, currentRound, teamsPerMatch);
            this.evaluateMatches(tournamentId, currentRound, nextRoundMatches, teamsPerMatch);
        } 
        // const match = new Match(tournamentId, currentRound, allMatches[0].teamIds, );
        // let winningTeam = match.triggerMatch();
        // console.log("Winner Here in tournament ", winningTeam);

    }

    getTeamsForNextRound(teams, teamsPerMatch){
        let matches = [];
        let matchNo = 0;
        while (teams.length>0){
            matches.push({
                match: matchNo,
                teamIds: teams.splice(0, teamsPerMatch).map((team)=> team.teamId)
            });
            matchNo += 1;
        }
        return matches;

    }

    displayWinner(team){
       let winnerElement = document.getElementById('winner');
       winnerElement.textContent = team.name + ' is the Winner.'; 
    }

}

