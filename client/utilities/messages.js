/**
 * This contains class to show / hide success and error messages
 */


class MessageService {

    constructor(selector, message=''){
        
        // this.msgColors = { success: '#25A25A', error: '#EE4054'};
        this.msgDisplayOptions = { show: 'flex', none: 'none'};

        this.elementRef = document.getElementById(selector);
        this.message = message;
    }

    renderMsg(showHideFlag) {
        this.elementRef.innerHTML = this.message;
        this.elementRef.style.display = showHideFlag ? this.msgDisplayOptions.show : this.msgDisplayOptions.none;
    }
}