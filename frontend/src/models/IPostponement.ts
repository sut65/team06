import { PrefixInterface } from './IPrefix'
import { DegreeInterface } from './IDegree'
import { TrimesterInterface } from './ITrimester'
import { InstituteInterface } from './IInstitute'
import { BranchInterface } from './IBranch'
import { StudentInterface } from './IStudent'

export interface PostponementInterface {
    ID?: number
    Postponement_Student_Number?: string,
    Postponement_Student_Name?:   string,
    Postponement_AcademicYear?:   string,
    Postponement_Gpax?:           string,
	Postponement_Credit?:         string,
	Postponement_Date?:           Date | null,
	Postponement_Reasons?:        string,
    
    PrefixID?:     number,
    DegreeID?:     number,
    TrimesterID?:  number,
    InstituteID?:  number,
    BranchID?:     number,
    StudentID?:    number,

    Prefix?:     PrefixInterface,
    Degree?:     DegreeInterface,
    Trimester?:  TrimesterInterface,
    Institute?:  InstituteInterface,
    Branch?:     BranchInterface,
    Student?:    StudentInterface,
}