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

	Course  []COURSE  `gorm:"foreignKey:DegreeID"`
	Student []STUDENT `gorm:"foreignKey:DegreeID"`
}
type PREFIX struct {
	gorm.Model
	Prefix_Name string

	Admin   []ADMIN   `gorm:"foreignKey:PrefixID"`
	Branch  []BRANCH  `gorm:"foreignKey:PrefixID"`
	Course  []COURSE  `gorm:"foreignKey:PrefixID"`
	Student []STUDENT `gorm:"foreignKey:PrefixID"`
}
type INSTITUTE struct {
	gorm.Model
	Institute_Name string

	Branch  []BRANCH  `gorm:"foreignKey:InstituteID"`
	Course  []COURSE  `gorm:"foreignKey:InstituteID"`
	Student []STUDENT `gorm:"foreignKey:InstituteID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:InstituteID"`
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

	Branch  []BRANCH  `gorm:"foreignKey:AdminID"`
	Course  []COURSE  `gorm:"foreignKey:AdminID"`
	Student []STUDENT `gorm:"foreignKey:AdminID"`
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

	Course  []COURSE  `gorm:"foreignKey:BranchID"`
	Student []STUDENT `gorm:"foreignKey:BranchID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:BranchID"`
}

type SCHOLARSHIPTYPE struct {
	gorm.Model
	Scholarship_Type_Name string

	Scholarship []SCHOLARSHIP `gorm:"foreignKey:ScholarshipTypeID"`
	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:ScholarshipTypeID"`
}

type SCHOLARSHIP struct {
	gorm.Model
	Scholarship_Name string

	ScholarshipTypeID *uint
	ScholarshipType SCHOLARSHIPTYPE

	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:ScholarshipID"`
}

type SCHOLARSHIPAP struct { // ตาราง Scholarship applicant
	gorm.Model

	Student_Identity_Card string
	Reasons               string
	Student_Name		  string
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
	Student        STUDENT
}

