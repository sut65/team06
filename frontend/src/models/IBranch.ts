import { PrefixInterface } from './IPrefix'
import { InstituteInterface } from './IInstitute'
import { AdminInterface } from './IAdmin'

export interface BranchInterface {
    ID?: number
    Branch_Name: string,
    Branch_Teacher: string,
    Branch_Info: string,

    PrefixID?: number
    InstituteID?: number
    AdminID?: number

    Prefix: PrefixInterface,
    Institute: InstituteInterface,
    Admin: AdminInterface,
}