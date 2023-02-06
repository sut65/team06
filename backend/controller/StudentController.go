package controller

import (
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

type CreateStudentPayload struct {
	Student_Year_Of_Entry time.Time `json:"Student_Year_Of_Entry"`
	Student_Number        string    `json:"Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา,matches(^[BMD]\\d{7}$)~รหัสนักศึกษาต้องขึ้นด้วยB M D และตามด้วยตัวเลข 7 ตัว"`
	Student_Name          string    `json:"Student_Name"`
	Student_Birthday      time.Time `json:"Student_Birthday"`
	Student_Tel           string    `json:"Student_Tel"`
	Student_Identity_Card string    `json:"Student_Identity_Card" valid:"required~กรุณากรอกรหัสบัตรประชาชน,matches(^\\d{13}$)~กรุณากรอกรหัสบัตรประชาชนให้พอดี 13 หลัก"`
	Student_Nationality   string    `json:"Student_Nationality"`
	Student_Religion      string    `json:"Student_Religion"`
	Student_Address       string    `json:"Student_Address"`
	Student_Fathers_Name  string    `json:"Student_Fathers_Name"`
	Student_Mothers_Name  string    `json:"Student_Mothers_Name"`

	Gender    uint `json:"Gender"`
	Degree    uint `json:"Degree"`
	Prefix    uint `json:"Prefix"`
	Institute uint `json:"Institute"`
	Province  uint `json:"Province"`
	Branch    uint `json:"Branch"`
	Course    uint `json:"Course"`
	Admin     uint `json:"Admin"`
}

type UpdateStudentPayload struct {
	ID                    uint      `json:"ID"`
	Student_Year_Of_Entry time.Time `json:"Student_Year_Of_Entry"`
	Student_Number        string    `json:"Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา,matches(^[BMD]\\d{7}$)~รหัสนักศึกษาต้องขึ้นด้วยB M D และตามด้วยตัวเลข 7 ตัว"`
	Student_Name          string    `json:"Student_Name"`
	Student_Birthday      time.Time `json:"Student_Birthday"`
	Student_Tel           string    `json:"Student_Tel"`
	Student_Identity_Card string    `json:"Student_Identity_Card"  valid:"required~กรุณากรอกรหัสบัตรประชาชน,matches(^\\d{13}$)~กรุณากรอกรหัสบัตรประชาชนให้พอดี 13 หลัก"`
	Student_Nationality   string    `json:"Student_Nationality"`
	Student_Religion      string    `json:"Student_Religion"`
	Student_Address       string    `json:"Student_Address"`
	Student_Fathers_Name  string    `json:"Student_Fathers_Name"`
	Student_Mothers_Name  string    `json:"Student_Mothers_Name"`

	Gender    uint `json:"Gender"`
	Degree    uint `json:"Degree"`
	Prefix    uint `json:"Prefix"`
	Institute uint `json:"Institute"`
	Province  uint `json:"Province"`
	Branch    uint `json:"Branch"`
	Course    uint `json:"Course"`
}

func CreateStudent(c *gin.Context) {

	var payload CreateStudentPayload
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Course entity.COURSE
	var Degree entity.DEGREE
	var Prefix entity.PREFIX
	var Gender entity.GENDER
	var Province entity.PROVINCE
	var Student entity.STUDENT
	var Admin entity.ADMIN

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Student_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 13: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 14: ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// 15: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Course).First(&Course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	// 16: ค้นหา degree ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
		return
	}

	// 17: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	// 18: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Gender).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// 19: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Province).First(&Province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	// 20: ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Admin).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	// 21: สร้าง entity Student
	Student.Student_Year_Of_Entry = payload.Student_Year_Of_Entry
	Student.Student_Number = payload.Student_Number
	Student.Student_Name = payload.Student_Name
	Student.Student_Birthday = payload.Student_Birthday
	Student.Student_Tel = payload.Student_Tel
	Student.Student_Identity_Card = payload.Student_Identity_Card
	Student.Student_Nationality = payload.Student_Nationality
	Student.Student_Religion = payload.Student_Religion
	Student.Student_Address = payload.Student_Address
	Student.Student_Fathers_Name = payload.Student_Fathers_Name
	Student.Student_Mothers_Name = payload.Student_Mothers_Name

	Student.Gender = Gender
	Student.Degree = Degree
	Student.Prefix = Prefix
	Student.Institute = Institute
	Student.Province = Province
	Student.Branch = Branch
	Student.Course = Course
	Student.Admin = Admin

	// 22: บันทึก
	if err := entity.DB().Create(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Student_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Student})
}

// ดึงข้อมูล Student มาแสดง
func ListStudentTable(c *gin.Context) {

	var Student []entity.STUDENT

	if err := entity.DB().Preload("Gender").Preload("Degree").Preload("Prefix").Preload("Institute").Preload("Province").Preload("Branch").Preload("Course").Preload("Admin").Raw("SELECT * FROM students").Scan(&Student).Find(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListStudent_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Student})
}

// ดึงข้อมูล student by id
func ListStudentByID(c *gin.Context) {

	var Student entity.STUDENT
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM students WHERE id = ?", id).Scan(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListStudentByID_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Student})
}

// ลบข้อมูล student by id
func DeleteStudentByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM students WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteStudentByID not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล student
func UpdateStudent(c *gin.Context) {
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Course entity.COURSE
	var Degree entity.DEGREE
	var Prefix entity.PREFIX
	var Gender entity.GENDER
	var Province entity.PROVINCE
	var Student entity.STUDENT
	var payload UpdateStudentPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Student_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 2: ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// 3: ค้นหา course ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Course).First(&Course); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Course not found"})
		return
	}

	// 4: ค้นหา degree ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
		return
	}

	// 5: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	// 6: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Gender).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	// 7: ค้นหา province ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Province).First(&Province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	// 8: update entity Student
	Student.ID = payload.ID
	Student.Student_Year_Of_Entry = payload.Student_Year_Of_Entry
	Student.Student_Number = payload.Student_Number
	Student.Student_Name = payload.Student_Name
	Student.Student_Birthday = payload.Student_Birthday
	Student.Student_Tel = payload.Student_Tel
	Student.Student_Identity_Card = payload.Student_Identity_Card
	Student.Student_Nationality = payload.Student_Nationality
	Student.Student_Religion = payload.Student_Religion
	Student.Student_Address = payload.Student_Address
	Student.Student_Fathers_Name = payload.Student_Fathers_Name
	Student.Student_Mothers_Name = payload.Student_Mothers_Name

	Student.Gender = Gender
	Student.Degree = Degree
	Student.Prefix = Prefix
	Student.Institute = Institute
	Student.Province = Province
	Student.Branch = Branch
	Student.Course = Course

	// 9: update
	if err := entity.DB().Where("id = ?", payload.ID).Updates(&Student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Student})
}
