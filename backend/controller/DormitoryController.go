package controller

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"github.com/asaskevich/govalidator"
)

type CreateDormitoryPayload struct {
	Dormitory_Student_Number string `json:"Dormitory_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Dormitory_AcademicYear   uint   `json:"Dormitory_AcademicYear" valid:"required~กรุณากรอกปีการศึกษา4หลัก, matches(^\\d{4}$)"`
	Room_Number              uint   `json:"Room_Number"`

	TrimesterID     uint `json:"TrimesterID"`
	DormitoryTypeID uint `json:"DormitoryTypeID"`
	RoomTypeID      uint `json:"RoomTypeID"`
	BranchID        uint `json:"BranchID"`
	AdminID         uint `json:"AdminID"`
}

func CreateDormitory(c *gin.Context) {

	var payload_dormitory CreateDormitoryPayload

	var DormitoryType entity.DORMITORYTYPE
	var RoomType entity.ROOMTYPE
	var Trimester entity.TRIMESTER
	var Branch entity.BRANCH
	var Dormitory entity.DORMITORY
	var Admin entity.ADMIN

	if err := c.ShouldBindJSON(&payload_dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Student_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload_dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", payload_dormitory.DormitoryTypeID).First(&DormitoryType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DormitoryType not found"})
	}
	//10: ค้นหาด้วย id ของ Gender
	if tx := entity.DB().Where("id = ?", payload_dormitory.RoomTypeID).First(&RoomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
	}
	//11: ค้นหาด้วย id ของ Province
	if tx := entity.DB().Where("id = ?", payload_dormitory.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//11: ค้นหาด้วย id ของ Province
	if tx := entity.DB().Where("id = ?", payload_dormitory.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}

	// 19: ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", payload_dormitory.AdminID).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}


	//12:สร้าง entity DORMITORY
	Dormitory.Dormitory_Student_Number = payload_dormitory.Dormitory_Student_Number
	Dormitory.Dormitory_AcademicYear = payload_dormitory.Dormitory_AcademicYear
	Dormitory.Room_Number = payload_dormitory.Room_Number

	Dormitory.Trimester = Trimester
	Dormitory.DormitoryType = DormitoryType
	Dormitory.RoomType = RoomType
	Dormitory.Branch = Branch

	// AdminID: Dormitory.AdminID,
	Dormitory.Admin = Admin

	//13:บันทึก
	if err := entity.DB().Create(&Dormitory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Dormitory})

}

// ดึงข้อมูลหอพักนักศึกษามาแสดง
func ListDormitoryTable(c *gin.Context) {
	var dormitory_table []entity.DORMITORY

	if err := entity.DB().Preload("DormitoryType").Preload("RoomType").Preload("Trimester").Preload("Branch").
		Preload("Admin").Raw("SELECT * FROM dormitories").Scan(&dormitory_table).Find(&dormitory_table).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormitory_table})
}


// ดึงข้อมูล Dormitory by id
func ListDormitoryByID(c *gin.Context) {

	var dormitory_by_id entity.DORMITORY
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM dormitories WHERE id = ?", id).Scan(&dormitory_by_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListDormitoryByID_error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dormitory_by_id})
}

// ลบข้อมูล Dormitory by id
func DeleteDormitoyByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dormitories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteDormitoriesByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

type UpdateDormitoryPayload struct {
	ID 						 uint 	`json:"ID"`
	Dormitory_Student_Number string `json:"Dormitory_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษาขึ้นต้นด้วยBหรือMหรือDและตามด้วยตัวเลข6หลัก, matches(^[BMD]\\d{7}$)"`
	Dormitory_AcademicYear   uint   `json:"Dormitory_AcademicYear"`
	Room_Number              uint   `json:"Room_Number"`

	TrimesterID     uint `json:"TrimesterID"`
	DormitoryTypeID uint `json:"DormitoryTypeID"`
	RoomTypeID      uint `json:"RoomTypeID"`
	BranchID        uint `json:"BranchID"`
	AdminID         uint `json:"AdminID"`
}

// แก้ไขข้อมูล Dormitory
func UpdateDormitory(c *gin.Context) {

	var payload_update_dormitory UpdateDormitoryPayload

	var DormitoryType entity.DORMITORYTYPE
	var RoomType entity.ROOMTYPE
	var Trimester entity.TRIMESTER
	var Branch entity.BRANCH
	var Dormitory entity.DORMITORY
	// var Admin entity.ADMIN

	if err := c.ShouldBindJSON(&payload_update_dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload_update_dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ DormitoryType
	if tx := entity.DB().Where("id = ?", payload_update_dormitory.DormitoryTypeID).First(&DormitoryType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DormitoryType not found"})
	}
	//10: ค้นหาด้วย id ของ RoomType
	if tx := entity.DB().Where("id = ?", payload_update_dormitory.RoomTypeID).First(&RoomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
	}
	//11: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", payload_update_dormitory.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", payload_update_dormitory.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}

	//12:สร้าง entity DORMITORY

	Dormitory.ID = payload_update_dormitory.ID
	Dormitory.Dormitory_Student_Number = payload_update_dormitory.Dormitory_Student_Number
	Dormitory.Dormitory_AcademicYear = payload_update_dormitory.Dormitory_AcademicYear
	Dormitory.Room_Number = payload_update_dormitory.Room_Number

	Dormitory.Trimester = Trimester
	Dormitory.DormitoryType = DormitoryType
	Dormitory.RoomType = RoomType
	Dormitory.Branch = Branch

	// AdminID: Dormitory.AdminID,
	// Dormitory.Admin = Admin

	//update
	if err := entity.DB().Where("id = ?", Dormitory.ID).Updates(&Dormitory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Dormitory})

}
