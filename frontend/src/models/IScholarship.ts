import {ScholarshipTypeInterface} from "./IScholarshipType"

export interface ScholarshipInterface {
    ID?: number
    Scholarship_Name: string
    Scholarship_Info: string
    Scholarship_Close: string

    ScholarshipTypeID?: ScholarshipTypeInterface,
}