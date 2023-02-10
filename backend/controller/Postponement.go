package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"net/http"
	"time"
)

type CreatePostponementPayload struct {
	Postponement_Student_Number string    `json:"Postponement_Student_Number" valid:"required,matches(^[BMD]\\d{7}$)~กรุณากรอกรหัสนักศึกษาให้ตรงรูปแบบ"`
	Postponement_Student_Name   string    `json:"Postponement_Student_Name" valid:"required~name cannot be blank"`
	Postponement_AcademicYear   string    `json:"Postponement_AcademicYear"`
	Postponement_Gpax           string    `json:"Postponement_Gpax"`
	Postponement_Credit         string    `json:"Postponement_Credit"`
	Postponement_Date           time.Time `json:"Postponement_Date"`
	Postponement_Reasons        string    `json:"Postponement_Reasons" valid:"required, minstringlength(10)~กรุณากรอกเหตุผลอย่างน้อย10ตัวอักษร"`

	Prefix    *uint `json:"Prefix"`
	Degree    *uint `json:"Degree"`
	Trimester *uint `json:"Trimester"`
	Institute *uint `json:"Institute"`
	Branch    *uint `json:"Branch"`
	Student   *uint `json:"Student"`
}

// POST
func CreatePostponement(c *gin.Context) {
	var payload CreatePostponementPayload
	var Prefix entity.PREFIX
	var Degree entity.DEGREE
	var Trimester entity.TRIMESTER
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Postponement entity.POSTPONEMENT
	var Student entity.STUDENT

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Student_error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//11: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	//12: ค้นหาด้วย id ของ Degree
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
	}
	//13: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", payload.Trimester).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//14: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//15: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}
	// 19: ค้นหาด้วย id
	if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	//16:สร้าง entity POSTPONEMENT

	Postponement.Postponement_Student_Number = payload.Postponement_Student_Number
	Postponement.Postponement_Student_Name = payload.Postponement_Student_Name
	Postponement.Postponement_AcademicYear = payload.Postponement_AcademicYear
	Postponement.Postponement_Gpax = payload.Postponement_Gpax
	Postponement.Postponement_Credit = payload.Postponement_Credit
	Postponement.Postponement_Date = payload.Postponement_Date
	Postponement.Postponement_Reasons = payload.Postponement_Reasons

	Postponement.Prefix = Prefix
	Postponement.Degree = Degree
	Postponement.Trimester = Trimester
	Postponement.Institute = Institute
	Postponement.Branch = Branch
	Postponement.Student = Student

	//17:บันทึก
	if err := entity.DB().Create(&Postponement).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Postponement_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Postponement})
}

// ดึงข้อมูล Postponement มาแสดง
func ListPostponementTable(c *gin.Context) {

	var Postponement []entity.POSTPONEMENT

	if err := entity.DB().Preload("Prefix").Preload("Degree").Preload("Trimester").Preload("Institute").Preload("Branch").Raw("SELECT * FROM postponements").Scan(&Postponement).Find(&Postponement).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListPostponement_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Postponement})
}

// ดึงข้อมูล Postponement by id
func ListPostponementByID(c *gin.Context) {
	var Postponement entity.POSTPONEMENT
	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM postponements WHERE id = ?", id).Scan(&Postponement).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListPostponementByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Postponement})
}

// ลบข้อมูล Postponement by id
func DeletePostponementByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM postponements WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeletePostponementByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

type UpdatePostponementPayload struct {
	ID                          uint      `json:"ID"`
	Postponement_Student_Number string    `json:"Postponement_Student_Number" valid:"required,matches(^[BMD]\\d{7}$)~กรุณากรอกรหัสนักศึกษาให้ตรงรูปแบบ"`
	Postponement_Student_Name   string    `json:"Postponement_Student_Name" valid:"required~name cannot be blank"`
	Postponement_AcademicYear   string    `json:"Postponement_AcademicYear"`
	Postponement_Gpax           string    `json:"Postponement_Gpax"`
	Postponement_Credit         string    `json:"Postponement_Credit"`
	Postponement_Date           time.Time `json:"Postponement_Date"`
	Postponement_Reasons        string    `json:"Postponement_Reasons" valid:"required, minstringlength(10)~กรุณากรอกเหตุผลอย่างน้อย10ตัวอักษร"`

	Prefix    *uint `json:"Prefix"`
	Degree    *uint `json:"Degree"`
	Trimester *uint `json:"Trimester"`
	Institute *uint `json:"Institute"`
	Branch    *uint `json:"Branch"`
}

// แก้ไขข้อมูล Postponement
func UpdatePostponement(c *gin.Context) {
	var payload UpdatePostponementPayload
	var Prefix entity.PREFIX
	var Degree entity.DEGREE
	var Trimester entity.TRIMESTER
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Postponement entity.POSTPONEMENT
	// var Student entity.STUDENT
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_error": err.Error()})
		return
	}
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//11: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	//12: ค้นหาด้วย id ของ Degree
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
	}
	//13: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", payload.Trimester).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//14: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//15: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}
	// 19: ค้นหา student ด้วย id
	// if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
	// 	return
	// }

	//update entity
	Postponement.ID = payload.ID
	Postponement.Postponement_Student_Number = payload.Postponement_Student_Number
	Postponement.Postponement_Student_Name = payload.Postponement_Student_Name
	Postponement.Postponement_AcademicYear = payload.Postponement_AcademicYear
	Postponement.Postponement_Gpax = payload.Postponement_Gpax
	Postponement.Postponement_Credit = payload.Postponement_Credit
	Postponement.Postponement_Date = payload.Postponement_Date
	Postponement.Postponement_Reasons = payload.Postponement_Reasons

	Postponement.Prefix = Prefix
	Postponement.Degree = Degree
	Postponement.Trimester = Trimester
	Postponement.Institute = Institute
	Postponement.Branch = Branch

	//17:บันทึก
	if err := entity.DB().Where("id = ?", Postponement.ID).Updates(&Postponement).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return

	}
	c.JSON(http.StatusOK, gin.H{"data": Postponement})
}
