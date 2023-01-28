import {InstituteInterface} from "./IInstitute"
import {StudentInterface} from "./IStudent"
import {BranchInterface} from "./IBranch"
import {ScholarshipTypeInterface} from "./IScholarshipType"
import {ScholarshipInterface} from "./IScholarship"

export interface ScholarshipApInterface {
    ID?: number
    ScholarshipTypeID?: number
    ScholarshipID: number
    InstituteID?: number
    BranchID?: number
    StudentID: number

    Student_Name?: string
    Identity_Card: string,
    Reasons: string,
    GPAX: string,

    ScholarshipType: ScholarshipTypeInterface,
    Scholarship: ScholarshipInterface,
    Institute: InstituteInterface,
    Branch: BranchInterface,
    Student: StudentInterface,

}
