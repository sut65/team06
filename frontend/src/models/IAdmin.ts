import { PrefixInterface } from './IPrefix'
import { ProvinceInterface } from './IProvince'
import { GenderInterface } from './IGender'

export interface AdminInterface {
    ID?: number
    Admin_Name: string,
    Admin_Email: string,
    Admin_Password: string,
    Admin_Tel: string,
    Admin_Address: string,

    GenderID?: number
    PrefixID?: number
    ProvinceID?: number

    Gender: GenderInterface,
    Prefix: PrefixInterface,
    Province: ProvinceInterface,
}