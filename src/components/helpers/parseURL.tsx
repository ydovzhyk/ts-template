import { ITodoSearch } from "../types/todo/todo"

export const parseURL = () => { 
    const urlParams = new URLSearchParams(window.location.search);

    const part = urlParams.get('part');
    const phrase = urlParams.get('phrase');
    const date = urlParams.get('date');
    const status = urlParams.get('status');
    const members = urlParams.get('members');
    const weekPage = urlParams.get('weekPage');
    const searchPage = urlParams.get('searchPage');

    const urlData: ITodoSearch = {
        searchByPart: part ? part : '',
        searchByPhrase: phrase ? phrase : '',
        searchByDate: date ? date : '',
        searchByStatus: status ? status : '',
        searchByOtherMembers: members ? members : ''
    }

    return { urlData, weekPage, searchPage };
}