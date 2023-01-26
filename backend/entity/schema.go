package entity

import (
	"time"

	"gorm.io/gorm"
)

type GENDER struct {
	gorm.Model
	Gender_Type string

	Admin   []ADMIN   `gorm:"foreignKey:GenderID"`
	Student []STUDENT `gorm:"foreignKey:GenderID"`
}
type PROVINCE struct {
	gorm.Model
	Province_Name string

	Admin   []ADMIN   `gorm:"foreignKey:ProvinceID"`
	Student []STUDENT `gorm:"foreignKey:ProvinceID"`
}
type DEGREE struct {
	gorm.Model
	Degree_Name string

	Course       []COURSE       `gorm:"foreignKey:DegreeID"`
	Student      []STUDENT      `gorm:"foreignKey:DegreeID"`
	Postponement []POSTPONEMENT `gorm:"foreignKey:DegreeID"`
}
type PREFIX struct {
	gorm.Model
	Prefix_Name string

	Admin        []ADMIN        `gorm:"foreignKey:PrefixID"`
	Branch       []BRANCH       `gorm:"foreignKey:PrefixID"`
	Course       []COURSE       `gorm:"foreignKey:PrefixID"`
	Student      []STUDENT      `gorm:"foreignKey:PrefixID"`
	Postponement []POSTPONEMENT `gorm:"foreignKey:PrefixID"`
	Suggestion   []SUGGESTION   `gorm:"foreignkey:PrefixID"`
}
type INSTITUTE struct {
	gorm.Model
	Institute_Name string

	Branch        []BRANCH        `gorm:"foreignKey:InstituteID"`
	Course        []COURSE        `gorm:"foreignKey:InstituteID"`
	Student       []STUDENT       `gorm:"foreignKey:InstituteID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:InstituteID"`
	Grade         []GRADE         `gorm:"foreignKey:InstituteID"`
	Suggestion    []SUGGESTION    `gorm:"foreignkey:InstituteID"`
	Postponement  []POSTPONEMENT  `gorm:"foreignKey:InstituteID"`
}

type ADMIN struct {
	gorm.Model
	Admin_Name     string
	Admin_Email    string `gorm:"uniqueIndex"`
	Admin_Password string
	Admin_Tel      string
	Admin_Address  string

	PrefixID   *uint
	GenderID   *uint
	ProvinceID *uint

	Prefix   PREFIX
	Gender   GENDER
	Province PROVINCE

	Branch    []BRANCH    `gorm:"foreignKey:AdminID"`
	Course    []COURSE    `gorm:"foreignKey:AdminID"`
	Student   []STUDENT   `gorm:"foreignKey:AdminID"`
	Grade     []GRADE     `gorm:"foreignKey:AdminID"`
	Activity  []ACTIVITY  `gorm:"foreignKey:AdminID"`
	Dormitory []DORMITORY `gorm:"foreignkey:AdminID"`
}

type COURSE struct {
	gorm.Model
	Course_Name    string
	Course_Teacher string
	Course_Credit  uint
	Course_Detail  string
	Course_Year    uint

	DegreeID    *uint
	PrefixID    *uint
	InstituteID *uint
	BranchID    *uint
	AdminID     *uint

	Degree    DEGREE
	Prefix    PREFIX
	Institute INSTITUTE
	Branch    BRANCH
	Admin     ADMIN

	Student []STUDENT `gorm:"foreignKey:CourseID"`
}

type STUDENT struct {
	gorm.Model
	Student_Year_Of_Entry time.Time
	Student_Number        string `gorm:"uniqueIndex"`
	Student_Name          string
	Student_Birthday      time.Time
	Student_Tel           string
	Student_Identity_Card string `gorm:"uniqueIndex"`
	Student_Nationality   string
	Student_Religion      string
	Student_Address       string
	Student_Fathers_Name  string
	Student_Mothers_Name  string

	GenderID    *uint
	DegreeID    *uint
	PrefixID    *uint
	InstituteID *uint
	ProvinceID  *uint
	BranchID    *uint
	CourseID    *uint
	AdminID     *uint

	Gender    GENDER
	Degree    DEGREE
	Prefix    PREFIX
	Institute INSTITUTE
	Province  PROVINCE
	Branch    BRANCH
	Course    COURSE
	Admin     ADMIN

	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:StudentID"`
	Suggestion    []SUGGESTION    `gorm:"foreignkey:StudentID"`
	Postponement  []POSTPONEMENT  `gorm:"foreignKey:StudentID"`
}

type BRANCH struct {
	gorm.Model
	Branch_Name    string
	Branch_Teacher string
	Branch_Info    string

	PrefixID    *uint
	InstituteID *uint
	AdminID     *uint

	Prefix    PREFIX
	Institute INSTITUTE
	Admin     ADMIN

	Course        []COURSE        `gorm:"foreignKey:BranchID"`
	Student       []STUDENT       `gorm:"foreignKey:BranchID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:BranchID"`
	Grade         []GRADE         `gorm:"foreignKey:BranchID"`
	Dormitory     []DORMITORY     `gorm:"foreignkey:BranchID"`
	Postponement  []POSTPONEMENT  `gorm:"foreignKey:BranchID"`
	Suggestion    []SUGGESTION    `gorm:"foreignkey:BranchID"`
}

type SCHOLARSHIPTYPE struct {
	gorm.Model
	Scholarship_Type_Name string

	Scholarship   []SCHOLARSHIP   `gorm:"foreignKey:ScholarshipTypeID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:ScholarshipTypeID"`
}

type SCHOLARSHIP struct {
	gorm.Model
	Scholarship_Name string

	ScholarshipTypeID *uint
	ScholarshipType   SCHOLARSHIPTYPE

	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:ScholarshipID"`
}

type SCHOLARSHIPAP struct { // ตาราง Scholarship applicant
	gorm.Model

	Student_Identity_Card string
	Reasons               string
	Student_Name          string
	GPAX                  float32

	ScholarshipTypeID *uint
	ScholarshipID     *uint
	InstituteID       *uint
	BranchID          *uint
	StudentID         *uint

	Institute       INSTITUTE
	Branch          BRANCH
	Scholarship     SCHOLARSHIP
	ScholarshipType SCHOLARSHIPTYPE
	Student         STUDENT
}
type GRADE struct {
	gorm.Model
	Grade_Student_Number string
	Grade_GPA            float32
	Grade_Supject        string
	Grade_Code_Supject   string
	Grade                string

	InstituteID *uint
	BranchID    *uint
	AdminID     *uint

	Institute INSTITUTE
	Branch    BRANCH
	Admin     ADMIN
}

type ACTIVITYTYPE struct {
	gorm.Model
	Activity_Type_Name string

	Activity []ACTIVITY `gorm:"foreignKey:ActivityTypeID"`
}
type TRIMESTER struct {
	gorm.Model
	Trimester_Name string

	Activity     []ACTIVITY     `gorm:"foreignKey:TrimesterID"`
	Postponement []POSTPONEMENT `gorm:"foreignKey:TrimesterID"`
	Dormitory    []DORMITORY    `gorm:"foreignkey:TrimesterID"`
}
type ACTIVITY struct {
	gorm.Model
	Activity_Student_Number string
	Activity_Name           string
	Location                string
	Position                string
	Activity_Date           time.Time
	Activity_Year           string
	Hour                    uint

	ActivityTypeID *uint
	TrimesterID    *uint
	AdminID        *uint

	ActivityType ACTIVITYTYPE
	Trimester    TRIMESTER
	Admin        ADMIN
}

type DORMITORYTYPE struct {
	gorm.Model
	Dormitory_Type_Name string
	Dormitory           []DORMITORY `gorm:"foreignkey:DormitoryTypeID"`
}

type ROOMTYPE struct {
	gorm.Model
	Room_Type_Name string
	Dormitory      []DORMITORY `gorm:"foreignkey:RoomTypeID"`
}

type DORMITORY struct {
	gorm.Model
	Dormitory_Student_Number string `gorm:"uniqueIndex"`
	Dormitory_AcademicYear   uint
	Room_Number              uint

	TrimesterID     *uint
	DormitoryTypeID *uint
	RoomTypeID      *uint
	BranchID        *uint
	AdminID         *uint

	Trimester     TRIMESTER
	DormitoryType DORMITORYTYPE
	RoomType      ROOMTYPE
	Branch        BRANCH
	Admin         ADMIN
}

type SUGGESTION struct {
	gorm.Model
	Suggestion_Teacher        string
	Suggestion_Student_Number string
	Suggestion_Student_Name   string
	Suggestion_Date           time.Time
	Suggestion_Detail         string

	PrefixID    *uint
	InstituteID *uint
	BranchID    *uint
	StudentID   *uint

	Prefix    PREFIX
	Institute INSTITUTE
	Branch    BRANCH
	Student   STUDENT
}

type POSTPONEMENT struct {
	gorm.Model
	Postponement_Student_Number string
	Postponement_Student_Name   string
	Postponement_AcademicYear   string
	Postponement_Gpax           string
	Postponement_Credit         string
	Postponement_Date           time.Time
	Postponement_Reasons        string

	PrefixID    *uint
	DegreeID    *uint
	TrimesterID *uint
	InstituteID *uint
	BranchID    *uint
	StudentID   *uint

	Prefix    PREFIX
	Degree    DEGREE
	Trimester TRIMESTER
	Institute INSTITUTE
	Branch    BRANCH
	Student   STUDENT
}
