package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreateGrade(c *gin.Context) {

	var Admin entity.ADMIN
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Grade entity.GRADE

	if err := c.ShouldBindJSON(&Grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Grade_error": err.Error()})
		return
	}
	// 8: ค้นหา Institute ด้วย id
	if tx := entity.DB().Where("id = ?", Grade.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 9: ค้นหา Branch ด้วย id
	if tx := entity.DB().Where("id = ?", Grade.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// 14: สร้าง entity Grade
	Data_Grade := entity.GRADE{
		Grade_Student_Number: Grade.Grade_Student_Number,
		Grade_GPA:            Grade.Grade_GPA,
		Grade_Supject:        Grade.Grade_Supject,
		Grade_Code_Supject:   Grade.Grade_Code_Supject,
		Grade:                Grade.Grade,

		Institute: Institute,
		Branch:    Branch,
		AdminID:   Grade.AdminID,
		Admin:     Admin,
	}
	// 11: บันทึก
	if err := entity.DB().Create(&Data_Grade).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Grade_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Data_Grade})
}

// ดึงข้อมูล Grade มาแสดง
func ListGradeTable(c *gin.Context) {

	var GradeTable []entity.GRADE

	if err := entity.DB().Preload("Institute").Preload("Branch").Preload("Admin").Raw("SELECT * FROM grades").Scan(&GradeTable).Find(&GradeTable).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListGradeTable_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GradeTable})
}

// ดึงข้อมูล Grade by id
func ListGradeByID(c *gin.Context) {

	var GradeByID entity.GRADE
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM grades WHERE id = ?", id).Scan(&GradeByID).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListGradeByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": GradeByID})
}

// ลบข้อมูล Grade by id
func DeleteGradeByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM grades WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteGradeByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล Grade
func UpdateGrade(c *gin.Context) {
	var Admin entity.ADMIN
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Grade entity.GRADE

	if err := c.ShouldBindJSON(&Grade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Grade_error": err.Error()})
		return
	}

	

	// ค้นหา Institute  ด้วย id
	if tx := entity.DB().Where("id = ?", Grade.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", Grade.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}
	// update
	update := entity.GRADE{
		Grade_Student_Number: Grade.Grade_Student_Number,
		Grade_GPA:            Grade.Grade_GPA,
		Grade_Supject:        Grade.Grade_Supject,
		Grade_Code_Supject:   Grade.Grade_Code_Supject,
		Grade:                Grade.Grade,

		Institute: Institute,
		Branch:    Branch,
		AdminID:   Grade.AdminID,
		Admin:     Admin,
	}
	// update
	if err := entity.DB().Where("id = ?", Grade.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Grade})

}
