import Application from "../../models/Application"

export const combineArrays = (array: Array<string>): string => {
    return array.join(', ')
}

export const splitToArrays = (string: string): Array<string> => {
    return string.split(', ')
}

export const toCamel = (string: string): string => {
    return string.split('_').map((x, id) => { //split based on lower_with_under
        if(id === 0) return x
        return x.charAt(0).toUpperCase() + x.slice(1) //make first char of words n > 1 uppercase
    }).join('')
}

export const propertiesToCamel = (object): any => {
   return Object.fromEntries(Object.entries(object).map(x => [
       toCamel(x[0]),
       x[1]
    ]))
}

export const reconstructApplication = (mainInfo, parentInfo, contactInfo): Application => {
    mainInfo = propertiesToCamel(mainInfo)
    const application: Application = {
        id: mainInfo.id,
        userid: mainInfo.userId,
        child: {
            lastName: mainInfo.lastName,
            firstName: mainInfo.firstName,
            prefName: mainInfo.prefName,
            sex: mainInfo.sex,
            dateOfBirth: mainInfo.dateOfBirth,
            countryOfBirth: mainInfo.countryOfBirth,
            dateofArrival: mainInfo.dateofArrival,
            ethnicOrigins: splitToArrays(mainInfo.ethnicOrigins),
            iwiAffiliations: splitToArrays(mainInfo.iwiAffiliations),
            languages: splitToArrays(mainInfo.languages),
            firstLanguage: mainInfo.firstLanguage
        },
        parents: parentInfo.map(x => propertiesToCamel(x)),
        caregiver: {
            name: mainInfo.caregiverName,
            address: mainInfo.caregiverAddress,
            phone: mainInfo.caregiverPhone,
        },
        emergencyContacts: contactInfo.map(x => propertiesToCamel(x)),
        otherChildren: splitToArrays(mainInfo.otherChildren),
        details: {
            reasonForApplication: mainInfo.reasonForApplication,
            sesReferral: mainInfo.sesReferral, 
            previousSchool: mainInfo.previousSchool,
            previousYearLevel: mainInfo.previousYearLevel,
            learningSupport: mainInfo.learningSupport,
            esol: !!mainInfo.esol, 
            learningDifficulties: mainInfo.learningDifficulties,
            learningDisabilities: mainInfo.learningDisabilities,
            behaviourDifficulties: mainInfo.behaviourDifficulties,
            allergies: mainInfo.allergies,
            medicalConditions: mainInfo.medicalConditions,
            medication: mainInfo.medication,
            custodialAccess: mainInfo.custodialAccess,
            disciplinaryHistory: mainInfo.disciplinaryHistory,
            dayTripPerms: !!mainInfo.dayTripPerms
        },
        preference: {
            familyBelief: mainInfo.familyBelief,
            fatherBelief: mainInfo.fatherBelief,
            motherBelief: mainInfo.motherBelief,
            caregiverBelief: mainInfo.caregiverBelief,
            childBelief: mainInfo.childBelief,
            churchInfo: mainInfo.churchInfo
        },
        earlyChildhood: {
            names: mainInfo.eceName,
            location: mainInfo.eceType,
            hours: mainInfo.eceHours
        },
        privacy: {
            useOfInfo: !!mainInfo.useOfInfo,
            displayOfWork: !!mainInfo.displayOfWork,
            photoPublication: !!mainInfo.photoPublication,
            photoPublicationReason: mainInfo.photoPublicationReason,
            confirmation: !!mainInfo.confirmation
        },

        declaration: mainInfo.declaration,
        declarationName: mainInfo.declarationName,
        declarationDate: mainInfo.declarationDate,
        documents: [], //Replace

        status: mainInfo.status
    }
    
    console.log(application)
    return application
}