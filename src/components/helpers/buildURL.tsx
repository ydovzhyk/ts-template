import { ITodoSearch } from "../types/todo/todo"

export const buildURL = (searchData: ITodoSearch, searchPage?: number, weekPage?: number) => { 
    const urlParams = new URLSearchParams();

    if (searchData.searchByPart) {
        urlParams.set('part', searchData.searchByPart);
    }

    if (searchData.searchByPhrase) {
        urlParams.set('phrase', searchData.searchByPhrase);
    }

    if (searchData.searchByDate) {
        urlParams.set('date', searchData.searchByDate);
    }

    if (searchData.searchByStatus) {
        urlParams.set('status', searchData.searchByStatus);
    }

    if (searchData.searchByOtherMembers) {
        urlParams.set('members', searchData.searchByOtherMembers);
    }

    if (searchPage && searchPage > 0) {
        urlParams.set('searchPage', String(searchPage));
    }
    if (weekPage && weekPage > 0) {
        urlParams.set('weekPage', String(weekPage));
    }

    const queryString = urlParams.toString();
    const finalURL = `/list?${queryString}`;

    return finalURL;
}