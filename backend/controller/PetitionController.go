package controller

import (
	"net/http"

	"time"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"github.com/asaskevich/govalidator"
)

func init() {
	govalidator.CustomTypeTagMap.Set("startdate", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-60 * time.Minute)) {
			return false
		} else {
			return true
		}
	})

	govalidator.CustomTypeTagMap.Set("addedtime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-60 * time.Minute)) || t.After(time.Now().Add(60*time.Minute)) {
			return false
		} else {
			return true
		}
	})
}

type CreatePetitionPayload struct {

	//Student FK
	Student uint `json:"Student"`

	//PetitionType FK
	PetitionType uint `json:"PetitionType"`

	//PetitionPeriod FK
	PetitionPeriod uint `json:"PetitionPeriod"`

	Petition_Reason    string    `json:"Petition_Reason" valid:"required~Petition_Reason cannot be blank"`
	Petition_Startdate time.Time `json:"Petition_Startdate" valid:"required~Petition_Startdate cannot be blank, startdate~Petition_Startdate is invalid"`
	Petition_Enddate   time.Time `json:"Petition_Enddate"`
	Added_Time         time.Time `json:"Added_Time" valid:"addedtime~Added_Time is invalid"`
}

type UpdatePetitionPayload struct {
	ID uint `json:"ID"`
	//Student FK
	Student uint `json:"Student"`

	//PetitionType FK
	PetitionType uint `json:"PetitionType"`

	//PetitionPeriod FK
	PetitionPeriod uint `json:"PetitionPeriod"`

	Petition_Reason    string    `json:"Petition_Reason" valid:"required~Petition_Reason cannot be blank"`
	Petition_Startdate time.Time `json:"Petition_Startdate" valid:"startdate~Petition_Startdate is invalid"`
	Petition_Enddate   time.Time `json:"Petition_Enddate"`
	Added_Time         time.Time `json:"Added_Time" valid:"addedtime"`
}

//PetitionType

// POST /petitionType

func CreatePetitionType(c *gin.Context) {

	var petitionType entity.PetitionType

	if err := c.ShouldBindJSON(&petitionType); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&petitionType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionType})

}

// GET /petitionType/:id

func GetPetitionType(c *gin.Context) {

	var petitionType entity.PetitionType

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM petition_types WHERE id = ?", id).Scan(&petitionType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionType})

}

// GET /petitionTypes

func ListPetitionType(c *gin.Context) {

	var petitionTypes []entity.PetitionType

	if err := entity.DB().Raw("SELECT * FROM petition_types").Scan(&petitionTypes).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionTypes})

}

// DELETE /petitionType/:id
func DeletePetitionType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM petition_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PetitionType not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /petitionTypes

func UpdatePetitionType(c *gin.Context) {

	var petitionType entity.PetitionType

	if err := c.ShouldBindJSON(&petitionType); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", petitionType.ID).First(&petitionType); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "PetitionType not found"})

		return

	}

	if err := entity.DB().Save(&petitionType).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionType})

}

//PetitionPeriod

// POST /petitionPeriod

func CreatePetitionPeriod(c *gin.Context) {

	var petitionPeriod entity.PetitionPeriod

	if err := c.ShouldBindJSON(&petitionPeriod); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&petitionPeriod).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionPeriod})

}

// GET /petitionPeriod/:id

func GetPetitionPeriod(c *gin.Context) {

	var petitionPeriod entity.PetitionPeriod

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM petition_periods WHERE id = ?", id).Scan(&petitionPeriod).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionPeriod})

}

// GET /petitionPeriods

func ListPetitionPeriod(c *gin.Context) {

	var petitionPeriods []entity.PetitionPeriod

	if err := entity.DB().Raw("SELECT * FROM petition_periods").Scan(&petitionPeriods).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionPeriods})

}

// DELETE /petitionPeriod/:id
func DeletePetitionPeriod(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM petition_periods WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PetitionPeriod not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /petitionPeriods

func UpdatePetitionPeriod(c *gin.Context) {

	var petitionPeriod entity.PetitionPeriod

	if err := c.ShouldBindJSON(&petitionPeriod); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", petitionPeriod.ID).First(&petitionPeriod); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "PetitionPeriod not found"})

		return

	}

	if err := entity.DB().Save(&petitionPeriod).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitionPeriod})

}

//Petition

// POST /petition

func CreatePetition(c *gin.Context) {
	var payload CreatePetitionPayload

	var Petition entity.Petition
	var Student entity.STUDENT
	var PetitionType entity.PetitionType
	var PetitionPeriod entity.PetitionPeriod

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

	// 2: ค้นหา PetitionType ด้วย id
	if tx := entity.DB().Where("id = ?", payload.PetitionType).First(&PetitionType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition_type not found"})
		return
	}

	// 3: ค้นหา PetitionPeriod ด้วย id
	if tx := entity.DB().Where("id = ?", payload.PetitionPeriod).First(&PetitionPeriod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition_period not found"})
		return
	}

	// 4: ค้นหา Student ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	// // 5: สร้าง Discipline
	// pt := entity.Petition{
	// 	StudentID:          Petition.StudentID,        // โยงความสัมพันธ์กับ Entity Student
	// 	PetitionTypeID:     Petition.PetitionTypeID,   // โยงความสัมพันธ์กับ Entity PetitionType
	// 	PetitionPeriodID:   Petition.PetitionPeriodID, // โยงความสัมพันธ์กับ Entity PetitionPeriod
	// 	Petition_Reason:    Petition.Petition_Reason,
	// 	Petition_Startdate: Petition.Petition_Startdate,
	// 	Petition_Enddate:   Petition.Petition_Enddate,
	// 	Added_Time:         Petition.Added_Time, // ตั้งค่าฟิลด์ Added_Time
	// }

	// 5: สร้าง Discipline
	Petition.Student = Student               // โยงความสัมพันธ์กับ Entity Student
	Petition.PetitionType = PetitionType     // โยงความสัมพันธ์กับ Entity PetitionType
	Petition.PetitionPeriod = PetitionPeriod // โยงความสัมพันธ์กับ Entity PetitionPeriod
	Petition.Petition_Reason = payload.Petition_Reason
	Petition.Petition_Startdate = payload.Petition_Startdate
	Petition.Petition_Enddate = payload.Petition_Enddate
	Petition.Added_Time = payload.Added_Time // ตั้งค่าฟิลด์ Added_Time

	//6: บันทึก
	if err := entity.DB().Create(&Petition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Petition})
}

// GET /petition/:id

func GetPetition(c *gin.Context) {

	var petition entity.Petition

	id := c.Param("id")

	if err := entity.DB().Preload("PetitionType").Preload("PetitionPeriod").Preload("Student").Raw("SELECT * FROM petitions WHERE id = ?", id).Scan(&petition).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petition})

}

// GET /petitions

func ListPetition(c *gin.Context) {

	var petitions []entity.Petition

	if err := entity.DB().Preload("PetitionType").Preload("PetitionPeriod").Preload("Student").Raw("SELECT * FROM petitions").Scan(&petitions).Find(&petitions).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": petitions})

}

// DELETE /petitions/:id
func DeletePetition(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM petitions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Petition not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /petition

func UpdatePetition(c *gin.Context) {
	var payload UpdatePetitionPayload

	var Petition entity.Petition
	var Student entity.STUDENT
	var PetitionType entity.PetitionType
	var PetitionPeriod entity.PetitionPeriod

	if err := c.ShouldBindJSON(&payload); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 2: ค้นหา PetitionType ด้วย id
	if tx := entity.DB().Where("id = ?", payload.PetitionType).First(&PetitionType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition_type not found"})
		return
	}

	// 3: ค้นหา PetitionPeriod ด้วย id
	if tx := entity.DB().Where("id = ?", payload.PetitionPeriod).First(&PetitionPeriod); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "petition_period not found"})
		return
	}

	// 4: ค้นหา Student ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Student).First(&Student); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Student not found"})
		return
	}

	// // 5: สร้าง Petition
	// update := entity.Petition{
	// 	StudentID:          Petition.StudentID,        // โยงความสัมพันธ์กับ Entity Student
	// 	PetitionTypeID:     Petition.PetitionTypeID,   // โยงความสัมพันธ์กับ Entity PetitionType
	// 	PetitionPeriodID:   Petition.PetitionPeriodID, // โยงความสัมพันธ์กับ Entity PetitionPeriod
	// 	Petition_Reason:    Petition.Petition_Reason,
	// 	Petition_Startdate: Petition.Petition_Startdate,
	// 	Petition_Enddate:   Petition.Petition_Enddate,
	// 	Added_Time:         Petition.Added_Time, // ตั้งค่าฟิลด์ Added_Time
	// }

	// 5: สร้าง Petition
	Petition.ID = payload.ID
	Petition.Student = Student               // โยงความสัมพันธ์กับ Entity Student
	Petition.PetitionType = PetitionType     // โยงความสัมพันธ์กับ Entity PetitionType
	Petition.PetitionPeriod = PetitionPeriod // โยงความสัมพันธ์กับ Entity PetitionPeriod
	Petition.Petition_Reason = payload.Petition_Reason
	Petition.Petition_Startdate = payload.Petition_Startdate
	Petition.Petition_Enddate = payload.Petition_Enddate
	Petition.Added_Time = payload.Added_Time // ตั้งค่าฟิลด์ Added_Time

	// 6: update
	if err := entity.DB().Where("id = ?", payload.ID).Updates(&Petition).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Petition})

}
