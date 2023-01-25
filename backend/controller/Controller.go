package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
)

// GET Institute เตรียมข้อมูลให้ combobox
func ListInstitute(c *gin.Context) {
	var Institute []entity.INSTITUTE

	if err := entity.DB().Raw("SELECT * FROM institutes").Scan(&Institute).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListInstitute_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Institute})
}

// GET Branch เตรียมข้อมูลให้ combobox
func ListBranch(c *gin.Context) {
	var Branch []entity.BRANCH

	if err := entity.DB().Raw("SELECT * FROM branches").Scan(&Branch).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListBranch_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Branch})
}

// GET Course เตรียมข้อมูลให้ combobox
func ListCourse(c *gin.Context) {
	var Course []entity.COURSE

	if err := entity.DB().Raw("SELECT * FROM courses").Scan(&Course).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListCourse_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Course})
}

// GET Degree เตรียมข้อมูลให้ combobox
func ListDegree(c *gin.Context) {
	var Degree []entity.DEGREE

	if err := entity.DB().Raw("SELECT * FROM degrees").Scan(&Degree).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListDegree_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Degree})
}

// GET Prefix เตรียมข้อมูลให้ combobox
func ListPrefix(c *gin.Context) {
	var Prefix []entity.PREFIX

	if err := entity.DB().Raw("SELECT * FROM prefixes").Scan(&Prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListPrefix_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Prefix})
}

// GET Gender เตรียมข้อมูลให้ combobox
func ListGender(c *gin.Context) {
	var Gender []entity.GENDER

	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&Gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListGender_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Gender})
}

// GET Province เตรียมข้อมูลให้ combobox
func ListProvince(c *gin.Context) {
	var Province []entity.PROVINCE

	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&Province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListProvince_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Province})
}

// GET scholarship เตรียมข้อมูลให้ combobox
func ListScholarship(c *gin.Context) {
	var Scholarship []entity.SCHOLARSHIP

	if err := entity.DB().Raw("SELECT * FROM scholarsh_ips").Scan(&Scholarship).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListScholarship_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Scholarship})
}

// GET scholarship_type เตรียมข้อมูลให้ combobox
func ListScholarshipType(c *gin.Context) {
	var ScholarshipType []entity.SCHOLARSHIPTYPE

	if err := entity.DB().Raw("SELECT * FROM scholarsh_ip_types").Scan(&ScholarshipType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListScholarshipType_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ScholarshipType})
}
// GET ActivityType เตรียมข้อมูลให้ combobox
func ListActivityType(c *gin.Context) {
	var ActivityType []entity.ACTIVITYTYPE

	if err := entity.DB().Raw("SELECT * FROM activityTypes").Scan(&ActivityType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListActivityType_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ActivityType})
}

// GET Trimester เตรียมข้อมูลให้ combobox
func ListTrimester(c *gin.Context) {
	var Trimester []entity.TRIMESTER

	if err := entity.DB().Raw("SELECT * FROM trimesters").Scan(&Trimester).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"ListTrimester_error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Trimester})
}
