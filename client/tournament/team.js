/**
 * @class Team
 * This class holds an instance of Team.
 * It makes an api call to fetch the details of Team.
 */
class Team{
    /**
     * @constructor receives teamId and tournamentId to get team info.
     * @param {*} teamId 
     * @param {*} tournamentId 
     */
    constructor(teamId, tournamentId){
        this.tournamentId = tournamentId;
        this.teamId = teamId;
        this.teamDetails = null;
        this.endpointService = new EndpointService();
    }

    /**
     * This makes an api call to fetch the name and score of the relevant teams.
     */
    async fetchTeamDetails(){
        const payload = { tournamentId: this.tournamentId, teamId: this.teamId };
        this.teamDetails = await this.endpointService.getApiData('/team', payload,  "force-cache");
        console.log(this.teamDetails);     
        return this.teamDetails;
    }
}