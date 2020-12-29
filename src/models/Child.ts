interface Child {
    id?: string;
    lastName: string;
    firstName: string;
    prefName: string;
    sex: number,
    dateOfBirth: Date;
    countryOfBirth: string;
    dateofArrival?: Date;
    ethnicOrigins: Array<string>;
    iwiAffiliations: Array<string>;
    languages: Array<string>;
    firstLanguage: string;
}   

export default Child