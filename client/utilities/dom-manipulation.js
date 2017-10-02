/**
 * @class Utility Class 
 * This takes care of creating an instance of the round progress in the DOM.
 */
class RoundDomElement {
    /**
     * @constructor get DOM refernce and registers the progress indicator
     * @param {dom element id to append to} roundElementId 
     * @param {total matches count for a round} matchesCount 
     * @param {current round of the tournamentrnt } roundNumber 
     */
    constructor(roundElementId, matchesCount, roundNumber) {
        this.roundsElementRef = document.getElementById(roundElementId);
        this.matchesCount = matchesCount;
        this.roundNumber = roundNumber;
    }

    /**
     * This create the element required for the progress indicator.
     */
    drawMatchIndicator(){
        let roundContainerElement = this.getRoundContainerElement(this.roundNumber);  
        let docFragment =  document.createDocumentFragment();

        for(let i =0 ;i<this.matchesCount;i++){
            const ele = this.getMatchIndicatorElement();
            docFragment.appendChild(ele);
        }

        roundContainerElement.append(docFragment);
        this.roundsElementRef.append(roundContainerElement);
        this.roundsElementRef.append(this.getRoundSeperatorElement());
    }

    /**
     * This create a dummy element that later gets appended to the DOM.
     */
    getMatchIndicatorElement(){
        let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("class", "match-indicator");
        svgElement.setAttribute("width", "10");
        svgElement.setAttribute("height", "10");

        let rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectElement.setAttribute("fill", "#000");
        rectElement.setAttribute("width", "10");
        rectElement.setAttribute("height", "10");
        svgElement.appendChild(rectElement);

        let indicatorElement = svgElement.cloneNode(true);
        return indicatorElement;
    }

    /**
     * This creates seperator element to distinguish between the rounds.
     */
    getRoundSeperatorElement(){
        let dividerSpace = document.createElement("span");
        dividerSpace.innerHTML += '&emsp;';
        let spaceElement = dividerSpace.cloneNode(true);
        return spaceElement;
    }

    /**
     * This returns the reference of the progress indicator container for the current round.
     * @param {current tournament round} roundNumber 
     */
    getRoundContainerElement(roundNumber){
        let roundContainerElement = document.createElement("span");
        let id = "round_"+roundNumber;
        roundContainerElement.setAttribute('id', id);
        let roundElement = roundContainerElement.cloneNode(true);
        return roundElement;
    }
}