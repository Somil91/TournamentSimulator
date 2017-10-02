/**
 * @class This show / hide success and error messages on the DOM.
 */
class MessageService {
    /**
     * @constructor to register an instance of the Message
     * @param {DOM element selector} selector 
     * @param {Message to be shown in the DOM} message 
     */
    constructor(selector, message=''){
        
        // this.msgColors = { success: '#25A25A', error: '#EE4054'};
        this.msgDisplayOptions = { show: 'flex', none: 'none'};

        this.elementRef = document.getElementById(selector);
        this.message = message;
    }

    /**
     * This renders the message and change visibility of existing DOM element.
     * @param {to enable/disable visibility of DOM element; boolean value} showHideFlag 
     */
    renderMsg(showHideFlag) {
        this.elementRef.innerHTML = this.message;
        this.elementRef.style.display = showHideFlag ? this.msgDisplayOptions.show : this.msgDisplayOptions.none;
    }
}