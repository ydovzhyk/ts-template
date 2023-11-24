export interface ITodoCreate {
    _id?: string,
    part: any,
    subject: string,
    dateFrom: string,
    dateTo: string,
    additionalInfo?: string | '',
    otherMembers?: string | '',
    saveAfterDeadline: boolean,
}

export interface ITodoServer {
    _id: string,
    userId: string,
    part: string,
    subject: string,
    dateFrom: string,
    dateTo: string,
    additionalInfo: string,
    otherMembers: string,
    saveAfterDeadline: boolean,
}

export interface OtherPerson {
    email: string;
}

export interface ITodoSearch {
    searchByPart?: any,
    searchByPhrase?: string,
    searchByDate?: string,
    searchByStatus?: any,
    searchByOtherMembers?: string,
}