import Application from "../models/Application"

const getApplication = (): Promise<Application> => {
    const application: Application =  {
        id: 'a7ea036b-9034-4551-b24f-bbca35c301e8',
        userid: 'bc2d7019-1da2-4b0c-b5b3-12ec221c0b39',
        child: {
          lastName: 'Last',
          firstName: 'First',
          prefName: 'Pref',
          sex: 0,
          dateOfBirth: new Date ('2020-12-27T11:19:27.000Z'),
          countryOfBirth: 'New Zealnd',
          dateofArrival: undefined,
          ethnicOrigins: [ '' ],
          iwiAffiliations: [ '' ],
          languages: [ 'English' ],
          firstLanguage: 'English'
        },
        parents: [
          {
            name: 'Parent Name 1',
            relationshipToChild: 'Father',
            countryOfBirth: 'New Zealand',
            residentialAddress: '100 Main Street, Kelvin Grove, Palmerston North',
            dateOfResidence: new Date ('2020-12-27T11:19:27.000Z'),
            postalAddress: '100 Main Street, Kelvin Grove, Palmerston North',
            homePhone: '000 000 0000',
            cellPhone: '000 000 0000',
            workPhone: '000 000 0000',
            occupation: 'Parent Occupation 1',
            employer: 'Parent Employer 1',
            contactEmail: 'parent1@mail-provider.com',
            maritalStatus: 1
          },
          {
            name: 'Parent Name 2',
            relationshipToChild: 'Mother',
            countryOfBirth: 'New Zealand',
            residentialAddress: '100 Main Street, Kelvin Grove, Palmerston North',
            dateOfResidence: new Date ('2020-12-27T11:19:27.000Z'),
            postalAddress: '100 Main Street, Kelvin Grove, Palmerston North',
            homePhone: '000 000 0000',
            cellPhone: '000 000 0000',
            workPhone: '000 000 0000',
            occupation: 'Parent Occupation 2',
            employer: 'Parent Employer 2',
            contactEmail: 'parent2@mail-provider.com',
            maritalStatus: 1
          }
        ],
        caregiver: {
          name: 'Caregiver 1',
          address: '100 Main Street, Kelvin Grove, Palmerston North',
          phone: '000 000 0000'
        },
        emergencyContacts: [
          { name: 'Emergency Contact', type: 0, phone: '000 000 0000' },
          { name: 'Church Contact', type: 1, phone: '000 000 0000' },
          { name: 'Doctor Contact', type: 2, phone: '000 000 0000' }
        ],
        otherChildren: [ 'test', 'test2' ],
        details: {
          reasonForApplication: undefined,
          sesReferral: 'No',
          previousSchool: 'None',
          previousYearLevel: 13,
          learningSupport: 'None',
          esol: false,
          learningDifficulties: 'None',
          learningDisabilities: 'None',
          behaviourDifficulties: undefined,
          allergies: 'None',
          medicalConditions: 'None',
          medication: 'None',
          custodialAccess: 'None',
          disciplinaryHistory: 'None',
          dayTripPerms: false
        },
        preference: {
          familyBelief: 0,
          fatherBelief: 0,
          motherBelief: 0,
          caregiverBelief: 0,
          childBelief: 0,
          churchInfo: 'Church Name'
        },
        earlyChildhood: { names: 'ECE 1, ECE 2', location: 0, hours: 10 },
        privacy: {
          useOfInfo: true,
          displayOfWork: true,
          photoPublication: true,
          photoPublicationReason: 'asd',
          confirmation: true
        },
        declaration: undefined,
        declarationName: undefined,
        declarationDate: undefined,
        documents: [],
        status: undefined
    }
    return Promise.resolve(application)
}

export default getApplication