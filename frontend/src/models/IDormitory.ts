import { BranchInterface } from "./IBranch"
import { DormitoryTypeInterface } from "./IDormitoryType"
import { RoomTypeInterface } from "./IRoomType"
import { TrimesterInterface } from "./ITrimester"
import { AdminInterface } from './IAdmin'

export interface DormitoryInterface {
    ID: number,
    Dormitory_Student_Number: string, 
	Dormitory_AcademicYear:   number,
	Room_Number:              number,

	TrimesterID:     number,
	DormitoryTypeID: number,
	RoomTypeID:      number,
	BranchID:        number,
	AdminID?: number

	Trimester:     TrimesterInterface,
	DormitoryType: DormitoryTypeInterface,
	RoomType:      RoomTypeInterface,
	Branch:        BranchInterface,
	Admin: AdminInterface,
}