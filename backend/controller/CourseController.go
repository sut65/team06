package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

type CreateCoursePayload struct {
	Course_Name    string `json:"Course_Name"`
	Course_Teacher string `json:"Course_Teacher"`
	Course_Credit  uint   `json:"Course_Credit" valid:"range(120|200)~กรุณากรอกหน่วยกิตไม่ต่ำกว่า 120 หน่วยกิต และไม่เกิน 200 หน่วยกิต"`
	Course_Detail  string `json:"Course_Detail" valid:"minstringlength(10)~กรุณากรอกข้อมูลรายละเอียดมากกว่านี้"`
	Course_Year    uint   `json:"Course_Year"  valid:"range(2560|9999)~กรุณากรอกปีการศึกษาไม่ต่ำกว่า พ.ศ.2560"`

	Degree    uint `json:"Degree"`
	Prefix    uint `json:"Prefix"`
	Institute uint `json:"Institute"`
	Branch    uint `json:"Branch"`
	Admin     uint `json:"Admin"`
}

type UpdateCoursePayload struct {
	ID             uint   `json:"ID"`
	Course_Name    string `json:"Course_Name"`
	Course_Teacher string `json:"Course_Teacher"`
	Course_Credit  uint   `json:"Course_Credit" valid:"range(120|200)~กรุณากรอกหน่วยกิตไม่ต่ำกว่า 120 หน่วยกิต และไม่เกิน 200 หน่วยกิต"`
	Course_Detail  string `json:"Course_Detail" valid:"minstringlength(10)~กรุณากรอกข้อมูลรายละเอียดมากกว่านี้"`
	Course_Year    uint   `json:"Course_Year" valid:"range(2560|9999)~กรุณากรอกปีการศึกษาไม่ต่ำกว่า พ.ศ.2560"`

	Degree    uint `json:"Degree"`
	Prefix    uint `json:"Prefix"`
	Institute uint `json:"Institute"`
	Branch    uint `json:"Branch"`
}

func CreateCourse(c *gin.Context) {

	var Admin entity.ADMIN
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Degree entity.DEGREE
	var Prefix entity.PREFIX
	var Course entity.COURSE
	var payload CreateCoursePayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Course_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	// 11: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 12: ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// 13: ค้นหา degree ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
		return
	}

	// 14: ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Admin).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
		return
	}

	// 15: สร้าง entity Course
	Course.Course_Name = payload.Course_Name
	Course.Course_Teacher = payload.Course_Teacher
	Course.Course_Credit = payload.Course_Credit
	Course.Course_Detail = payload.Course_Detail
	Course.Course_Year = payload.Course_Year

	Course.Degree = Degree
	Course.Prefix = Prefix
	Course.Institute = Institute
	Course.Branch = Branch
	Course.Admin = Admin

	// 16: บันทึก
	if err := entity.DB().Create(&Course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Data_Course_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Course})
}

// ดึงข้อมูล Course มาแสดง
func ListCourseTable(c *gin.Context) {

	var Course []entity.COURSE

	if err := entity.DB().Preload("Degree").Preload("Prefix").Preload("Institute").Preload("Branch").Preload("Admin").Raw("SELECT * FROM courses").Scan(&Course).Find(&Course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListCourseTable_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Course})
}

// ดึงข้อมูล Course by id
func ListCourseByID(c *gin.Context) {

	var Course entity.COURSE
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM courses WHERE id = ?", id).Scan(&Course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListCourseByID_error": err.Error()})
		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Course})
}

// ลบข้อมูล Course by id
func DeleteCourseByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM courses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteCoursesByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// แก้ไขข้อมูล Course
func UpdateCourse(c *gin.Context) {
	var Institute entity.INSTITUTE
	var Branch entity.BRANCH
	var Degree entity.DEGREE
	var Prefix entity.PREFIX
	var Course entity.COURSE
	var payload UpdateCoursePayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ShouldBindJSON_Course_error": err.Error()})
		return
	}

	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Prefix).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}

	// 2: ค้นหา institute ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Institute).First(&Institute); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Institute not found"})
		return
	}

	// 3: ค้นหา branch ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Branch).First(&Branch); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Branch not found"})
		return
	}

	// 4: ค้นหา degree ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Degree).First(&Degree); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Degree not found"})
		return
	}

	// 5: สร้าง entity Course
	Course.ID = payload.ID
	Course.Course_Name = payload.Course_Name
	Course.Course_Teacher = payload.Course_Teacher
	Course.Course_Credit = payload.Course_Credit
	Course.Course_Detail = payload.Course_Detail
	Course.Course_Year = payload.Course_Year

	Course.Degree = Degree
	Course.Prefix = Prefix
	Course.Institute = Institute
	Course.Branch = Branch

	// 6: update
	if err := entity.DB().Where("id = ?", Course.ID).Updates(&Course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Course})
}
