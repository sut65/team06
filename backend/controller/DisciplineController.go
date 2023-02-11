package controller

import (
	"net/http"

	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"github.com/asaskevich/govalidator"
)

type CreateDisciplinePayload struct {
	//Admin FK
	Admin uint `json:"Admin"`

	//Student FK
	Student uint `json:"Student"`

	//DisciplineType FK
	DisciplineType uint `json:"DisciplineType"`

	Discipline_Reason     string    `json:"Discipline_Reason" valid:"required~Discipline_Reason cannot be blank"`
	Discipline_Punishment string    `json:"Discipline_Punishment" valid:"required~Discipline_Punishment cannot be blank"`
	Discipline_Point      uint      `json:"Discipline_Point" valid:"required~Discipline_Point cannot be blank, range(1|5)"`
	Added_Time            time.Time `json:"Added_Time"`
}

type UpdateDisciplinePayload struct {
	ID uint `json:"ID"`
	//Admin FK
	Admin uint `json:"Admin"`

	//Student FK
	Student uint `json:"Student"`

	//DisciplineType FK
	DisciplineType uint `json:"DisciplineType"`

	Discipline_Reason     string    `json:"Discipline_Reason" valid:"required~Discipline_Reason cannot be blank"`
	Discipline_Punishment string    `json:"Discipline_Punishment" valid:"required~Discipline_Punishment cannot be blank"`
	Discipline_Point      uint      `json:"Discipline_Point" valid:"required~Discipline_Point cannot be blank, range(1|5)"`
	Added_Time            time.Time `json:"Added_Time"`
}

//DisciplineType

// POST /disciplineType

func CreateDisciplineType(c *gin.Context) {

	var disciplineType entity.DisciplineType

	if err := c.ShouldBindJSON(&disciplineType); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&disciplineType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": disciplineType})

}

// GET /disciplineType/:id

func GetDisciplineType(c *gin.Context) {

	var disciplineType entity.DisciplineType

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM discipline_types WHERE id = ?", id).Scan(&disciplineType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": disciplineType})

}

// GET /disciplineTypes

func ListDisciplineType(c *gin.Context) {

	var disciplineTypes []entity.DisciplineType

	if err := entity.DB().Raw("SELECT * FROM discipline_types").Scan(&disciplineTypes).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": disciplineTypes})

}

// DELETE /admins/:id
func DeleteDisciplineType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM discipline_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DisciplineType not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /disciplineTypes

func UpdateDisciplineType(c *gin.Context) {

	var disciplineType entity.DisciplineType

	if err := c.ShouldBindJSON(&disciplineType); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", disciplineType.ID).First(&disciplineType); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "disciplineType not found"})

		return

	}

	if err := entity.DB().Save(&disciplineType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": disciplineType})

}

//Discipline

// POST /discipline

func CreateDiscipline(c *gin.Context) {

	var payload CreateDisciplinePayload

	var Discipline entity.Discipline
	var Admin entity.ADMIN
	var Student entity.STUDENT
	var DisciplineType entity.DisciplineType

	//1
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 2: ค้นหา DisciplineType ด้วย id
	if tx := entity.DB().Where("id = ?", payload.DisciplineType).First(&DisciplineType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DisciplineType not found"})
		return
	}

	// 3: ค้นหา Student ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	// 4: ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Admin).First(&Admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "visitor_type not found"})
		return
	}

	// // 5: สร้าง Discipline
	// dp := entity.Discipline{
	// 	AdminID:               Discipline.AdminID,          // โยงความสัมพันธ์กับ Entity Admin
	// 	StudentID:             Discipline.StudentID,        // โยงความสัมพันธ์กับ Entity Student
	// 	DisciplineTypeID:      Discipline.DisciplineTypeID, // โยงความสัมพันธ์กับ Entity DisciplineType
	// 	Discipline_Reason:     Discipline.Discipline_Reason,
	// 	Discipline_Punishment: Discipline.Discipline_Punishment,
	// 	Discipline_Point:      Discipline.Discipline_Point,
	// 	Added_Time:            Discipline.Added_Time, // ตั้งค่าฟิลด์ Added_Time
	// }

	// 5: สร้าง Discipline
	Discipline.Admin = Admin                   // โยงความสัมพันธ์กับ Entity Admin
	Discipline.Student = Student               // โยงความสัมพันธ์กับ Entity Student
	Discipline.DisciplineType = DisciplineType // โยงความสัมพันธ์กับ Entity DisciplineType
	Discipline.Discipline_Reason = payload.Discipline_Reason
	Discipline.Discipline_Punishment = payload.Discipline_Punishment
	Discipline.Discipline_Point = payload.Discipline_Point
	Discipline.Added_Time = payload.Added_Time // ตั้งค่าฟิลด์ Added_Time

	//6: บันทึก
	if err := entity.DB().Create(&Discipline).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Discipline})
}

// GET /discipline/:id

func GetDiscipline(c *gin.Context) {

	var discipline entity.Discipline

	id := c.Param("id")

	if err := entity.DB().Preload("DisciplineType").Preload("Student").Raw("SELECT * FROM disciplines WHERE id = ?", id).Scan(&discipline).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": discipline})

}

// GET /disciplines

func ListDiscipline(c *gin.Context) {

	var disciplines []entity.Discipline

	if err := entity.DB().Preload("DisciplineType").Preload("Student").Raw("SELECT * FROM disciplines").Scan(&disciplines).Find(&disciplines).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": disciplines})

}

// DELETE /disciplines/:id
func DeleteDiscipline(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM disciplines WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Discipline not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /discipline

func UpdateDiscipline(c *gin.Context) {

	var payload UpdateDisciplinePayload

	var Discipline entity.Discipline
	var Admin entity.ADMIN
	var Student entity.STUDENT
	var DisciplineType entity.DisciplineType

	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 1: ค้นหา Student ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})

		return

	}

	// 2: ค้นหา Admin ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Admin).First(&Admin); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})

		return

	}

	// 3: ค้นหา DisciplineType ด้วย id
	if tx := entity.DB().Where("id = ?", payload.DisciplineType).First(&DisciplineType); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "DisciplineType not found"})

		return

	}

	// // 4: สร้าง Discipline
	// update := entity.Discipline{
	// 	AdminID:               Discipline.AdminID,          // โยงความสัมพันธ์กับ Entity Admin
	// 	StudentID:             Discipline.StudentID,        // โยงความสัมพันธ์กับ Entity Student
	// 	DisciplineTypeID:      Discipline.DisciplineTypeID, // โยงความสัมพันธ์กับ Entity DisciplineType
	// 	Discipline_Reason:     Discipline.Discipline_Reason,
	// 	Discipline_Punishment: Discipline.Discipline_Punishment,
	// 	Discipline_Point:      Discipline.Discipline_Point,
	// 	Added_Time:            Discipline.Added_Time, // ตั้งค่าฟิลด์ Added_Time
	// }

	// 4: สร้าง Discipline
	Discipline.ID = payload.ID
	Discipline.Admin = Admin                   // โยงความสัมพันธ์กับ Entity Admin
	Discipline.Student = Student               // โยงความสัมพันธ์กับ Entity Student
	Discipline.DisciplineType = DisciplineType // โยงความสัมพันธ์กับ Entity DisciplineType
	Discipline.Discipline_Reason = payload.Discipline_Reason
	Discipline.Discipline_Punishment = payload.Discipline_Punishment
	Discipline.Discipline_Point = payload.Discipline_Point
	Discipline.Added_Time = payload.Added_Time // ตั้งค่าฟิลด์ Added_Time

	// 5: update
	if err := entity.DB().Where("id = ?", payload.ID).Updates(&Discipline).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Discipline})

}
