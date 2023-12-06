import { ITodoSearch } from "../types/todo/todo"

export const buildURL = (searchData: ITodoSearch, searchPage?: number, weekPage?: number) => { 
    const urlParams = new URLSearchParams();

    // urlParams.set('type', 'search');

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

// const decodedPart = decodeURIComponent('%D0%90%D0%B2%D1%82%D0%BE%D0%BC%D0%BE%D0%B1%D1%96%D0%BB%D1%8C');
// console.log(decodedPart); // Результат: "Автомобіль"