import { StudentInterface } from "./IStudent";

export interface PetitionInterface {
    ID: number;
    StudentID: number;
    Student: StudentInterface;
    PetitionTypeID: number;
    PetitionType: PetitionTypeInterface;
    PetitionPeriodID: number;
    PetitionPeriod: PetitionPeriodInterface;
    Petition_Reason: string;
    Petition_Startdate: Date;
    Petition_Enddate: Date;
    Added_Time: Date;
}

export interface PetitionTypeInterface {
    ID: number;
    PetitionType_Name: string;
}

export interface PetitionPeriodInterface {
    ID: number;
    PetitionPeriod_Num: number;
}