interface ApplicationDetails {
    reasonForApplication: string;
    sesReferral?: string; //Child Reference to Special Education Services
    previousSchool?: string;
    previousYearLevel?: number; // Year level at previous school
    learningSupport?: string;
    esol: boolean; // English as second language
    learningDifficulties: string;
    learningDisabilities: string;
    behaviourDifficulties: string;
    allergies: string;
    medicalConditions: string;
    medication: string;
    custodialAccess: string;
    disciplinaryHistory: string;
    dayTripPerms: boolean;

}

export default ApplicationDetails