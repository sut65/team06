import { InstituteInterface } from './IInstitute'
import {BranchInterface } from './IBranch'
import {AdminInterface } from './IAdmin'
import { StudentInterface } from './IStudent'

export interface GradeInterface {
    ID?: number
    Grade_Student_Number: string,
    Grade_GPA?: number,
    Grade_Supject?: string,
    Grade_Code_Supject?: string,
    Grade?: string,

    InstituteID?: number
    BranchID?: number
    AdminID?: number
    StudentID?: number

    Student?:StudentInterface,
    Institute?: InstituteInterface,
    Branch?: BranchInterface,
    Admin?: AdminInterface,
    
}