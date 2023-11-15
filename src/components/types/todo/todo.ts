export interface ITodoCreate {
    part: any,
    subject: string,
    dateFrom: Date,
    dateTo: Date,
    additionalInfo?: string,
    otherMembers?: string,
    saveAfterDeadline: boolean,
}

export interface OtherPerson {
    email: string;
}