package controller

import (
	// "fmt"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

type CreateSuggestionPayload struct {
	Suggestion_Teacher        string    `json:"Suggestion_Teacher" valid:"required~กรุณากรอกชื่ออาจารย์"`
	Suggestion_Student_Number string    `json:"Suggestion_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Suggestion_Student_Name   string    `json:"Suggestion_Student_Name" valid:"required~กรุณากรอกชื่อสกุลนักศึกษา"`
	Suggestion_Date           time.Time `json:"Suggestion_Date"`
	Suggestion_Detail         string    `json:"Suggestion_Detail"`

	PrefixID    uint `json:"PrefixID"`
	InstituteID uint `json:"InstituteID"`
	BranchID    uint `json:"BranchID"`
	StudentID   uint `json:"StudentID"`
}

func CreatSuggestion(c *gin.Context) {

	var payload_suggestion CreateSuggestionPayload

	var Prefix entity.PREFIX
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Suggestion entity.SUGGESTION
	var Student entity.STUDENT

	if err := c.ShouldBindJSON(&payload_suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload_suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", payload_suggestion.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	}
	//10: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", payload_suggestion.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", payload_suggestion.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}
	//11: ค้นหาด้วย id ของ Student
	if tx := entity.DB().Where("id = ?", payload_suggestion.StudentID).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	//12:สร้าง entity ADMIN

	Suggestion.Suggestion_Teacher = payload_suggestion.Suggestion_Teacher
	Suggestion.Suggestion_Student_Number = payload_suggestion.Suggestion_Student_Number
	Suggestion.Suggestion_Student_Name = payload_suggestion.Suggestion_Student_Name
	Suggestion.Suggestion_Date = payload_suggestion.Suggestion_Date
	Suggestion.Suggestion_Detail = payload_suggestion.Suggestion_Detail

	Suggestion.Prefix = Prefix
	Suggestion.Institute = Institute
	Suggestion.Branch = Branch

	// StudentID: 					Suggestion.StudentID,
	Suggestion.Student = Student

	//13:บันทึก
	if err := entity.DB().Create(&Suggestion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListSuggestion_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Suggestion})
}

// ดึงข้อมูลการเสนอความคิดเห็นมาแสดง
func ListSuggestionTable(c *gin.Context) {
	var suggestion_table []entity.SUGGESTION

	if err := entity.DB().Preload("Prefix").Preload("Institute").Preload("Branch").
		Preload("Student").Raw("SELECT * FROM suggestions").Scan(&suggestion_table).Find(&suggestion_table).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": suggestion_table})
}

// ดึงข้อมูล Course by id
func ListSuggestionByID(c *gin.Context) {

	var suggestion_by_id []entity.SUGGESTION
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM suggestions WHERE student_id = ?", id).Scan(&suggestion_by_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListSuggestionByID_error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": suggestion_by_id})
}

func ListSuggestionID(c *gin.Context) {

	var suggestion_id entity.SUGGESTION
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM suggestions WHERE id = ?", id).Scan(&suggestion_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListSuggestionByID_error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": suggestion_id})
}

// ลบข้อมูล Dormitory by id
func DeleteSuggestionByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM suggestions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteSuggestionByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

type UpdateSuggestionPayload struct {
	ID                        uint      `json:"ID"`
	Suggestion_Teacher        string    `json:"Suggestion_Teacher" valid:"required~กรุณากรอกชื่ออาจารย์"`
	Suggestion_Student_Number string    `json:"Suggestion_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Suggestion_Student_Name   string    `json:"Suggestion_Student_Name" valid:"required~กรุณากรอกชื่อสกุลนักศึกษา"`
	Suggestion_Date           time.Time `json:"Suggestion_Date"`
	Suggestion_Detail         string    `json:"Suggestion_Detail"`

	PrefixID    uint `json:"PrefixID"`
	InstituteID uint `json:"InstituteID"`
	BranchID    uint `json:"BranchID"`
	StudentID   uint `json:"StudentID"`
}

// แก้ไขข้อมูล Dormitory
func UpdateSuggestion(c *gin.Context) {

	var payload_update_suggestion UpdateSuggestionPayload
	var Prefix entity.PREFIX
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Suggestion entity.SUGGESTION

	if err := c.ShouldBindJSON(&payload_update_suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload_update_suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", payload_update_suggestion.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	}
	//10: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", payload_update_suggestion.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", payload_update_suggestion.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}

	//12:สร้าง entity ADMIN
	Suggestion.ID = payload_update_suggestion.ID
	Suggestion.Suggestion_Teacher = payload_update_suggestion.Suggestion_Teacher
	Suggestion.Suggestion_Student_Number = payload_update_suggestion.Suggestion_Student_Number
	Suggestion.Suggestion_Student_Name = payload_update_suggestion.Suggestion_Student_Name
	Suggestion.Suggestion_Date = payload_update_suggestion.Suggestion_Date
	Suggestion.Suggestion_Detail = payload_update_suggestion.Suggestion_Detail

	Suggestion.Prefix = Prefix
	Suggestion.Institute = Institute
	Suggestion.Branch = Branch
	//update
	if err := entity.DB().Where("id = ?", Suggestion.ID).Updates(&Suggestion).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Suggestion})

}
