import { getChallengeStateColour } from "../../utils/util.mapbox";

let markerIconSize = 40

export const getMarkerIcon = (type: number | undefined, state: number | undefined): HTMLElement => {
    let element = document.createElement("div");
    element.innerHTML = getMarkerIconInner(type, state);
    return element;
}

export const getMarkerIconInner = (type: number | undefined, state: number | undefined): string => {
    switch(type){
        case 0:
            return quizIcon(markerIconSize, markerIconSize, getChallengeStateColour(state));
        case 1:
            return alarmIcon(markerIconSize, markerIconSize, getChallengeStateColour(state));
        case 2:
            return serverIcon(markerIconSize, markerIconSize, getChallengeStateColour(state));
        default:
            return "";
    }
}

export const serverIcon = (height: number, width: number, colour: string): string => {
    return `<svg style="height: ${height}px; width: ${width};" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 0h512v512H0z" fill="#000000" fill-opacity="0.02"></path><g class="" style="" transform="translate(0,0)"><path d="M41 25v78h430V25H41zm254 23h18v32h-18V48zm121 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zM64 55h48v18H64V55zm80 0h48v18h-48V55zm80 0h48v18h-48V55zm-119 66v30h302v-30H105zm-64 48v78h430v-78H41zm254 23h18v32h-18v-32zm121 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zm-352 7h48v18H64v-18zm80 0h48v18h-48v-18zm80 0h48v18h-48v-18zm-119 66v30h302v-30H105zm-64 48v78h430v-78H41zm254 23h18v32h-18v-32zm121 0a16 16 0 0 1 16 16 16 16 0 0 1-16 16 16 16 0 0 1-16-16 16 16 0 0 1 16-16zm-352 7h48v18H64v-18zm80 0h48v18h-48v-18zm80 0h48v18h-48v-18zm13 66v30h38v-30h-38zM25 457v30h130.2l20-30H25zm171.8 0l-20 30h158.4l-20-30H196.8zm140 0l20 30H487v-30H336.8z" fill=${colour} fill-opacity="1"></path></g></svg>`;
}

export const quizIcon = (height: number, width: number, colour: string): string => {
    return `<svg style="height: ${height}px; width: ${width};" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="" transform="translate(0,0)"><path d="M257.78 19.438c-127.92.016-231.75 103.855-231.75 231.78 0 55.734 19.71 106.776 52.532 146.72L57.75 434.094h132.406l-66.312-114.72-22.375 39c-20.9-30.478-33.064-67.442-33.064-107.155 0-104.523 84.854-189.376 189.375-189.376 104.523 0 189.408 84.853 189.408 189.375 0 39.108-11.68 75.664-32 105.874l-21.875-37.72L327 434.095h132.406l-21.594-37.47c32.225-39.78 51.75-90.253 51.75-145.405 0-127.927-103.827-231.766-231.75-231.782h-.03zm-.655 75.468c-49.528-.047-110.474 29.232-128.406 104.938l60.75 14.312c26.965-76.242 90.87-70.824 113.31-28.625 26.775 50.346-89.687 107.283-84.124 190.407h77.688c6.49-98.144 118.973-123.49 59.562-229.53C337.963 114.38 301 96.572 261.876 95.03V95c-1.573-.062-3.153-.092-4.75-.094zM258.5 395.97c-26.95 0-48.594 21.644-48.594 48.592 0 26.95 21.645 48.594 48.594 48.594 26.95 0 48.594-21.645 48.594-48.594 0-26.948-21.645-48.593-48.594-48.593z" fill=${colour} fill-opacity="1"></path></g></svg>`
}

export const alarmIcon = (height: number, width: number, colour: string): string => {
    return `<svg style="height: ${height}px; width: ${width};" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g class="" style="" transform="translate(0,0)"><path d="M157.705 400.355h193.09v17.53h-193.09v-17.53zm180.8-17.53h-165v-96.82a53.29 53.29 0 0 1 53.29-53.29h58.43a53.29 53.29 0 0 1 53.28 53.29v96.79zm-106.64-135.77h-10.44a37.83 37.83 0 0 0-37.83 37.83v77.22h48.27v-115zm-197 79.59h103.58v-17.53H34.875v17.53zm137.41-107.9l-73.22-73.23-12.4 12.4 73.23 73.23zm92.5-124.63h-17.54v103.57h17.53V94.115zm149 51.39l-73.23 73.23 12.4 12.4 73.23-73.23zm-40.18 163.6v17.53h103.54v-17.52h-103.57z" fill=${colour} fill-opacity="1"></path></g></svg>`
}