import { InstituteInterface } from './IInstitute'
import {BranchInterface } from './IBranch'
import {AdminInterface } from './IAdmin'

export interface GradeInterface {
    ID?: number
    Grade_Student_Number: string,
    Grade_GPA: number,
    Grade_Supject: string,
    Grade_Code_Supject: string,
    Grade: string,

    InstituteID?: number
    BranchID?: number
    AdminID?: number


    Institute: InstituteInterface,
    Branch: BranchInterface,
    Admin: AdminInterface,
    
}