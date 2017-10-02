/** 
 * @class Match
 * This class holds an instace of a Match.
 * It registers the 'teams' and get the team Info required for the tournament progres.
 */
class Match{
    /**
     * @constructor receives the data required for a match from the Tournament which register 'Match' class instance.
     * @param {tournamentId from the current Tournament} tournamentId 
     * @param {current round in progress} round 
     * @param {current match number} match 
     */
    constructor(tournamentId, round, match){
        this.tournamentId = tournamentId;
        this.round = round;
        this.teams = match.teamIds;
        this.allTeamDetails = [];
        this.match = match.match;
        this.endpointService = new EndpointService();
    }

    /**
     * This trigger a match , fetches the team details, evaluates match score and return the winning team
     */
    async triggerMatch(){
        const teams = this.teams;

        let fetchTeamsPromises = [];
        teams.forEach((teamId) => {
            let team = new Team(teamId, this.tournamentId);
            fetchTeamsPromises.push(team.fetchTeamDetails());
        });

        // 1. Get individual Team info.
        let teamsInfo = await Promise.all(fetchTeamsPromises);
        console.log("RS", teamsInfo);

        // 2. get winning Match Score 
        let payload = { tournamentId: this.tournamentId , round: this.round, match: this.match};
        let matchScore = await this.getMatchScore(payload);


        // 3. Get the Winning Score
        let teamScores = teamsInfo.map( (team) => {
            return team.score;
        });

        let winnerPayload = {tournamentId: this.tournamentId, teamScores: teamScores, matchScore: matchScore};
        let winningScore = await this.getWinnerScore(winnerPayload);

        //4. Find the teams which has the Winning Score
        let winnerTeams = teamsInfo.filter((team) => {
            return ( winningScore === team.score );
        });

        //5. If WinnerTeams more than one , with lowest teamId wins.
        if(winnerTeams.length>1){
            winnerTeams.sort((a,b) => a.teamId-b.teamId);
        }

        //6. Set the progress of the match in the DOM.
        this.setIndicatorLoading(this.round, this.match);
        return winnerTeams[0];
    }

    /**
     * This creates an instance of Team ; fetch it's details and add it to Match instance.
     * @param {*} teamId 
     */
    async getTeamInfo(teamId){
        const team = new Team(teamId, this.tournamentId);
        let teamInfo = await team.fetchTeamDetails();
        this.allTeamDetails.push(teamInfo);
        return teamInfo;
    }

    /**
     * This makes an Api call to get the Match Score
     * @param {required current tournamentId, roundId, and matchId} payload 
     */
    async getMatchScore(payload){
        this.response = await this.endpointService.getApiData('/match', payload);
        return this.response.score;   
    }

    /**
     * This makes an Api with all the team scores and match score to send back winning score.
     * @param {required all team score, tournamentId , and matchId} payload 
     */
    async getWinnerScore(payload){
        this.response = await this.endpointService.getApiData('/winner', payload);
        return this.response.score;
        
    }

    /**
     * This takes care of setting the loading indicator in the UI for the appropriate round
     * @param {round for which match is in progress} roundNo 
     * @param {match for which the progress is to be shown} matchNo 
     */
    setIndicatorLoading(roundNo, matchNo){
        let elementId = 'round_'+ roundNo;
        let containerElement = document.getElementById(elementId);
        let childElement = containerElement.children[matchNo];
        childElement.setAttribute('style', 'fill-opacity:1.0;');
    }

}