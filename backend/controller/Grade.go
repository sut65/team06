package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"net/http"
)

type CreateGradePayload struct {
	Grade_Student_Number string `json:"Grade_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา, matches(^[BMD]\\d{7}$)~โปรดกรอกรหัสนักศึกษาให้ถูกต้อง"`
		Grade_Supject      string `json:"Grade_Supject" valid:"required~กรุณากรอกชื่อวิชา,maxstringlength(20)~โปรดกรอกชื่อวิชาให้ถูกต้อง"`
		Grade_Code_Supject string `json:"Grade_Code_Supject" valid:"required~กรุณากรอกรหัสวิชา, matches(^\\d{6}$)~โปรดกรอกรหัสวิชาให้ถูกต้อง"`
		Grade              string `json:"Grade"`
	
		Institute uint `json:"Institute"`
		Branch    uint `json:"Branch"`
		Admin     uint `json:"Admin"`
	}
	
	type UpdateGradePayload struct {
		ID                   uint   `json:"ID"`
		Grade_Student_Number string `json:"Grade_Student_Number" valid:"required~กรุณากรอกรหัสนักศึกษา, matches(^[BMD]\\d{7}$)~โปรดกรอกรหัสนักศึกษาให้ถูกต้อง"`
		Grade_Supject      string `json:"Grade_Supject" valid:"required~กรุณากรอกชื่อวิชา,maxstringlength(20)~โปรดกรอกชื่อวิชาให้ถูกต้อง"`
		Grade_Code_Supject string `json:"Grade_Code_Supject" valid:"required~กรุณากรอกรหัสวิชา, matches(^\\d{6}$)~โปรดกรอกรหัสวิชาให้ถูกต้อง"`
		Grade              string `json:"Grade"`
	
	
		Institute uint  `json:"Institute"`
		Branch    uint  `json:"Branch"`
	}
	
	func CreateGrade(c *gin.Context) {
		var payload CreateGradePayload
		var Admin entity.ADMIN
		var Institute entity.INSTITUTE
		var Branch entity.BRANCH
		var Grade entity.GRADE
		var Student entity.STUDENT
	
		if err := c.ShouldBindJSON(&payload); err != nil {  //bind payload to json
			c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Grade_error": err.Error()})
			return
		}
	
		if _, err := govalidator.ValidateStruct(payload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
		//  ค้นหา Institute ด้วย id
		if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
			return
		}
	
		//  ค้นหา Branch ด้วย id
		if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
			return
		}
	
		//  ค้นหา Admin ด้วย id
		if tx := entity.DB().Where("id = ?", payload.Admin).First(&Admin); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
			return
		}
	
		//  ค้นหา Student ด้วย number
		if tx := entity.DB().Where("student_number = ?", payload.Grade_Student_Number).First(&Student); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบรหัสนักศึกษานี้"})
			return
		}
	
		// 14: สร้าง entity Grade
	//ส่งจากหน้าบ้านไปหลังบ้านเข้าตัวแปร payload
		Grade.Grade_Student_Number = payload.Grade_Student_Number
		// Grade.Grade_GPA = payload.Grade_GPA
		Grade.Grade_Supject = payload.Grade_Supject
		Grade.Grade_Code_Supject = payload.Grade_Code_Supject
		Grade.Grade = payload.Grade
	
		Grade.Institute = Institute
		Grade.Branch = Branch
		//Grade.AdminID = Grade.AdminID
		Grade.Admin = Admin
		Grade.Student = Student
	
		// : บันทึก
		if err := entity.DB().Create(&Grade).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Data_Grade_error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": Grade})
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
	
	// ดึงข้อมูล Grade by student_id  
	func ListGradeByID(c *gin.Context) {
	
		var GradeByID []entity.GRADE
		id := c.Param("id")
		if err := entity.DB().Raw("SELECT * FROM grades WHERE student_id = ?", id).Scan(&GradeByID).Error; err != nil {
	
			c.JSON(http.StatusBadRequest, gin.H{"ListGradeByID_error": err.Error()})
	
			return
	
		}
	
		c.JSON(http.StatusOK, gin.H{"data": GradeByID})
	}
	
// ดึงข้อมูล Grade by id 
	func GradeByID(c *gin.Context) {
	
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
	
		var Institute entity.INSTITUTE
		var Branch entity.BRANCH
		var Grade entity.GRADE
		var payload UpdateGradePayload
		var Student entity.STUDENT
	
		if err := c.ShouldBindJSON(&payload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Grade_error": err.Error()})
			return
		}
	
		if _, err := govalidator.ValidateStruct(payload); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	
		// ค้นหา Institute  ด้วย id
		if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
			return
		}
	
		if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
			return
		}
	
		//  ค้นหา Student ด้วย number
		if tx := entity.DB().Where("student_number = ?", payload.Grade_Student_Number).First(&Student); tx.RowsAffected == 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "ไม่พบรหัสนักศึกษานี้"})
			return
		}
		// update 
		Grade.ID = payload.ID
		Grade.Grade_Student_Number = payload.Grade_Student_Number
		Grade.Grade_Supject = payload.Grade_Supject
		Grade.Grade_Code_Supject = payload.Grade_Code_Supject
		Grade.Grade = payload.Grade
	
		Grade.Institute = Institute
		Grade.Branch = Branch
		Grade.Student = Student
		//Grade.AdminID = Grade.AdminID
	
		// update
		if err := entity.DB().Where("id = ?", Grade.ID).Updates(&Grade).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"data": Grade})
	
	}
	