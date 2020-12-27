import ApplicationDetails from "./ApplicationDetails"
import Caregiver from "./Caregiver"
import Child from "./Child"
import Documents from "./Documents"
import EarlyChildhood from "./EarlyChildhood"
import EmergencyContact from "./EmergencyContact"
import Parent from "./Parent"
import PreferenceInfo from "./PreferenceInfo"
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
    preference: PreferenceInfo;
    earlyChildhood: EarlyChildhood;
    privacy: PrivacyConfirmation;
    declaration: boolean;
    declarationName: string;
    declarationDate: Date;
    documents: Documents;
    status: number;
}

export default Application