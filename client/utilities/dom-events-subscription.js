/**
 * This file registers all the global events triggered by the DOM elements
 */

/**
 * 
 */
class TournamentTriggerElement{
    constructor(elementId) {
        this.elementRef = document.getElementById(elementId);
        this.elementRef.addEventListener('click', (e) => { this.onClick(e); });
    }

    /**
     * 
     * @param {*} evt 
     */
    onClick() {
        console.info('StartDom', this);

        // 1. Call the backend to fetch result of Tournament 
        const ep = new Tournament();
        ep.getTournamentRound(9,3);



        const messageService = new MessageService('details-form-error', 'This is a test error message');
        // console.log("MS", messageService);
        messageService.renderMsg();
        messageService.toggleMsgVisibility(true);


        
    }
}