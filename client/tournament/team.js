


class Team{
    constructor(teamId, tournamentId){
        this.tournamentId = tournamentId;
        this.teamId = teamId;
        this.teamDetails = null;


        this.endpointService = new EndpointService();
    }

    async fetchTeamDetails(){
        const payload = { tournamentId: this.tournamentId, teamId: this.teamId };
        console.log("Team Payload", payload);
        this.teamDetails = await this.endpointService.getApiData('/team', payload,  "force-cache");
        console.log(this.teamDetails);
        // return this.teamDetails;

        return this.teamDetails;
        
        // let teamDetails = fetchDetails();
        // return teamDetails;
    }
}