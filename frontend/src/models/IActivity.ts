import { ActivityTypeInterface } from './IActivityType'
import {TrimesterInterface } from './ITrimester'
import {AdminInterface } from './IAdmin'

export interface ActivityInterface {
    ID?: number
    Activity_Student_Number: string,
    Activity_Name: string,
    Location: string,
    Position: string,
    Activity_Date:  Date | null,
    Activity_Year: string,
    Hour: number, 

    ActivityTypeID?: number
    TrimesterID?: number
    AdminID?: number


    ActivityType: ActivityTypeInterface,
    Trimester: TrimesterInterface,
    Admin: AdminInterface,
}