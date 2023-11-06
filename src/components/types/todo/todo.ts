export interface ITodoCreate {
    part: string,
    subject: string,
    dateFrom: Date,
    dateTo: Date,
    additionalInfo?: string,
    otherMembers?: Array<OtherPerson>,
    saveAfterDeadline: boolean,
}

export interface OtherPerson {
    email: string;
}