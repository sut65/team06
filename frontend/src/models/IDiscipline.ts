import { AdminInterface } from "./IAdmin";
import { StudentInterface } from "./IStudent";

export interface DisciplineInterface {
    ID: number;
    AdminID: number;
    Admin: AdminInterface;
    StudentID: number;
    Student: StudentInterface;
    DisciplineTypeID: number;
    DisciplineType: DisciplineTypeInterface;
    Discipline_Reason: string;
    Discipline_Punishment: string;
    Discipline_Point: number;
    Added_Time: Date;
}

export interface DisciplineTypeInterface {
    ID: number;
    DisciplineType_Name: string;
}