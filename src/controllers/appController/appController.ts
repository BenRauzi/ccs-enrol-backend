import * as express from 'express'
import * as dotenv from "dotenv"

import SqlService from '../../services/sqlService'
import { v4 as uuid } from 'uuid'
import Application from '../../models/Application'
import { checkToken } from '../../Helpers/jwtHelper'
import { combineArrays } from './appController.helper'

dotenv.config()
class AppController {
    public path = '/app';
    public router = express.Router();
    sql: SqlService;

    constructor(sqlService: SqlService) {
        this.sql = sqlService

        this.intializeRoutes()
    }

    public intializeRoutes(): void { 
        this.router.post(`${this.path}/create`, checkToken, this.createApp)
    }

    createApp = async (req: express.Request, res: express.Response): Promise<express.Response> => {

        const application: Application = req.body
        const userId = req.user.id

        const applicationId = uuid()

        // console.log(combineChildren(application.otherChildren))

        try {
            const { useOfInfo, displayOfWork, photoPublication, photoPublicationReason, confirmation } = application.privacy
            const insertApplication = await this.sql.query(`
            INSERT INTO applications (id, user_id, other_children, use_of_info, display_of_work, photo_publication, photo_publication_reason, confirmation)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                applicationId,
                userId,
                combineArrays(application.otherChildren),
                useOfInfo,
                displayOfWork, 
                photoPublication, 
                photoPublicationReason, 
                confirmation
            ])

            const child = application.child // Not destructuring due to potential clashes
            const insertChildren = await this.sql.query(`
                INSERT INTO children (id, last_name, first_name, pref_name, sex, date_of_birth, date_of_arrival, country_of_birth, ethnic_origins, iwi_affiliations, languages, first_language)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                applicationId,
                child.lastName,
                child.firstName,
                child.prefName,
                child.sex,
                child.dateOfBirth,
                child.dateofArrival,
                child.countryOfBirth,
                combineArrays(child.ethnicOrigins),
                combineArrays(child.iwiAffiliations),
                combineArrays(child.languages),
                child.firstLanguage
            ])

            const parents = application.parents

            for(const parent of parents) {
                await this.sql.query(`
                    INSERT INTO parents (id, name, relationship, country_of_birth, residential_address, postal_address, home_phone, cell_phone, work_phone, occupation, employer, contact_email, marital_status, application_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, [
                    uuid(), 
                    parent.name,
                    parent.relationshipToChild,
                    parent.countryOfBirth,
                    parent.residentialAddress,
                    parent.postalAddress,
                    parent.homePhone,
                    parent.cellPhone,
                    parent.workPhone,
                    parent.occupation,
                    parent.employer,
                    parent.contactEmail,
                    parent.maritalStatus,
                    applicationId
                ])
            }

            const caregiver = application.caregiver
            await this.sql.query(`INSERT INTO caregivers (id, name, address, phone) VALUES (?, ?, ?, ?)`, [
                applicationId,
                caregiver.name,
                caregiver.address,
                caregiver.phone
            ])

            const contacts = application.emergencyContacts
            for(const contact of contacts) {
                await this.sql.query(`INSERT INTO emergency_contacts (name, type, phone, application_id) VALUES (?, ?, ?, ?)`, [
                    contact.name,
                    contact.type,
                    contact.phone,
                    applicationId
                ])
            }

            const earlyChildhood = application.earlyChildhood
            await this.sql.query(`INSERT INTO ece_info (id, type, name, hours) VALUES (?, ?, ?, ?)`, [
                applicationId,
                earlyChildhood.location,
                earlyChildhood.names,
                earlyChildhood.hours
            ])

            const preferenceInfo = application.preference
            await this.sql.query(`INSERT INTO preference_info (id, family_belief, father_belief, mother_belief, caregiver_belief, child_belief, church_info) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                applicationId,
                preferenceInfo.familyBelief,
                preferenceInfo.fatherBelief,
                preferenceInfo.motherBelief,
                preferenceInfo.caregiverBelief,
                preferenceInfo.childBelief,
                preferenceInfo.churchInfo
            ])

            const details = application.details
            await this.sql.query(`INSERT INTO application_details (id, application_reason, ses_referral, previous_school, previous_year_level,
                learning_support, esol, learning_difficulties, learning_disabilities, behavioural_difficulties, allergies, medical_conditions, medication, custodial_access, 
                disciplinary_history, day_trip_perms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    applicationId,
                    details.reasonForApplication,
                    details.sesReferral,
                    details.previousSchool,
                    details.previousYearLevel,
                    details.learningSupport,
                    details.esol,
                    details.learningDifficulties,
                    details.learningDisabilities,
                    details.behaviourDifficulties,
                    details.allergies,
                    details.medicalConditions,
                    details.medication,
                    details.custodialAccess,
                    details.disciplinaryHistory,
                    details.dayTripPerms
                ])  
            return res.send(req.user)
        } catch(err) {
            console.log(err)
            return res.sendStatus(500)
        }
     
    }
}

export default AppController