export interface ITodoCreate {
    part: string,
    subject: string,
    dateFrom: Date,
    dateTo: Date,
    additionalInfo?: string,
    otherMembers?: Array<OtherPerson>;
}

export interface OtherPerson {
    email: string;
}