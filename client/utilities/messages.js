/**
 * This contains class to show / hide success and error messages
 */


class MessageService {

    constructor(selector, message){
        
        // this.msgColors = { success: '#25A25A', error: '#EE4054'};
        this.msgDisplayOptions = { show: 'flex', none: 'none'};

        this.elementRef = document.getElementById(selector);
        this.message = message;
    }

    renderMsg() {
        this.elementRef.innerHTML = this.message;
        // this.elementRef.style.color = (this.msgType ==='success') ? this.msgColors.success : this.msgColors.error;
        // this.elementRef.style.display = this.showHideFlag ? this.msgDisplayOptions.show : this.msgDisplayOptions.none;
    }

    toggleMsgVisibility(showHideFlag) {
        this.elementRef.style.display = showHideFlag ? this.msgDisplayOptions.show : this.msgDisplayOptions.none;
    }
}