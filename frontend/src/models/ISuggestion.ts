import { PrefixInterface } from "./IPrefix"
import { InstituteInterface } from "./IInstitute"
import { BranchInterface } from "./IBranch"
import { StudentInterface } from "./IStudent";

export interface SuggestionInterface {
    ID: number,
    Suggestion_Teacher:        string,
	Suggestion_Student_Number: string,
	Suggestion_Student_Name:   string,
	Suggestion_Date:           Date | null,
	Suggestion_Detail:         string,

	PrefixID?:    number,
	InstituteID?: number,
	BranchID?:    number,
	StudentID?:	number,

	Prefix:    PrefixInterface,
	Institute: InstituteInterface,
	Branch:    BranchInterface,
	Student: 	StudentInterface,
}