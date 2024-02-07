export let trackData = JSON.parse(localStorage.getItem('trackData'))||{}

export function saveTrack(){
    localStorage.setItem('trackData', JSON.stringify(trackData));
}