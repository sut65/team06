package controller

import (
	// "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

func CreatSuggestion(c *gin.Context)  {
	
	var Prefix entity.PREFIX
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Suggestion entity.SUGGESTION

	if err := c.ShouldBindJSON(&Suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Suggestion.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	}
	//10: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", Suggestion.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", Suggestion.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}


	//12:สร้าง entity ADMIN
	sg := entity.SUGGESTION{
		Suggestion_Teacher:       	Suggestion.Suggestion_Teacher,
		Suggestion_Student_Number:	Suggestion.Suggestion_Student_Number,
		Suggestion_Student_Name:  	Suggestion.Suggestion_Student_Name,
		Suggestion_Date:         	Suggestion.Suggestion_Date,
		Suggestion_Detail:       	Suggestion.Suggestion_Detail,
		Prefix:    					Prefix,
		Institute: 					Institute,
		Branch:    					Branch,
	}

	//13:บันทึก
	if err := entity.DB().Create(&sg).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sg})
}

// ดึงข้อมูลการเสนอความคิดเห็นมาแสดง
func ListSuggestionTable(c *gin.Context) {
	var suggestion_table []entity.SUGGESTION

	if err := entity.DB().Preload("Prefix").Preload("Institute").Preload("Branch").
	Raw("SELECT * FROM suggestions").Scan(&suggestion_table).Find(&suggestion_table).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": suggestion_table})
}

// // ดึงข้อมูล Student มาแสดง 
// func ListStudentTable(c *gin.Context) {

// 	var student_table []entity.STUDENT

// 	if err := entity.DB().Preload("Gender").Preload("Degree").Preload("Prefix").Preload("Institute").Preload("Province").Preload("Branch").
// 	Preload("Course").Preload("Admin").Raw("SELECT * FROM students").Scan(&student_table).Find(&student_table).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"ListStudent_error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": student_table})
// }

// ดึงข้อมูล Course by id 
func ListSuggestionByID(c *gin.Context) {

	var suggestion_by_id []entity.SUGGESTION
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM suggestions WHERE id = ?", id).Scan(&suggestion_by_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListSuggestionByID_error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": suggestion_by_id})
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
// แก้ไขข้อมูล Dormitory
func UpdateSuggestion(c *gin.Context) {

	var Prefix entity.PREFIX
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Suggestion entity.SUGGESTION

	if err := c.ShouldBindJSON(&Suggestion); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Suggestion.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	}
	//10: ค้นหาด้วย id ของ Institute
	if tx := entity.DB().Where("id = ?", Suggestion.InstituteID).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
	}
	//11: ค้นหาด้วย id ของ Branch
	if tx := entity.DB().Where("id = ?", Suggestion.BranchID).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
	}


	//12:สร้าง entity ADMIN
	updatesg := entity.SUGGESTION{
		Suggestion_Teacher:       	Suggestion.Suggestion_Teacher,
		Suggestion_Student_Number:	Suggestion.Suggestion_Student_Number,
		Suggestion_Student_Name:  	Suggestion.Suggestion_Student_Name,
		Suggestion_Date:         	Suggestion.Suggestion_Date,
		Suggestion_Detail:       	Suggestion.Suggestion_Detail,
		Prefix:    					Prefix,
		Institute: 					Institute,
		Branch:    					Branch,
	}

	//update
	if err := entity.DB().Where("id = ?", Suggestion.ID).Updates(&updatesg).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Suggestion})

}