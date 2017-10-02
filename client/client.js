/**
 * window.onLoad event to register click event for the #start button
 */
window.onload = () => {
    let elementRef = document.getElementById('start');
    elementRef.onclick = () => {

        //1. reset the error messages
        let messageService = new MessageService('details-form-error');
        messageService.renderMsg(false);

        //2. Remove all the previous loading indicators
        let roundsContainer = document.getElementById('rounds-container');
        if(roundsContainer.hasChildNodes()){
            while (roundsContainer.firstChild) {
                roundsContainer.removeChild(roundsContainer.firstChild);
            }
        }
        let noOfteams = document.getElementById('numberOfTeams').value;
        let teamsPerMatch = document.getElementById('teamsPerMatch').value;

        //3. Initialize the Tournamnet class with the required values.
        let currentTournament = new Tournament(noOfteams,teamsPerMatch);
    };
};