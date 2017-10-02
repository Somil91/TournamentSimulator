
// class TournamentTriggerElement{
//     constructor(elementId) {
//         this.elementRef = document.getElementById(elementId);
//         this.elementRef.addEventListener('click', (e) => { this.onClick(); });
//     }


//     onClick() {

//         //2. reset the error messages
//         // let messageService = new MessageService('details-form-error');
//         // messageService.renderMsg(false);

//         //2. Remove all the previous elements
//         // let roundsContainer = document.getElementById('rounds-container');
//         // if(roundsContainer.hasChildNodes()){
//         //     while (roundsContainer.firstChild) {
//         //         roundsContainer.removeChild(roundsContainer.firstChild);
//         //     }
//         // }



//         // 1. Call the backend to fetch result of Tournament 
//         let noOfteams = document.getElementById('numberOfTeams').value;
//         let teamsPerMatch = document.getElementById('teamsPerMatch').value;

//         const tournament = new Tournament();
//         tournament.getTournamentRound(noOfteams,teamsPerMatch);

//         // if(noOfteams<2 || teamsPerMatch<2){
//         //     messageService.renderMsg(true, 'Minimum no of teams/teams per match cannot be less than 2');
//         // } else {
//         //     const tournament = new Tournament();
//         //     tournament.getTournamentRound(noOfteams,teamsPerMatch);
//         // }
//     }
// }