




class RoundDomElement {
    constructor(roundElementId, matchesCount, roundNumber) {
        this.roundsElementRef = document.getElementById(roundElementId);
        // drawMatchIndicator();
        this.matchesCount = matchesCount;
        this.roundNumber = roundNumber;
    }


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


    getMatchIndicatorElement(){
        let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("class", "match-indicator");
        svgElement.setAttribute("width", "10");
        svgElement.setAttribute("height", "10");
        // svgElement.setAttribute("style", "border: 1px solid black; fill-opacity:0; margin-right:5px;");

        let rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rectElement.setAttribute("fill", "#000");
        rectElement.setAttribute("width", "10");
        rectElement.setAttribute("height", "10");
        svgElement.appendChild(rectElement);

        let indicatorElement = svgElement.cloneNode(true);
        return indicatorElement;
    }

    getRoundSeperatorElement(){
        let dividerSpace = document.createElement("span");
        dividerSpace.innerHTML += '&emsp;';
        // dividerSpace.textContent = "&emsp;";
        // let textnode = document.createTextNode("&emsp;");
        // dividerSpace.appendChild(textnode);

        let spaceElement = dividerSpace.cloneNode(true);
        return spaceElement;
    }

    getRoundContainerElement(roundNumber){
        let roundContainerElement = document.createElement("span");
        let id = "round_"+roundNumber;
        roundContainerElement.setAttribute('id', id);
        let roundElement = roundContainerElement.cloneNode(true);
        return roundElement;
    }
}