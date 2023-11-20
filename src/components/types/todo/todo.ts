export interface ITodoCreate {
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