import Application from "../models/Application"

const getApplication = (): Promise<Application> => {
    const application: Application = {
        id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
        userid: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
        child: {
            id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
            lastName: "Last",
            firstName: "First",
            prefName: "First",
            sex: 0,
            dateOfBirth: new Date(),
            countryOfBirth: "New Zealnd",
            dateofArrival: new Date(),
            ethnicOrigins: [],
            iwiAffiliations: [],
            languages: [
                "English"
            ],
            firstLanguage: "English"
        },
        parents: [
            {
                id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
                name: "Parent Name 1",
                relationshipToChild: "Father",
                countryOfBirth: "New Zealand",
                residentialAddress: "100 Main Street, Kelvin Grove, Palmerston North",
                postalAddress: "100 Main Street, Kelvin Grove, Palmerston North",
                dateOfResidence: new Date(),
                homePhone: "000 000 0000",
                cellPhone: "000 000 0000",
                occupation: "Parent Occupation 1",
                employer: "Parent Employer 1",
                workPhone: "000 000 0000",
                contactEmail: "parent1@mail-provider.com",
                maritalStatus: 1,
                applicationId: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3"

            },
            {
                id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
                name: "Parent Name 2",
                relationshipToChild: "Mother",
                countryOfBirth: "New Zealand",
                residentialAddress: "100 Main Street, Kelvin Grove, Palmerston North",
                postalAddress: "100 Main Street, Kelvin Grove, Palmerston North",
                dateOfResidence: new Date(),
                homePhone: "000 000 0000",
                cellPhone: "000 000 0000",
                occupation: "Parent Occupation 2",
                employer: "Parent Employer 2",
                workPhone: "000 000 0000",
                contactEmail: "parent2@mail-provider.com",
                maritalStatus: 1,
                applicationId: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3"
            }
        ],
        caregiver: {
            id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
            name: "Caregiver 1",
            address: "100 Main Street, Kelvin Grove, Palmerston North",
            phone: "000 000 0000"
        },
        emergencyContacts: [
            {
                id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
                type: 0,
                name: "Emergency Contact",
                phone: "000 000 0000"
            },
            {
                id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
                type: 1,
                name: "Church Contact",
                phone: "000 000 0000"
            },
            {
                id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
                type: 2,
                name: "Doctor Contact",
                phone: "000 000 0000"
            }
        ],
        otherChildren: [
            "test"
        ],
        details: {
            id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
            reasonForApplication: "Application Reason",
            sesReferral: "No",
            previousSchool: "None",
            learningSupport: "None",
            esol: false,
            learningDifficulties: "None",
            learningDisabilities: "None",
            behaviourDifficulties: "None",
            allergies: "None",
            medicalConditions: "None",
            medication: "None",
            custodialAccess: "None",
            disciplinaryHistory: "None",
            dayTripPerms: "None"
        },
        preference: {
            id: "fb9985e2-88e0-4dbb-b34e-d6f35ee3a4b3",
            familyBelief: 0,
            fatherBelief: 0,
            motherBelief: 0,
            caregiverBelief: 0,
            childBelief: 0,
            churchInfo: "Church Name"
        },
        earlyChildhood: {
            names: "ECE 1, ECE 2",
            hours: 10,
            location: "PN"
        },
        privacy: {
            useOfInfo: true,
            displayOfWork: true,
            photoPublication: true,
            confirmation: true,
        },
        declaration: true,
        declarationName: "Test Parent",
        declarationDate: new Date(),
        documents: {},
        status: 0
    }
    return Promise.resolve(application)
}

export default getApplication