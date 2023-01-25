package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	//////////////////////////////////////////////
	database, err := gorm.Open(sqlite.Open("sut-midterm-lab.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	//////////////////////////////////////////////
	database.AutoMigrate(
		&GENDER{},
		&PROVINCE{},
		&DEGREE{},
		&INSTITUTE{},
		&PREFIX{},
		&ADMIN{},
		&BRANCH{},
		&COURSE{},
		&STUDENT{},
		&SCHOLARSHIP{},
		&SCHOLARSHIPAP{},
		&SCHOLARSHIPTYPE{},
		&GRADE{},
		&DORMITORYTYPE{}, 
		&ROOMTYPE{},
		&TRIMESTER{},   
		&DORMITORY{},  
	)
	//////////////////////////////////////////////
	db = database
	///////////ทดลองให้เวลาเกิดเป็นเวลาปัจุบัน///////////
	t := time.Now()
	///////////////ข้อมูลใน entity GENDER///////////

	GenderMale := GENDER{
		Gender_Type: "ชาย",
	}
	db.Model(&GENDER{}).Create(&GenderMale)

	GenderFemale := GENDER{
		Gender_Type: "หญิง",
	}
	db.Model(&GENDER{}).Create(&GenderFemale)

	GenderOther := GENDER{
		Gender_Type: "อื่นๆ",
	}
	db.Model(&GENDER{}).Create(&GenderOther)
	///////////////ข้อมูลใน entity PROVINCE/////////
	Province1 := PROVINCE{
		Province_Name: "กระบี่",
	}
	db.Model(&PROVINCE{}).Create(&Province1)

	Province2 := PROVINCE{
		Province_Name: "กรุงเทพมหานคร",
	}
	db.Model(&PROVINCE{}).Create(&Province2)

	Province3 := PROVINCE{
		Province_Name: "กาญจนบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province3)

	Province4 := PROVINCE{
		Province_Name: "กาฬสินธุ์",
	}
	db.Model(&PROVINCE{}).Create(&Province4)

	Province5 := PROVINCE{
		Province_Name: "กำแพงเพชร",
	}
	db.Model(&PROVINCE{}).Create(&Province5)

	Province6 := PROVINCE{
		Province_Name: "ขอนแก่น",
	}
	db.Model(&PROVINCE{}).Create(&Province6)

	Province7 := PROVINCE{
		Province_Name: "จันทบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province7)

	Province8 := PROVINCE{
		Province_Name: "ฉะเชิงเทรา",
	}
	db.Model(&PROVINCE{}).Create(&Province8)

	Province9 := PROVINCE{
		Province_Name: "ชลบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province9)

	Province10 := PROVINCE{
		Province_Name: "ชัยนาท",
	}
	db.Model(&PROVINCE{}).Create(&Province10)

	Province11 := PROVINCE{
		Province_Name: "ชัยภูมิ",
	}
	db.Model(&PROVINCE{}).Create(&Province11)

	Province12 := PROVINCE{
		Province_Name: "ชุมพร",
	}
	db.Model(&PROVINCE{}).Create(&Province12)

	Province13 := PROVINCE{
		Province_Name: "เชียงราย",
	}
	db.Model(&PROVINCE{}).Create(&Province13)

	Province14 := PROVINCE{
		Province_Name: "เชียงใหม่",
	}
	db.Model(&PROVINCE{}).Create(&Province14)

	Province15 := PROVINCE{
		Province_Name: "ตรัง",
	}
	db.Model(&PROVINCE{}).Create(&Province15)

	Province16 := PROVINCE{
		Province_Name: "ตราด",
	}
	db.Model(&PROVINCE{}).Create(&Province16)

	Province17 := PROVINCE{
		Province_Name: "ตาก",
	}
	db.Model(&PROVINCE{}).Create(&Province17)

	Province18 := PROVINCE{
		Province_Name: "นครนายก",
	}
	db.Model(&PROVINCE{}).Create(&Province18)

	Province19 := PROVINCE{
		Province_Name: "นครปฐม",
	}
	db.Model(&PROVINCE{}).Create(&Province19)

	Province20 := PROVINCE{
		Province_Name: "นครพนม",
	}
	db.Model(&PROVINCE{}).Create(&Province20)

	Province21 := PROVINCE{
		Province_Name: "นครราชสีมา",
	}
	db.Model(&PROVINCE{}).Create(&Province21)

	Province22 := PROVINCE{
		Province_Name: "นครศรีธรรมราช",
	}
	db.Model(&PROVINCE{}).Create(&Province22)

	Province23 := PROVINCE{
		Province_Name: "นครสวรรค์",
	}
	db.Model(&PROVINCE{}).Create(&Province23)

	Province24 := PROVINCE{
		Province_Name: "นนทบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province24)

	Province25 := PROVINCE{
		Province_Name: "นราธิวาส",
	}
	db.Model(&PROVINCE{}).Create(&Province25)

	Province26 := PROVINCE{
		Province_Name: "น่าน",
	}
	db.Model(&PROVINCE{}).Create(&Province26)

	Province27 := PROVINCE{
		Province_Name: "บึงกาฬ",
	}
	db.Model(&PROVINCE{}).Create(&Province27)

	Province28 := PROVINCE{
		Province_Name: "บุรีรัมย์",
	}
	db.Model(&PROVINCE{}).Create(&Province28)

	Province29 := PROVINCE{
		Province_Name: "ปทุมธานี",
	}
	db.Model(&PROVINCE{}).Create(&Province29)

	Province30 := PROVINCE{
		Province_Name: "ประจวบคีรีขันธ์",
	}
	db.Model(&PROVINCE{}).Create(&Province30)

	Province31 := PROVINCE{
		Province_Name: "ปราจีนบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province31)

	Province32 := PROVINCE{
		Province_Name: "ปัตตานี",
	}
	db.Model(&PROVINCE{}).Create(&Province32)

	Province33 := PROVINCE{
		Province_Name: "พะเยา",
	}
	db.Model(&PROVINCE{}).Create(&Province33)

	Province34 := PROVINCE{
		Province_Name: "พระนครศรีอยุธยา",
	}
	db.Model(&PROVINCE{}).Create(&Province34)

	Province35 := PROVINCE{
		Province_Name: "พังงา",
	}
	db.Model(&PROVINCE{}).Create(&Province35)

	Province36 := PROVINCE{
		Province_Name: "พัทลุง",
	}
	db.Model(&PROVINCE{}).Create(&Province36)

	Province37 := PROVINCE{
		Province_Name: "พิจิตร",
	}
	db.Model(&PROVINCE{}).Create(&Province37)

	Province38 := PROVINCE{
		Province_Name: "พิษณุโลก",
	}
	db.Model(&PROVINCE{}).Create(&Province38)

	Province39 := PROVINCE{
		Province_Name: "เพชรบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province39)

	Province40 := PROVINCE{
		Province_Name: "เพชรบูรณ์",
	}
	db.Model(&PROVINCE{}).Create(&Province40)

	Province41 := PROVINCE{
		Province_Name: "แพร่",
	}
	db.Model(&PROVINCE{}).Create(&Province41)

	Province42 := PROVINCE{
		Province_Name: "ภูเก็ต",
	}
	db.Model(&PROVINCE{}).Create(&Province42)

	Province43 := PROVINCE{
		Province_Name: "มหาสารคาม",
	}
	db.Model(&PROVINCE{}).Create(&Province43)

	Province44 := PROVINCE{
		Province_Name: "มุกดาหาร",
	}
	db.Model(&PROVINCE{}).Create(&Province44)

	Province45 := PROVINCE{
		Province_Name: "แม่ฮ่องสอน",
	}
	db.Model(&PROVINCE{}).Create(&Province45)

	Province46 := PROVINCE{
		Province_Name: "ยโสธร",
	}
	db.Model(&PROVINCE{}).Create(&Province46)

	Province47 := PROVINCE{
		Province_Name: "ยะลา",
	}
	db.Model(&PROVINCE{}).Create(&Province47)

	Province48 := PROVINCE{
		Province_Name: "ร้อยเอ็ด",
	}
	db.Model(&PROVINCE{}).Create(&Province48)

	Province49 := PROVINCE{
		Province_Name: "ระนอง",
	}
	db.Model(&PROVINCE{}).Create(&Province49)

	Province50 := PROVINCE{
		Province_Name: "ระยอง",
	}
	db.Model(&PROVINCE{}).Create(&Province50)

	Province51 := PROVINCE{
		Province_Name: "ราชบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province51)

	Province52 := PROVINCE{
		Province_Name: "ลพบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province52)

	Province53 := PROVINCE{
		Province_Name: "ลำปาง",
	}
	db.Model(&PROVINCE{}).Create(&Province53)

	Province54 := PROVINCE{
		Province_Name: "ลำพูน",
	}
	db.Model(&PROVINCE{}).Create(&Province54)

	Province55 := PROVINCE{
		Province_Name: "เลย",
	}
	db.Model(&PROVINCE{}).Create(&Province55)

	Province56 := PROVINCE{
		Province_Name: "ศรีสะเกษ",
	}
	db.Model(&PROVINCE{}).Create(&Province56)

	Province57 := PROVINCE{
		Province_Name: "สกลนคร",
	}
	db.Model(&PROVINCE{}).Create(&Province57)

	Province58 := PROVINCE{
		Province_Name: "สงขลา",
	}
	db.Model(&PROVINCE{}).Create(&Province58)

	Province59 := PROVINCE{
		Province_Name: "สตูล",
	}
	db.Model(&PROVINCE{}).Create(&Province59)

	Province60 := PROVINCE{
		Province_Name: "สมุทรปราการ",
	}
	db.Model(&PROVINCE{}).Create(&Province60)

	Province61 := PROVINCE{
		Province_Name: "สมุทรสงคราม",
	}
	db.Model(&PROVINCE{}).Create(&Province61)

	Province62 := PROVINCE{
		Province_Name: "สมุทรสาคร",
	}
	db.Model(&PROVINCE{}).Create(&Province62)

	Province63 := PROVINCE{
		Province_Name: "สระแก้ว",
	}
	db.Model(&PROVINCE{}).Create(&Province63)

	Province64 := PROVINCE{
		Province_Name: "สระบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province64)

	Province65 := PROVINCE{
		Province_Name: "สิงห์บุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province65)

	Province66 := PROVINCE{
		Province_Name: "สุโขทัย",
	}
	db.Model(&PROVINCE{}).Create(&Province66)

	Province67 := PROVINCE{
		Province_Name: "สุพรรณบุรี",
	}
	db.Model(&PROVINCE{}).Create(&Province67)

	Province68 := PROVINCE{
		Province_Name: "สุราษฎร์ธานี",
	}
	db.Model(&PROVINCE{}).Create(&Province68)

	Province69 := PROVINCE{
		Province_Name: "สุรินทร์",
	}
	db.Model(&PROVINCE{}).Create(&Province69)

	Province70 := PROVINCE{
		Province_Name: "หนองคาย",
	}
	db.Model(&PROVINCE{}).Create(&Province70)

	Province71 := PROVINCE{
		Province_Name: "หนองบัวลำภู",
	}
	db.Model(&PROVINCE{}).Create(&Province71)

	Province72 := PROVINCE{
		Province_Name: "อ่างทอง",
	}
	db.Model(&PROVINCE{}).Create(&Province72)

	Province73 := PROVINCE{
		Province_Name: "อำนาจเจริญ",
	}
	db.Model(&PROVINCE{}).Create(&Province73)

	Province74 := PROVINCE{
		Province_Name: "อุดรธานี",
	}
	db.Model(&PROVINCE{}).Create(&Province74)

	Province75 := PROVINCE{
		Province_Name: "อุตรดิตถ์",
	}
	db.Model(&PROVINCE{}).Create(&Province75)

	Province76 := PROVINCE{
		Province_Name: "อุทัยธานี",
	}
	db.Model(&PROVINCE{}).Create(&Province76)

	Province77 := PROVINCE{
		Province_Name: "อุบลราชธานี",
	}
	db.Model(&PROVINCE{}).Create(&Province77)

	///////////////ข้อมูลใน entity DEGREE///////////

	Degree1 := DEGREE{
		Degree_Name: "ปริญญาตรี",
	}
	db.Model(&DEGREE{}).Create(&Degree1)

	Degree2 := DEGREE{
		Degree_Name: "ปริญญาโท",
	}
	db.Model(&DEGREE{}).Create(&Degree2)

	Degree3 := DEGREE{
		Degree_Name: "ปริญญาเอก",
	}
	db.Model(&DEGREE{}).Create(&Degree3)

	///////////////ข้อมูลใน entity INSTITUTE///////////

	Institute1 := INSTITUTE{
		Institute_Name: "สำนักวิชาวิศวกรรมศาสตร์",
	}
	db.Model(&INSTITUTE{}).Create(&Institute1)

	Institute2 := INSTITUTE{
		Institute_Name: "สำนักวิชาวิทยาศาสตร์",
	}
	db.Model(&INSTITUTE{}).Create(&Institute2)

	///////////////ข้อมูลใน entity PREFIX///////////

	Prefix1 := PREFIX{
		Prefix_Name: "นาย",
	}
	db.Model(&PREFIX{}).Create(&Prefix1)

	Prefix2 := PREFIX{
		Prefix_Name: "นาง",
	}
	db.Model(&PREFIX{}).Create(&Prefix2)

	Prefix3 := PREFIX{
		Prefix_Name: "นางสาว",
	}
	db.Model(&PREFIX{}).Create(&Prefix3)

	Prefix4 := PREFIX{
		Prefix_Name: "ดร.",
	}
	db.Model(&PREFIX{}).Create(&Prefix4)

	Prefix5 := PREFIX{
		Prefix_Name: "รองศาสตราจารย์ดร.",
	}
	db.Model(&PREFIX{}).Create(&Prefix5)

	Prefix6 := PREFIX{
		Prefix_Name: "ผู้ช่วยศาสตราจารย์ดร.",
	}
	db.Model(&PREFIX{}).Create(&Prefix6)

	///////////////ข้อมูลใน entity ADMIN////////////////////////////////////

	password, err := bcrypt.GenerateFromPassword([]byte("123456789"), 14)

	Admin1 := ADMIN{
		Admin_Name:     "สมใจ จิตดี",
		Admin_Email:    "Admin0001@gmail.com",
		Admin_Password: string(password),
		Admin_Tel:      "0957423478",
		Admin_Address:  "123/456 ต.คลอง1 อ.คลองหลวง จ.ปทุมธานี",
		Gender:         GenderFemale,
		Prefix:         Prefix3,
		Province:       Province29,
	}
	db.Model(&ADMIN{}).Create(&Admin1)

	Admin2 := ADMIN{
		Admin_Name:     "เก่ง สมใจ",
		Admin_Email:    "Admin0002@gmail.com",
		Admin_Password: string(password),
		Admin_Tel:      "0655619892",
		Admin_Address:  "788/21 ต.คลอง3 อ.คลองหลวง จ.ปทุมธานี",
		Gender:         GenderMale,
		Prefix:         Prefix1,
		Province:       Province29,
	}
	db.Model(&ADMIN{}).Create(&Admin2)

	///////////////ข้อมูลใน entity BRANCH///////////////////////////////

	Branch1 := BRANCH{
		Branch_Name:    "วิศวกรรมคอมพิวเตอร์",
		Branch_Teacher: "หาย ไม่บอก",
		Branch_Info:    "ตอบโจทย์ตลาดแรงงานในอนาคต",
		Prefix:         Prefix5,
		Institute:      Institute1,
		Admin:          Admin1,
	}
	db.Model(&BRANCH{}).Create(&Branch1)

	Branch2 := BRANCH{
		Branch_Name:    "วิศวกรรมเครื่องกล",
		Branch_Teacher: "แอบมอง คนดี",
		Branch_Info:    "ตอบโจทย์ตลาดแรงงานในอนาคต",
		Prefix:         Prefix4,
		Institute:      Institute1,
		Admin:          Admin1,
	}
	db.Model(&BRANCH{}).Create(&Branch2)

	///////////////ข้อมูลใน entity COURSE///////////////////////////////

	Course1 := COURSE{
		Course_Name:    "วิศวกรรมคอมพิวเตอร์หลักสูตร(พ.ศ.2560)",
		Course_Teacher: "หาย ไม่บอก",
		Course_Credit:  178,
		Course_Detail:  "เป็นหลักสูตรของสาขาวิศวกรรมคอมพิวเตอร์เป็นหลักสูตรที่ออกแบบมาเพื่อตอบโจทย์กับอนาคต",
		Course_Year:    2560,
		Degree:         Degree1,
		Prefix:         Prefix5,
		Institute:      Institute1,
		Branch:         Branch1,
		Admin:          Admin1,
	}
	db.Model(&COURSE{}).Create(&Course1)

	Course2 := COURSE{
		Course_Name:    "วิศวกรรมเครื่องกลหลักสูตร(พ.ศ.2560)",
		Course_Teacher: "แอบมอง คนดี",
		Course_Credit:  192,
		Course_Detail:  "เป็นหลักสูตรของสาขาวิศวกรรมเครื่องกลเป็นหลักสูตรที่ออกแบบมาเพื่อตอบโจทย์กับอนาคต",
		Course_Year:    2560,
		Degree:         Degree1,
		Prefix:         Prefix4,
		Institute:      Institute1,
		Branch:         Branch2,
		Admin:          Admin2,
	}
	db.Model(&COURSE{}).Create(&Course2)

	///////////////ข้อมูลใน entity STUDENT///////////////////////////////

	Student1 := STUDENT{
		Student_Year_Of_Entry: t,
		Student_Number:        "B6300000",
		Student_Name:          "ศุภกานต์ แสงจันทร์",
		Student_Birthday:      t,
		Student_Tel:           "0987564387",
		Student_Identity_Card: "1134900124561",
		Student_Nationality:   "ไทย",
		Student_Religion:      "พุทธ",
		Student_Address:       "23/21ต.คลอง1 อ.คลองหลวง จ.ปทุมธานี",
		Student_Fathers_Name:  "สมชาย แสงจันทร์",
		Student_Mothers_Name:  "สมหญิง แสงจันทร์",
		Gender:                GenderMale,
		Degree:                Degree1,
		Prefix:                Prefix1,
		Institute:             Institute1,
		Province:              Province29,
		Branch:                Branch1,
		Course:                Course1,
		Admin:                 Admin1,
	}
	db.Model(&STUDENT{}).Create(&Student1)

	Student2 := STUDENT{
		Student_Year_Of_Entry: t,
		Student_Number:        "B6311010",
		Student_Name:          "สมจิต สีแดง",
		Student_Birthday:      t,
		Student_Tel:           "0687538946",
		Student_Identity_Card: "1134900124129",
		Student_Nationality:   "ไทย",
		Student_Religion:      "พุทธ",
		Student_Address:       "224/21ต.คลอง6 อ.คลองหลวง จ.ปทุมธานี",
		Student_Fathers_Name:  "สมหมาย สีแดง",
		Student_Mothers_Name:  "สมศรี สีแดง",
		Gender:                GenderFemale,
		Degree:                Degree1,
		Prefix:                Prefix3,
		Institute:             Institute1,
		Province:              Province29,
		Branch:                Branch2,
		Course:                Course2,
		Admin:                 Admin2,
	}
	db.Model(&STUDENT{}).Create(&Student2)

///////////////ข้อมูลใน entity SCHOLARSHIPTYPE///////////////////////////////
	ScholarshipType1 := SCHOLARSHIPTYPE{
		Scholarship_Type_Name:    "ยืมเรียน",
	}
	db.Model(&SCHOLARSHIPTYPE{}).Create(&ScholarshipType1)

	ScholarshipType2 := SCHOLARSHIPTYPE{
		Scholarship_Type_Name:    "ยากจน",
	}
	db.Model(&SCHOLARSHIPTYPE{}).Create(&ScholarshipType2)

	ScholarshipType3 := SCHOLARSHIPTYPE{
		Scholarship_Type_Name:    "เรียนดี",
	}
	db.Model(&SCHOLARSHIPTYPE{}).Create(&ScholarshipType3)

///////////////ข้อมูลใน entity SCHOLARSHIPTYPE///////////////////////////////
	Scholarship1 := SCHOLARSHIP{
		Scholarship_Name: "กยศ",

		ScholarshipType: ScholarshipType1,
	}
	db.Model(&SCHOLARSHIP{}).Create(&Scholarship1)

	Scholarship2 := SCHOLARSHIP{
		Scholarship_Name: "ปันสุข",

		ScholarshipType: ScholarshipType2,
	}
	db.Model(&SCHOLARSHIP{}).Create(&Scholarship2)

	Scholarship3 := SCHOLARSHIP{
		Scholarship_Name: "แม่ป้าข้างบ้าน",

		ScholarshipType: ScholarshipType3,
	}
	db.Model(&SCHOLARSHIP{}).Create(&Scholarship3)

///////////////ข้อมูลใน entity SCHOLARSHIPAP///////////////////////////////
	ScholarshipAp1 := SCHOLARSHIPAP{
		Student_Identity_Card: "1134900124561",
		Reasons:				"เนื่องจากไม่มีเงิน…",
		GPAX:	2.34,

		ScholarshipType: ScholarshipType1,
		Scholarship: Scholarship1,
		Branch: Branch2,
		Institute: Institute2,
		Student: Student1,
	}
	db.Model(&SCHOLARSHIPAP{}).Create(&ScholarshipAp1)

	ScholarshipAp2 := SCHOLARSHIPAP{
		Student_Name: "",
		Student_Identity_Card: "1134900124129",
		Reasons:				"หนูต้องการทุนใน…",
		GPAX:	2.33,

		ScholarshipType: ScholarshipType1,
		Scholarship: Scholarship1,
		Branch: Branch2,
		Institute: Institute2,
		Student: Student2,
	}
	db.Model(&SCHOLARSHIPAP{}).Create(&ScholarshipAp2)

	///////////////ข้อมูลใน entity GRADE ///////////////////////////////

	Grade1 := GRADE{
		Grade_Student_Number: "B6428531",
		Grade_GPA:            3.50,
		Grade_Code_Supject:   "SOFTWARE ENGINEERING",
		Grade_Supject:        "523332",
		Grade:                "A",
		Institute:            Institute1,
		Branch:               Branch1,
		Admin:                Admin1,
	}
	db.Model(&GRADE{}).Create(&Grade1)

	Grade2 := GRADE{
		Grade_Student_Number: "B6175324",
		Grade_GPA:            3.66,
		Grade_Code_Supject:   "MATH",
		Grade_Supject:        "235661",
		Grade:                "B",
		Institute:            Institute1,
		Branch:               Branch1,
		Admin:                Admin2,
	}
	db.Model(&GRADE{}).Create(&Grade2)

	
	///////////////ข้อมูลใน entity ACTIVITY_TYPE  ///////////////////////////////

	ActivityType1 := ACTIVITYTYPE{
		Activity_Type_Name: "กิจกรรในมหาวิทยาลัย",
	}
	db.Model(&ACTIVITYTYPE{}).Create(&ActivityType1)

	ActivityType2 := ACTIVITYTYPE{
		Activity_Type_Name: "กิจกรรมนอกมหาวิทยาลัย",
	}
	db.Model(&ACTIVITYTYPE{}).Create(&ActivityType2)

	///////////////ข้อมูลใน entity TRIMESTER   ///////////////////////////////

	Trimester1 := TRIMESTER{
		Trimester_Name: "ภาคการศึกษาที่ 1",
	}
	db.Model(&TRIMESTER{}).Create(&Trimester1)

	Trimester2 := TRIMESTER{
		Trimester_Name: "ภาคการศึกษาที่ 2",
	}
	db.Model(&TRIMESTER{}).Create(&Trimester2)

	Trimester3 := TRIMESTER{
		Trimester_Name: "ภาคการศึกษาที่ 3",
	}
	db.Model(&TRIMESTER{}).Create(&Trimester3)

	///////////////ข้อมูลใน entity ACTIVITY   ///////////////////////////////

	Activity1 := ACTIVITY{
		Activity_Student_Number: "B6332426",
		Activity_Name:           "กิจกรรมปลูกป่ารักโลก",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           t,
		Activity_Year:           "2565",
		Hour:                    12,

		ActivityType: ActivityType2,
		Trimester:    Trimester2,
		Admin:        Admin1,
	}
	db.Model(&ACTIVITY{}).Create(&Activity1)

	Activity2 := ACTIVITY{
		Activity_Student_Number: "B6204419",
		Activity_Name:           "จิตอาสารับรายงานตัวปี1เข้าหอพัก",
		Location:                "หอใน",
		Position:                "ช่วยขนของ",
		Activity_Date:           t,
		Activity_Year:           "2565",
		Hour:                    7,

		ActivityType: ActivityType1,
		Trimester:    Trimester1,
		Admin:        Admin2,
	}
	db.Model(&ACTIVITY{}).Create(&Activity2)

	Activity3 := ACTIVITY{
		Activity_Student_Number: "B6478521",
		Activity_Name:           "โครงการ SUT mini badminton",
		Location:                "โรงยิมแบดมินตัน",
		Position:                "คณะทำงาน",
		Activity_Date:           t,
		Activity_Year:           "2564",
		Hour:                    15,

		ActivityType: ActivityType1,
		Trimester:    Trimester3,
		Admin:        Admin2,
	}
	db.Model(&ACTIVITY{}).Create(&Activity3)

	Dormitory_type1 := DORMITORYTYPE{
		Dormitory_Type_Name: "หอชายในมหาวิทยาลัย",
	}
	db.Model(&DORMITORYTYPE{}).Create(&Dormitory_type1)

	Dormitory_type2 := DORMITORYTYPE{
		Dormitory_Type_Name: "หอหญิงในมหาวิทยาลัย",
	}
	db.Model(&DORMITORYTYPE{}).Create(&Dormitory_type2)

	Dormitory_type3 := DORMITORYTYPE{
		Dormitory_Type_Name: "หอนอกในมหาวิทยาลัย",
	}
	db.Model(&DORMITORYTYPE{}).Create(&Dormitory_type3)

	Room_type1 := ROOMTYPE{
		Room_Type_Name: "หอพักห้องน้ำในตัว",
	}
	db.Model(&ROOMTYPE{}).Create(&Room_type1)

	Room_type2 := ROOMTYPE{
		Room_Type_Name: "หอพักห้องน้ำรวม",
	}
	db.Model(&ROOMTYPE{}).Create(&Room_type2)

	Dormitory1 := DORMITORY{
		Dormitory_Student_Number: "B6300000",
		Dormitory_AcademicYear:   2565,
		Room_Number:              8210,
		Trimester:                Trimester2,
		DormitoryType:            Dormitory_type1,
		RoomType:                 Room_type2,
		Branch:                   Branch1,
	}
	db.Model(&DORMITORY{}).Create(&Dormitory1)

	Dormitory2 := DORMITORY{
		Dormitory_Student_Number: "B6311010",
		Dormitory_AcademicYear:   2564,
		Room_Number:              6241,
		Trimester:                Trimester2,
		DormitoryType:            Dormitory_type2,
		RoomType:                 Room_type2,
		Branch:                   Branch2,
	}
	db.Model(&DORMITORY{}).Create(&Dormitory2)

	Suggestion1 := SUGGESTION{
		Suggestion_Teacher:        "อ.เกษม จิตดี",
		Suggestion_Student_Number: "B6300000",
		Suggestion_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Suggestion_Date:           t,
		Suggestion_Detail:         "ปรับการพูดตอนสอนในช้าลงกว่านี้ได้ไหมครับ",
		Prefix:                    Prefix1,
		Institute:                 Institute1,
		Branch:                    Branch1,
	}
	db.Model(&SUGGESTION{}).Create(&Suggestion1)

	Suggestion2 := SUGGESTION{
		Suggestion_Teacher:        "ดร.เปรมณัต วงศ์ดี",
		Suggestion_Student_Number: "B6311010",
		Suggestion_Student_Name:   "สมจิต สีแดง",
		Suggestion_Date:           t,
		Suggestion_Detail:         "อยากให้อ.มีกิจกรรมเล็กๆ น้อยๆ ระหว่างการสอนด้วยค่ะ",
		Prefix:                    Prefix1,
		Institute:                 Institute2,
		Branch:                    Branch2,
	}
	db.Model(&SUGGESTION{}).Create(&Suggestion2)

	Postponement1 := POSTPONEMENT{
		Postponement_Student_Number: "B6300000",
		Postponement_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "4.00",
		Postponement_Credit:         "22",
		Postponement_Date:           t,
		Postponement_Reasons:        "เนื่องจากทางบ้านมีปัญหาเรื่องการเงิน",
		Prefix:    Prefix1,
		Degree:    Degree1,
		Trimester: Trimester2,
		Institute: Institute1,
		Branch:    Branch1,

	}
	db.Model(&POSTPONEMENT{}).Create(&Postponement1)

	Postponement2 := POSTPONEMENT{
		Postponement_Student_Number: "B6311010",
		Postponement_Student_Name:   "สมจิต สีแดง",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "3.50",
		Postponement_Credit:         "18",
		Postponement_Date:           t,
		Postponement_Reasons:        "เนื่องจากทางบ้านมีปัญหาเรื่องการเงิน",
		Prefix:    Prefix2,
		Degree:    Degree1,
		Trimester: Trimester2,
		Institute: Institute1,
		Branch:    Branch2,

	}
	db.Model(&POSTPONEMENT{}).Create(&Postponement2)
}


