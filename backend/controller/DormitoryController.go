package controller

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreateDormitory(c *gin.Context) {
	var DormitoryType entity.DORMITORYTYPE
	var RoomType entity.ROOMTYPE
	var Trimester entity.TRIMESTER
	var Branch entity.BRANCH
	var Dormitory entity.DORMITORY

	if err := c.ShouldBindJSON(&Dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Dormitory.DormitoryTypeID).First(&DormitoryType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DormitoryType not found"})
	}
	//10: ค้นหาด้วย id ของ Gender
	if tx := entity.DB().Where("id = ?", Dormitory.RoomTypeID).First(&RoomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
	}
	//11: ค้นหาด้วย id ของ Province
	if tx := entity.DB().Where("id = ?", Dormitory.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//11: ค้นหาด้วย id ของ Province
	if tx := entity.DB().Where("id = ?", Dormitory.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}


	//12:สร้าง entity ADMIN
	dm := entity.DORMITORY{
		Dormitory_Student_Number: Dormitory.Dormitory_Student_Number,
		Dormitory_AcademicYear:   Dormitory.Dormitory_AcademicYear,
		Room_Number:              Dormitory.Room_Number,
		Trimester:     Trimester,
		DormitoryType: DormitoryType,
		RoomType:      RoomType,
		Branch:        Branch,
	}

	//13:บันทึก
	if err := entity.DB().Create(&dm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dm})

}

// ดึงข้อมูลหอพักนักศึกษามาแสดง 
func ListDormitoryTable(c *gin.Context) {
	var dormitory_table []entity.DORMITORY

	if err := entity.DB().Preload("DormitoryType").Preload("RoomType").Preload("Trimester").Preload("Branch").
	Raw("SELECT * FROM dormitories").Scan(&dormitory_table).Find(&dormitory_table).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dormitory_table})
}

// // ดึงข้อมูล Admin มาแสดง 
// func ListAdminTable(c *gin.Context) {
// 	var admin_table []entity.ADMIN
// 	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Province").Raw("SELECT * FROM admins").
// 	Scan(&admin_table).Find(&admin_table).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": admin_table})

// }

// ดึงข้อมูล Dormitory by id 
func ListDormitoryByID(c *gin.Context) {

	var dormitory_by_id []entity.DORMITORY
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

// แก้ไขข้อมูล Dormitory
func UpdateDormitory(c *gin.Context) {
	var DormitoryType entity.DORMITORYTYPE
	var RoomType entity.ROOMTYPE
	var Trimester entity.TRIMESTER
	var Branch entity.BRANCH
	var Dormitory entity.DORMITORY

	if err := c.ShouldBindJSON(&Dormitory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ DormitoryType
	if tx := entity.DB().Where("id = ?", Dormitory.DormitoryTypeID).First(&DormitoryType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DormitoryType not found"})
	}
	//10: ค้นหาด้วย id ของ RoomType
	if tx := entity.DB().Where("id = ?", Dormitory.RoomTypeID).First(&RoomType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RoomType not found"})
	}
	//11: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", Dormitory.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", Dormitory.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}


	//12:สร้าง entity DORMITORY
	updatedm := entity.DORMITORY{
		Dormitory_Student_Number: 	Dormitory.Dormitory_Student_Number,
		Dormitory_AcademicYear:  	Dormitory.Dormitory_AcademicYear,
		Room_Number:              	Dormitory.Room_Number,
		Trimester:     				Trimester,
		DormitoryType: 				DormitoryType,
		RoomType:      				RoomType,
		Branch:        				Branch,
	}

	//update
	if err := entity.DB().Where("id = ?", Dormitory.ID).Updates(&updatedm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Dormitory})

}