package entity

import (
	"time"

	"gorm.io/gorm"
)

type GENDER struct {
	gorm.Model
	Gender_Type string

	Student []STUDENT `gorm:"foreignKey:GenderID"`
}
type PROVINCE struct {
	gorm.Model
	Province_Name string
	
	Student []STUDENT `gorm:"foreignKey:ProvinceID"`
}
type DEGREE struct {
	gorm.Model
	Degree_Name string

	
	Student []STUDENT `gorm:"foreignKey:DegreeID"`
}
type PREFIX struct {
	gorm.Model
	Prefix_Name string

	Student []STUDENT `gorm:"foreignKey:PrefixID"`
}
type INSTITUTE struct {
	gorm.Model
	Institute_Name string

	Student []STUDENT `gorm:"foreignKey:InstituteID"`
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
	// BranchID    *uint
	// CourseID    *uint
	// AdminID     *uint

	Gender    GENDER
	Degree    DEGREE
	Prefix    PREFIX
	Institute INSTITUTE
	Province  PROVINCE
	// Branch    BRANCH
	// Course    COURSE
	// Admin     ADMIN
}
