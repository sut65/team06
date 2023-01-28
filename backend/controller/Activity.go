package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreateActivity(c *gin.Context) {

	var Admin entity.ADMIN
	var Activity entity.ACTIVITY
	var ActivityType entity.ACTIVITYTYPE
	var Trimester entity.TRIMESTER

	if err := c.ShouldBindJSON(&Activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Activity_error": err.Error()})
		return
	}

	// 8: ค้นหา Activity_type ด้วย id
	if tx := entity.DB().Where("id = ?", Activity.ActivityTypeID).First(&ActivityType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity type not found"})
		return
	}

	// 9: ค้นหา Trimester ด้วย id
	if tx := entity.DB().Where("id = ?", Activity.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
		return
	}

	// 10: สร้าง entity Activity
	Data_Activity := entity.ACTIVITY{
		Activity_Student_Number: Activity.Activity_Student_Number,
		Activity_Name:           Activity.Activity_Name,
		Location:                Activity.Location,
		Position:                Activity.Position,
		Activity_Date:           Activity.Activity_Date,
		Activity_Year:           Activity.Activity_Year,
		Hour:                    Activity.Hour,

		ActivityType: ActivityType,
		Trimester:    Trimester,
		AdminID:      Activity.AdminID,
		Admin:        Admin,
	}
	// 11: บันทึก
	if err := entity.DB().Create(&Data_Activity).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Grade_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Data_Activity})
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

	var Admin entity.ADMIN
	var Activity entity.ACTIVITY
	var ActivityType entity.ACTIVITYTYPE
	var Trimester entity.TRIMESTER

	if err := c.ShouldBindJSON(&Activity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Activity_error": err.Error()})
		return
	}

	// 8: ค้นหา Activity_type ด้วย id
	if tx := entity.DB().Where("id = ?", Activity.ActivityTypeID).First(&ActivityType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Activity type not found"})
		return
	}

	// 9: ค้นหา Trimester ด้วย id
	if tx := entity.DB().Where("id = ?", Activity.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
		return
	}

	// 10:update entity Activity
	update := entity.ACTIVITY{
		Activity_Student_Number: Activity.Activity_Student_Number,
		Activity_Name:           Activity.Activity_Name,
		Location:                Activity.Location,
		Position:                Activity.Position,
		Activity_Date:           Activity.Activity_Date,
		Activity_Year:           Activity.Activity_Year,
		Hour:                    Activity.Hour,

		ActivityType: ActivityType,
		Trimester:    Trimester,
		AdminID:      Activity.AdminID,
		Admin:        Admin,
	}
	// 11: บันทึก
	if err := entity.DB().Where("id = ?", Activity.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Activity})
}



