import {InstituteInterface} from "./IInstitute"
import {PrefixInterface} from "./IPrefix"
import {AdminInterface} from "./IAdmin"

export interface BranchInterface {
    ID?: number
    AdminID?: number
    InstituteID?: number
    PrefixID?: number
    
    Branch_Name: string,
    Branch_Teacher: string,
    Branch_Info: string,

    Prefix: PrefixInterface,
    Institute: InstituteInterface,
    Admin: AdminInterface,
}
