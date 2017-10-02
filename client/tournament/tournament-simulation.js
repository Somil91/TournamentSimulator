

/**
 * Tournament Api's Calling
 */




class Tournament{
    constructor(){
        this.endpointService = new EndpointService();

    }

    getTournamentRound(noOfTeams, teamsPerMatch) {
        const params = {numberOfTeams: noOfTeams, teamsPerMatch: teamsPerMatch};
       const getTournamentMatches = async () => {

           this.tournamentInstance = await this.endpointService.postApiData('/tournament', params);
           this.tournamentInstance.currentRound = 0;
           console.log(this.tournamentInstance);

            // Now call to form the DOM for rounds
           this.evaluateMatches();

           return this.tournamentInstance;

          
            // this.evaluateMatches();
        };
        
        getTournamentMatches();
    }

    evaluateMatches(){

        const currentRound = this.tournamentInstance.currentRound;
        const allMatches = this.tournamentInstance.matchUps;
        const tournamentId = this.tournamentInstance.tournamentId;


        // 1. Formulate the Dom 
        const roundObj = new RoundDomElement('rounds-container', allMatches.length, currentRound); 
        roundObj.drawMatchIndicator();

        // 2. Send the data
        const match = new Match(tournamentId, currentRound, allMatches[0].teamIds, 0);
        let winningTeam = match.triggerMatch();
        console.log("Winner Here in tournament ", winningTeam);




        // this.tournamentInstance.matchUps.forEach(function(match) {

        //     //1. Get the team data 

        //     //
            
        // }, this);
    }


    getTeamDetails() {

    }

    getMatchScore() {

    }

    getWinner(){

    }

}

