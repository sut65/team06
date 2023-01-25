package controller

import (
	"github.com/sut65/team06/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"net/http"
)

// POST

func CreateAdmiin(c *gin.Context) {
	var Prefix entity.PREFIX
	var Gender entity.GENDER
	var Province entity.PROVINCE
	var Admin entity.ADMIN

	if err := c.ShouldBindJSON(&Admin); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	//9: ค้นหาด้วย id ของ Prefix
	if tx := entity.DB().Where("id = ?", Admin.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
	}
	//10: ค้นหาด้วย id ของ Gender
	if tx := entity.DB().Where("id = ?", Admin.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
	}
	//11: ค้นหาด้วย id ของ Province
	if tx := entity.DB().Where("id = ?", Admin.ProvinceID).First(&Province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
	}

	//เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(Admin.Admin_Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eror hashing password"})
	}

	//12:สร้าง entity ADMIN
	Data_Admin := entity.ADMIN{
		Admin_Name:     Admin.Admin_Name,
		Admin_Email:    Admin.Admin_Email,
		Admin_Password: string(hashPassword),
		Admin_Tel:      Admin.Admin_Tel,
		Admin_Address:  Admin.Admin_Address,
		Prefix:         Prefix,
		Gender:         Gender,
		Province:       Province,
	}

	//13:บันทึก
	if err := entity.DB().Create(&Data_Admin).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Data_Admin})

}

// ดึงข้อมูล Admin มาแสดง
func ListAdminTable(c *gin.Context) {

	var Admin []entity.ADMIN

	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Province").Raw("SELECT * FROM admins").Scan(&Admin).Find(&Admin).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListAdmin_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Admin})
}

// ดึงข้อมูล admin by id
func ListAdminByID(c *gin.Context) {

	var Admin []entity.ADMIN
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM admins WHERE id = ?", id).Scan(&Admin).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"ListAdminByID_error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": Admin})
}

// ลบข้อมูล admin by id
func DeleteAdminByID(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "DeleteAdminByID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}
// แก้ไขข้อมูล admin
func UpdateAdmin(c *gin.Context) {
	var Prefix entity.PREFIX
	var Gender entity.GENDER
	var Province entity.PROVINCE
	var Admin entity.ADMIN
	

	if err := c.ShouldBindJSON(&Admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//1:ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", Admin.PrefixID).First(&Prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Prefix not found"})
		return
	}
	//2:ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", Admin.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}
	//2:ค้นหา province ด้วย id	
	if tx := entity.DB().Where("id = ?", Admin.ProvinceID).First(&Province); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Province not found"})
	}
	//update entity admin
	update := entity.ADMIN{
		Admin_Name:     Admin.Admin_Name,
		Admin_Email:    Admin.Admin_Email,
		// Admin_Password: string(hashPassword),
		Admin_Tel:      Admin.Admin_Tel,
		Admin_Address:  Admin.Admin_Address,
		Prefix:         Prefix,
		Gender:         Gender,
		Province:       Province,
	}
	//update
	if err := entity.DB().Where("id = ?", Admin.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
		
	}
	c.JSON(http.StatusOK, gin.H{"data": Admin})
}