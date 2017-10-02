
window.onload = function() {
    // const startElement = new TournamentTriggerElement('start');

    let elementRef = document.getElementById('start');
    elementRef.onclick = function(){
        let noOfteams = document.getElementById('numberOfTeams').value;
        let teamsPerMatch = document.getElementById('teamsPerMatch').value;
    
        const tournament = new Tournament(noOfteams,teamsPerMatch);
        // tournament.getTournamentRound(noOfteams,teamsPerMatch);
    };

};