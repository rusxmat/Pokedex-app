import { typeToColor } from './constants';

const buildColor = (type, isPrimary) => {
    var colorString = "rgba(";
    typeToColor[type].forEach(element => {
        colorString = colorString.concat(element + ' , ');
    });

    colorString = colorString.concat((isPrimary? '1' : '0.75') + ')');
    return colorString
}

export {buildColor}