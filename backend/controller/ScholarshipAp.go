package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreateScholarshipAp(c *gin.Context) {

	var Student entity.STUDENT
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Scholarship entity.SCHOLARSHIP
	var ScholarshipType entity.SCHOLARSHIPTYPE
	var ScholarshipAp entity.SCHOLARSHIPAP

	if err := c.ShouldBindJSON(&ScholarshipAp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_ScholarshipAp_error": err.Error()})
		return
	}

	// : ค้นหา scholarship type ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.ScholarshipTypeID).First(&ScholarshipType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ScholarshipType not found"})
		return
	}
	// : ค้นหา scholarship ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.ScholarshipID).First(&Scholarship); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Scholarship not found"})
		return
	}

	// : ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// : ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// : สร้าง entity Scholarship applicant
	Data_ScholarshipAp := entity.SCHOLARSHIPAP{
		Identity_Card: ScholarshipAp.Identity_Card,
		Reasons:       ScholarshipAp.Reasons,
		GPAX:          ScholarshipAp.GPAX,

		Scholarship:     Scholarship,
		ScholarshipType: ScholarshipType,
		Branch:          Branch,
		Institute:       Institute,
		StudentID:       ScholarshipAp.StudentID,
		Student:         Student,
	}

	// : บันทึก
	if err := entity.DB().Create(&Data_ScholarshipAp).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_ScholarshipAp_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Data_ScholarshipAp})
}

// ดึงข้อมูล scholarship applicants มาแสดง
func ListScholarshipApTable(c *gin.Context) {

	var ScholarshipAp []entity.SCHOLARSHIPAP

	if err := entity.DB().Preload("ScholarshipType").Preload("Scholarship").Preload("Branch").Preload("Institute").Preload("Student").Raw("SELECT * FROM scholarsh_ip_aps").Scan(&ScholarshipAp).Find(&ScholarshipAp).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListScholarshipAp_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ScholarshipAp})
}

// ดึงข้อมูล scholarship applicant by id
func ListScholarshipApByID(c *gin.Context) {

	var ScholarshipAp entity.SCHOLARSHIPAP
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM scholarsh_ip_aps WHERE id = ?", id).Scan(&ScholarshipAp).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListScholarshipApByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ScholarshipAp})
}

// ลบข้อมูล ScholarshipAp by id
func DeleteScholarshipApByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM scholarsh_ip_aps WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteScholarshipApByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล Scholarship Applicants
func UpdateScholarshipAp(c *gin.Context) {
	var Student entity.STUDENT
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Scholarship entity.SCHOLARSHIP
	var ScholarshipType entity.SCHOLARSHIPTYPE
	var ScholarshipAp entity.SCHOLARSHIPAP

	if err := c.ShouldBindJSON(&ScholarshipAp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_ScholarshipAp_error": err.Error()})
		return
	}

	// : ค้นหา scholarship type ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.ScholarshipTypeID).First(&ScholarshipType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ScholarshipType not found"})
		return
	}
	// : ค้นหา scholarship ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.ScholarshipID).First(&Scholarship); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Scholarship not found"})
		return
	}

	// : ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// : ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", ScholarshipAp.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	update := entity.SCHOLARSHIPAP{
		Identity_Card: ScholarshipAp.Identity_Card,
		Reasons:       ScholarshipAp.Reasons,
		GPAX:          ScholarshipAp.GPAX,

		Scholarship:     Scholarship,
		ScholarshipType: ScholarshipType,
		Branch:          Branch,
		Institute:       Institute,
		StudentID:       ScholarshipAp.StudentID,
		Student:         Student,
	}

	if err := entity.DB().Where("id = ?", ScholarshipAp.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ScholarshipAp})
}

// ดึงข้อมูล scholarship by id
func ListScholarshipByID(c *gin.Context) {
	var Scholarship entity.SCHOLARSHIP
	id := c.Param("id")

	if tx := entity.DB().Where("id = ?", id).First(&Scholarship); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Scholarship not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Scholarship})
}

// ดึงข้อมูล scholarship type by id
func ListScholarshipTypeByID(c *gin.Context) {

	var ScholarshipType entity.SCHOLARSHIPTYPE
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&ScholarshipType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ScholarshipType not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ScholarshipType})
}

func GetApplicantByID(c *gin.Context) {

	var Applicants entity.SCHOLARSHIPAP
	id := c.Param("id")
	if tx := entity.DB().Preload("ScholarshipType").Preload("Scholarship").Preload("Branch").Preload("Institute").Preload("Student").Where("id = ?", id).Find(&Applicants); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Applicants not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Applicants})
}

// get student
func GetStudentByID(c *gin.Context) {

	var Student entity.STUDENT
	id := c.Param("id")
	if tx := entity.DB().Preload("Student").Where("id = ?", id).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Student})
}

// ดึงข้อมูล scholarship applicants มาแสดง
func ListScholarshipApBySID(c *gin.Context) {

	var ScholarshipAp []entity.SCHOLARSHIPAP
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Print(err)
	}

	if tx := entity.DB().Preload("ScholarshipType").Preload("Scholarship").Preload("Branch").Preload("Institute").Preload("Student").Where("student_id = ?", id).Find(&ScholarshipAp); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"ListScholarshipAp_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": ScholarshipAp})
}
