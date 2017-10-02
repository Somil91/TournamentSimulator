

/**
 * Tournament Endpoint Api's Calling
 */




class TournamentEndpointService{
    constructor(){

    }

    getTournamentRound(noOfTeams, teamsPerMatch) {
        const params = {numberOfTeams: noOfTeams, teamsPerMatch: teamsPerMatch};

        console.log('hehe',this.postApiData('/tournament', params));
    }


    getTeamDetails() {

    }

    getMatchScore() {

    }

    getWinner(){

    }
    

