package controller

import (
	"net/http"
	

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreateBranch(c *gin.Context) {

	var Admin entity.ADMIN
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Prefix entity.PREFIX

	if err := c.ShouldBindJSON(&Branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Branch_error": err.Error()})
		return
	}

	
	
	// 8: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", Branch.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 9: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", Branch.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Branch.AdminID).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
	}

	if _, err := govalidator.ValidateStruct(Branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: สร้าง entity Branch
	Data_Branch := entity.BRANCH{
		Branch_Name:    Branch.Branch_Name,
		Branch_Teacher: Branch.Branch_Teacher,
		Branch_Info:    Branch.Branch_Info,
		Branch_Date: Branch.Branch_Date,

		Prefix:    Prefix,
		Institute: Institute,
		AdminID:   Branch.AdminID,
		Admin:     Admin,
	}

	// 11: บันทึก
	if err := entity.DB().Create(&Data_Branch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Branch_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Data_Branch})
}

// ดึงข้อมูล Branch มาแสดง
func ListBranchTable(c *gin.Context) {

	var Branch []entity.BRANCH

	if err := entity.DB().Preload("Prefix").Preload("Institute").Preload("Admin").Raw("SELECT * FROM branches").Scan(&Branch).Find(&Branch).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListBranch_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Branch})
}

// ดึงข้อมูล branch by id
func ListBranchByID(c *gin.Context) {

	var Branch entity.BRANCH
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM branches WHERE id = ?", id).Scan(&Branch).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListBranchByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Branch})
}

// ลบข้อมูล branch by id
func DeleteBranchByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM branches WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteBranchByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล branch
func UpdateBranch(c *gin.Context) {
	var Admin entity.ADMIN
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Prefix entity.PREFIX

	if err := c.ShouldBindJSON(&Branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Branch_error": err.Error()})
		return
	}
	
	
	// 8: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", Branch.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 9: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", Branch.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Branch.AdminID).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
	}
	
	if _, err := govalidator.ValidateStruct(Branch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	update := entity.BRANCH{
		Branch_Name:    Branch.Branch_Name,
		Branch_Teacher: Branch.Branch_Teacher,
		Branch_Info:    Branch.Branch_Info,
		Branch_Date: Branch.Branch_Date,

		Prefix:    Prefix,
		Institute: Institute,
		AdminID:   Branch.AdminID,
		Admin:     Admin,
	}

	// : update
	if err := entity.DB().Where("id = ?", Branch.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Branch})
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get admin by id
func GetAdminByID(c *gin.Context) {

	var Admin entity.ADMIN
	id := c.Param("id")
	if tx := entity.DB().Preload("Admin").Where("id = ?", id).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Admin})
}
