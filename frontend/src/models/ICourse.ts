import { DegreeInterface } from './IDegree'
import { PrefixInterface } from './IPrefix'
import { InstituteInterface } from './IInstitute'
import { BranchInterface } from './IBranch'
import { AdminInterface } from './IAdmin'

export interface CourseInterface {
    ID?: number
    Course_Name: string,
    Course_Teacher: string,
    Course_Credit: number,
    Course_Detail: string,
    Course_Year: number,

    DegreeID?: number
    PrefixID?: number
    InstituteID?: number
    BranchID?: number
    AdminID?: number

    Degree: DegreeInterface,
    Prefix: PrefixInterface,
    Institute: InstituteInterface,
    Branch: BranchInterface,
    Admin: AdminInterface,
}