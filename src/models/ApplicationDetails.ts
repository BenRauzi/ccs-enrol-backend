interface ApplicationDetails {
    id: string;
    reasonForApplication: string;
    sesReferral?: string; //Child Reference to Special Education Services
    previousSchool?: string;
    previousYearLevel?: string; // Year level at previous school
    previousSchoolReport?: string;
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
    dayTripPerms: string;

}

export default ApplicationDetails