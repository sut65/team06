import { GenderInterface } from './IGender'
import { DegreeInterface } from './IDegree'
import { PrefixInterface } from './IPrefix'
import { InstituteInterface } from './IInstitute'
import { ProvinceInterface } from './IProvince'
import { BranchInterface } from './IBranch'
import { CourseInterface } from './ICourse'
import { AdminInterface } from './IAdmin'

export interface StudentInterface {
    ID?: number
    Student_Year_Of_Entry?: Date | null,
    Student_Number: string,
    Student_Name: string,
    Student_Birthday?: Date | null,
    Student_Tel: string,
    Student_Identity_Card: string,
    Student_Nationality: string,
    Student_Religion: string,
    Student_Address: string,
    Student_Fathers_Name: string,
    Student_Mothers_Name: string,

    GenderID?: number
    DegreeID?: number
    PrefixID?: number
    InstituteID?: number
    ProvinceID?: number
    BranchID?: number
    CourseID?: number
    AdminID?: number

    Gender: GenderInterface,
    Degree: DegreeInterface,
    Prefix: PrefixInterface,
    Institute: InstituteInterface,
    Province: ProvinceInterface,
    Branch: BranchInterface,
    Course: CourseInterface,
    Admin: AdminInterface,
}