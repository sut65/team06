package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/entity"
	"github.com/sut65/team06/service"
	"golang.org/x/crypto/bcrypt"
)

//////////////////////////////////////////////////////////////////////

type AdminLoginPayload struct {
	Admin_Email    string `json:"Admin_Email"`
	Admin_Password string `json:"Admin_Password"`
}

// LoginResponse token response
type AdminLoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

//////////////////////////////////////////////////////////////////////

type StudentLoginPayload struct {
	Student_Number        string `json:"Student_Number"`
	Student_Identity_Card string `json:"Student_Identity_Card"`
}

// LoginResponse token response
type StudentLoginResponse struct {
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

//////////////////////////////////////////////////////////////////////

func Admin_Login(c *gin.Context) {
	var payload AdminLoginPayload
	var admin entity.ADMIN

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา member ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM admins WHERE admin_email = ?", payload.Admin_Email).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(admin.Admin_Password), []byte(payload.Admin_Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(admin.Admin_Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := AdminLoginResponse{
		Token: signedToken,
		ID:    admin.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

//////////////////////////////////////////////////////////////////////

func Student_Login(c *gin.Context) {
	var payload StudentLoginPayload
	var student entity.STUDENT

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา member ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM students WHERE student_number = ?", payload.Student_Number).Scan(&student).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(student.Student_Identity_Card), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err1 := bcrypt.CompareHashAndPassword(hashPassword, []byte(payload.Student_Identity_Card))
	if err1 != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(student.Student_Number)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := StudentLoginResponse{
		Token: signedToken,
		ID:    student.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
