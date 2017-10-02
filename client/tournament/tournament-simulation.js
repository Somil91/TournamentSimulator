/** 
 * @class Tournament
 * This class holds an instace of the tournament in progress.
 * It registers the 'matches' and also 'indicator' denoting the progress of the match.
 */
class Tournament{
    /**
     * @constructor receives no of Teams and teamsPerMatch to trigger tournament for the same.
     * @param {No of teams input from the DOM} noOfTeams 
     * @param {Teams per Match input from the DOM} teamsPerMatch 
     */
    constructor(noOfTeams,teamsPerMatch){
        this.endpointService = new EndpointService();
        let tournamentInstance = this.runTournament(noOfTeams, teamsPerMatch);
    }

    /**
     * This : 1) Calls api to get initial round of tournament 2)trigger matches afterwards.
     * @param {No of teams for a tournament} noOfTeams 
     * @param {No of teams per match} teamsPerMatch 
     */
   async runTournament(noOfTeams, teamsPerMatch){
       try {
        let payload = {numberOfTeams: noOfTeams, teamsPerMatch: teamsPerMatch};
        this.tournamentInstance = await this.endpointService.postApiData('/tournament', payload);
        this.tournamentInstance.round = 0;
        this.evaluateMatches(this.tournamentInstance.tournamentId,this.tournamentInstance.round,this.tournamentInstance.matchUps,teamsPerMatch);
       } catch(err) {
           this.endpointService.apiCallingError(err);
       }
}
    /**
     * This evaluate matches for each round of the tournament.
     * @param {current tournamentId , constant for a tournament} tournamentId 
     * @param {current round, 0 for initial round} currentRound 
     * @param {total no of matchUps for the current match} matchUps 
     * @param {teams per match as passed from above, relevant to consecutive rounds} teamsPerMatch 
     */
    async evaluateMatches(tournamentId, currentRound, matchUps, teamsPerMatch){
        // 1. Formulate the DOM for round progress indicator
        const roundObj = new RoundDomElement('rounds-container', matchUps.length, currentRound); 
        roundObj.drawMatchIndicator();

        // 2. Simulate the Match
        let fetchMatchPromises = [];
        matchUps.forEach((match) => {
            let currentMatch = new Match(tournamentId, currentRound, match);
            fetchMatchPromises.push(currentMatch.triggerMatch());
        });

        let winningTeams = await Promise.all(fetchMatchPromises);

        // 3. If winning teams more than 1 i.e. take winners to the next round of the match else decalare winners
        if(winningTeams.length === 1){
            console.log("Winner is ", winningTeams[0]);
            this.displayWinner(winningTeams[0]);
        } else {
            currentRound += 1;
            let nextRoundMatches = this.getTeamsForNextRound(winningTeams, teamsPerMatch);
            console.log("Next Round teams", nextRoundMatches, currentRound, teamsPerMatch);
            this.evaluateMatches(tournamentId, currentRound, nextRoundMatches, teamsPerMatch);
        }

    }

    /**
     * This regroups the winning teams from a round for next round
     * @param {winning teams} teams 
     * @param {teams per match to divide teams accordingly} teamsPerMatch 
     */
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

    /**
     * This helper function is to print name of the winning team.
     * @param {winning Team object} team 
     */
    displayWinner(team){
       let winnerElement = document.getElementById('winner');
       winnerElement.textContent = team.name; 
    }

}

