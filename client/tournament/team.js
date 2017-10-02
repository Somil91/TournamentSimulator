


class Team{
    constructor(teamId, tournamentId){
        this.tournamentId = tournamentId;
        this.teamId = teamId;
        this.teamDetails = null;


        this.endpointService = new EndpointService();
    }

    fetchTeamDetails(){
        const payload = { tournamentId: this.tournamentId, teamId: this.teamId };
        console.log("Team Payload", payload);
        const fetchDetails = async () => {
            this.teamDetails = await this.endpointService.getApiData('/team', payload,  "force-cache");
            console.log(this.teamDetails);
            return this.teamDetails;
        };
        
        fetchDetails();
    }
}