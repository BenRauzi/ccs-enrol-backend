import ApplicationDetails from "./ApplicationDetails"
import Caregiver from "./Caregiver"
import Child from "./Child"
import Documents from "./Documents"
import EmergencyContact from "./EmergencyContact"
import Parent from "./Parent"
import PrivacyConfirmation from "./PrivacyConfirmation"

interface Application {
    id: string;
    userid: string;
    child: Child;
    parents: Array<Parent>;
    caregiver: Caregiver;
    emergencyContacts: Array<EmergencyContact>;
    otherChildren: Array<string>;
    details: ApplicationDetails;
    privacy: PrivacyConfirmation;
    declaration: boolean;
    declarationName: string;
    declarationDate: Date;
    documents: Documents;
    status: number;
}

export default Application