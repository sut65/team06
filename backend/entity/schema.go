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
	Admin_Password string `valid:"minstringlength(8)"`
	Admin_Tel      string `valid:"matches(^\\d{10}$)"`
	Admin_Address  string `gorm:"uniqueIndex" valid:"minstringlength(20)"`

	PrefixID   *uint
	GenderID   *uint
	ProvinceID *uint

	Prefix   PREFIX
	Gender   GENDER
	Province PROVINCE

	Branch      []BRANCH     `gorm:"foreignKey:AdminID"`
	Course      []COURSE     `gorm:"foreignKey:AdminID"`
	Student     []STUDENT    `gorm:"foreignKey:AdminID"`
	Grade       []GRADE      `gorm:"foreignKey:AdminID"`
	Activity    []ACTIVITY   `gorm:"foreignKey:AdminID"`
	Dormitory   []DORMITORY  `gorm:"foreignkey:AdminID"`
	Disciplines []Discipline `gorm:"foreignKey:AdminID"`
}

type COURSE struct {
	gorm.Model
	Course_Name    string
	Course_Teacher string
	Course_Credit  uint   `valid:"range(120|200)"`
	Course_Detail  string `valid:"minstringlength(10)"`
	Course_Year    uint   `valid:"range(2560|9999)"`

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
	Student_Number        string `gorm:"uniqueIndex" valid:"matches(^[BMD]\\d{7}$)"`
	Student_Name          string
	Student_Birthday      time.Time
	Student_Tel           string
	Student_Identity_Card string `gorm:"uniqueIndex" valid:"matches(^\\d{13}$)"`
	Student_Nationality   string
	Student_Religion      string
	Student_Address       string `valid:"minstringlength(10)"`
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
	Disciplines   []Discipline    `gorm:"foreignKey:StudentID"`
	Petitions     []Petition      `gorm:"foreignKey:StudentID"`
	Grade         []GRADE         `gorm:"foreignKey:StudentID"`
}

type BRANCH struct {
	gorm.Model
	Branch_Name    string `valid:"stringlength(5|50)"`
	Branch_Teacher string `valid:"matches(^[a-zA-Z ]*$)"`
	Branch_Info    string `valid:"maxstringlength(450)"`

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
	Scholarship_Name  string
	Scholarship_Info  string
	Scholarship_Close string

	ScholarshipTypeID *uint
	ScholarshipType   SCHOLARSHIPTYPE

	ScholarshipAp []SCHOLARSHIPAP `gorm:"foreignKey:ScholarshipID"`
}

type SCHOLARSHIPAP struct { // ตาราง Scholarship applicant
	gorm.Model

	Identity_Card string  `valid:"required,matches(^\\d{13}$)"`
	Reasons       string  `valid:"required,minstringlength(300)"`
	GPAX          float32 `valid:"required,matches(^[+]?([1-3]+([.][0-9]*)?|[4]?|[.][0]+)$)"`

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
	Grade_Student_Number string `valid:"required, matches(^[BMD]\\d{7}$)"`
	Grade_Supject        string `valid:"required, maxstringlength(20)"`
	Grade_Code_Supject   string `valid:"required, matches(^\\d{6}$)"`
	Grade                string

	InstituteID *uint
	BranchID    *uint
	AdminID     *uint
	StudentID   *uint

	Institute INSTITUTE
	Branch    BRANCH
	Admin     ADMIN
	Student   STUDENT
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
	Activity_Student_Number string `valid:"required, matches(^[BMD]\\d{7}$)"`
	Activity_Name           string `valid:"required"`
	Location                string
	Position                string
	Activity_Date           time.Time
	Activity_Year           string `valid:"required"`
	Hour                    string

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
	Dormitory_Student_Number string `json:"Dormitory_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Dormitory_AcademicYear   uint   `json:"Dormitory_AcademicYear" valid:"required~กรุณากรอกปีการศึกษา4หลัก, matches(^\\d{4}$)"`
	Room_Number              uint   `json:"Room_Number" valid:"required~กรุณากรอกเลขห้องพัก4หลัก, matches(^\\d{4}$)"`

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
	Suggestion_Teacher        string `json:"Suggestion_Teacher" valid:"required~กรุณากรอกชื่ออาจารย์"`
	Suggestion_Student_Number string `json:"Suggestion_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Suggestion_Student_Name   string `json:"Suggestion_Student_Name" valid:"required~กรุณากรอกชื่อสกุลนักศึกษา"`
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
	Postponement_Student_Number string `valid:"required,matches(^[BMD]\\d{7}$)"`
	Postponement_Student_Name   string `valid:"required~name cannot be blank"`
	Postponement_AcademicYear   string
	Postponement_Gpax           string
	Postponement_Credit         string
	Postponement_Date           time.Time
	Postponement_Reasons        string `valid:"required, minstringlength(10)"`

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

type DisciplineType struct {
	gorm.Model
	DisciplineType_Name string

	Disciplines []Discipline `gorm:"foreignKey:DisciplineTypeID"`
}

type Discipline struct {
	gorm.Model

	//Admin FK
	AdminID *uint
	Admin   ADMIN `gorm:"references:id"` //set fk at ADMIN

	//Student FK
	StudentID *uint
	Student   STUDENT `gorm:"references:id"` //set fk at STUDENT

	//DisciplineType FK
	DisciplineTypeID *uint
	DisciplineType   DisciplineType `gorm:"references:id"`

	Discipline_Reason     string
	Discipline_Punishment string
	Discipline_Point      uint
	Added_Time            time.Time
}

type PetitionType struct {
	gorm.Model
	PetitionType_Name string

	Petitions []Petition `gorm:"foreignKey:PetitionTypeID"`
}

type PetitionPeriod struct {
	gorm.Model
	PetitionPeriod_Num uint

	Petitions []Petition `gorm:"foreignKey:PetitionPeriodID"`
}

type Petition struct {
	gorm.Model

	//Student FK
	StudentID *uint
	Student   STUDENT `gorm:"references:id"`

	//PetitionType FK
	PetitionTypeID *uint
	PetitionType   PetitionType `gorm:"references:id"`

	//PetitionPeriod FK
	PetitionPeriodID *uint
	PetitionPeriod   PetitionPeriod `gorm:"references:id"`

	Petition_Reason    string
	Petition_Startdate time.Time
	Petition_Enddate   time.Time
	Added_Time         time.Time
}
