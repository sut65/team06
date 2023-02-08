package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team06/entity"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type CreateActivityPayload struct {
	Activity_Student_Number string    `json:"Activity_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา, matches(^[BMD]\\d{7}$)~โปรดกรอกรหัสนักศึกษาให้ถูกต้อง"`
	Activity_Name           string    `json:"Activity_Name"`
	Location                string    `json:"Location"`
	Activity_Date           time.Time `json:"Activity_Date"`
	Activity_Year           string    `json:"Activity_Year"`
	Position                string    `json:"Position"`
	Hour                    string    `json:"Hour"`

	ActivityType uint
	Trimester    uint
	Admin        uint
}

type UpdateActivityPayload struct {
	ID                      uint      `json:"ID"`
	Activity_Student_Number string    `json:"Activity_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา, matches(^[BMD]\\d{7}$)~โปรดกรอกรหัสนักศึกษาให้ถูกต้อง"`
	Activity_Name           string    `json:"Activity_Name"`
	Location                string    `json:"Location"`
	Position                string    `json:"Position"`
	Activity_Date           time.Time `json:"Activity_Date"`
	Activity_Year           string    `json:"Activity_Year"`
	Hour                    string    `json:"Hour"`

	ActivityType uint
	Trimester    uint
}

func CreateActivity(c *gin.Context) {
	var payload CreateActivityPayload
	var Admin entity.ADMIN
	var Activity entity.ACTIVITY
	var ActivityType entity.ACTIVITYTYPE
	var Trimester entity.TRIMESTER

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Activity_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา Activity_type ด้วย id
	if tx := entity.DB().Where("id = ?", payload.ActivityType).First(&ActivityType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity type not found"})
		return
	}

	// 9: ค้นหา Trimester ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Trimester).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
		return
	}

	// 10: สร้าง entity Activity

	Activity.Activity_Student_Number = payload.Activity_Student_Number
	Activity.Activity_Name = payload.Activity_Name
	Activity.Location = payload.Location
	Activity.Position = payload.Position
	Activity.Activity_Date = payload.Activity_Date
	Activity.Activity_Year = payload.Activity_Year
	Activity.Hour = payload.Hour

	Activity.ActivityType = ActivityType
	Activity.Trimester = Trimester
	Activity.Admin = Admin

	// 11: บันทึก
	if err := entity.DB().Create(&Activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Grade_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Activity})
}

// ดึงข้อมูล Activity มาแสดง
func ListActivityTable(c *gin.Context) {

	var ActivityTable []entity.ACTIVITY

	if err := entity.DB().Preload("ActivityType").Preload("Trimester").Preload("Admin").Raw("SELECT * FROM activities").Scan(&ActivityTable).Find(&ActivityTable).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListActivityTable_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ActivityTable})
}

// ดึงข้อมูล Activity by id
func ListActivityByID(c *gin.Context) {

	var ActivityByID entity.ACTIVITY
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM activities WHERE id = ?", id).Scan(&ActivityByID).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListActivityByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ActivityByID})
}

// ลบข้อมูล Activity by id
func DeleteActivityByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM activities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteActivityByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล Activity
func UpdateActivity(c *gin.Context) {

	// var Admin entity.ADMIN
	var Activity entity.ACTIVITY
	var ActivityType entity.ACTIVITYTYPE
	var Trimester entity.TRIMESTER
	var payload UpdateActivityPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Activity_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา Activity_type ด้วย id
	if tx := entity.DB().Where("id = ?", payload.ActivityType).First(&ActivityType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity type not found"})
		return
	}

	// 9: ค้นหา Trimester ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Trimester).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
		return
	}

	// 10:update entity Activity
	Activity.ID = payload.ID
	Activity.Activity_Student_Number = payload.Activity_Student_Number
	Activity.Activity_Name = payload.Activity_Name
	Activity.Position = payload.Position
	Activity.Activity_Date = payload.Activity_Date
	Activity.Activity_Year = payload.Activity_Year
	Activity.Hour = payload.Hour

	Activity.ActivityType = ActivityType
	Activity.Trimester = Trimester
	// Activity.Admin = Admin
	// update
	if err := entity.DB().Where("id = ?", Activity.ID).Updates(&Activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Activity})
}
