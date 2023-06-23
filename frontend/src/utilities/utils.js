import { typeToColor } from './constants';

const buildColor = (type, isPrimary) => {
    var colorString = "rgba(";
    typeToColor[type].forEach(element => {
        colorString = colorString.concat(element + ' , ');
    });

    colorString = colorString.concat((isPrimary? '1' : '0.75') + ')');
    return colorString
}

function getDisplayName(name){
    const displayName = name.replace(/-/g, " ");
    const displayNameSplit = displayName.split(" ");

    for(var i = 0; i<displayNameSplit.length; i++){
        displayNameSplit[i] = displayNameSplit[i].charAt(0).toUpperCase() + displayNameSplit[i].slice(1);
    }

    return displayNameSplit.join(" ");
}

function getPercentage(value, totalValue){
    return (parseFloat(value)/parseFloat(totalValue))*100
}

export {buildColor, getDisplayName, getPercentage}