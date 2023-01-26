package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"

	//*	"golang.org/x/crypto/bcrypt"

	"net/http"
)

// POST
func CreatePostponement(c *gin.Context) {
	var Prefix entity.PREFIX
	var Degree entity.DEGREE
	var Trimester entity.TRIMESTER
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Postponement entity.POSTPONEMENT

	if err := c.ShouldBindJSON(&Postponement); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	//11: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Postponement.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	//12: ค้นหาด้วย id ของ Degree
	if tx := entity.DB().Where("id = ?", Postponement.DegreeID).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
	}
	//13: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", Postponement.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//14: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", Postponement.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//15: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", Postponement.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}

	//เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	/*hashPassword, err := bcrypt.GenerateFromPassword([]byte(Admin.Admin_Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eror hashing password"})
	}*/

	//16:สร้าง entity POSTPONEMENT
	Data_Postponement := entity.POSTPONEMENT{
		Postponement_Student_Number: Postponement.Postponement_Student_Number,
		Postponement_Student_Name:   Postponement.Postponement_Student_Name,
		Postponement_AcademicYear:   Postponement.Postponement_AcademicYear,
		Postponement_Gpax:           Postponement.Postponement_Gpax,
		Postponement_Credit:         Postponement.Postponement_Credit,
		Postponement_Date:           Postponement.Postponement_Date,
		Postponement_Reasons:        Postponement.Postponement_Reasons,
		Prefix:                      Prefix,
		Degree:                      Degree,
		Trimester:                   Trimester,
		Institute:                   Institute,
		Branch:                      Branch,
	}

	//17:บันทึก
	if err := entity.DB().Create(&Data_Postponement).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Data_Postponement})

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

// แก้ไขข้อมูล Postponement
func UpdatePostponement(c *gin.Context) {
	var Prefix entity.PREFIX
	var Degree entity.DEGREE
	var Trimester entity.TRIMESTER
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Postponement entity.POSTPONEMENT
	if err := c.ShouldBindJSON(&Postponement); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	//11: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Postponement.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	//12: ค้นหาด้วย id ของ Degree
	if tx := entity.DB().Where("id = ?", Postponement.DegreeID).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
	}
	//13: ค้นหาด้วย id ของ Trimester
	if tx := entity.DB().Where("id = ?", Postponement.TrimesterID).First(&Trimester); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Trimester not found"})
	}
	//14: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", Postponement.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//15: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", Postponement.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}

	//update entity
	update := entity.POSTPONEMENT{
		Postponement_Student_Number: Postponement.Postponement_Student_Number,
		Postponement_Student_Name:   Postponement.Postponement_Student_Name,
		Postponement_AcademicYear:   Postponement.Postponement_AcademicYear,
		Postponement_Gpax:           Postponement.Postponement_Gpax,
		Postponement_Credit:         Postponement.Postponement_Credit,
		Postponement_Date:           Postponement.Postponement_Date,
		Postponement_Reasons:        Postponement.Postponement_Reasons,

		Prefix:    Prefix,
		Degree:    Degree,
		Trimester: Trimester,
		Institute: Institute,
		Branch:    Branch,
	}
	// 9: update
	if err := entity.DB().Where("id = ?", Postponement.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Postponement})
}
