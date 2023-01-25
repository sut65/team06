package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/controller"
	"github.com/sut65/team06/entity"
)

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	/////////////////////////////////////////////////////////////

	//combobox Institute
	r.GET("/institute", controller.ListInstitute)
	//combobox Branch
	r.GET("/branch", controller.ListBranch)
	//combobox Course
	r.GET("/course", controller.ListCourse)
	//combobox Degree
	r.GET("/degree", controller.ListDegree)
	//combobox Prefix
	r.GET("/prefix", controller.ListPrefix)
	//combobox Gender
	r.GET("/gender", controller.ListGender)
	//combobox Province
	r.GET("/province", controller.ListProvince)

	/////////////////////////////////////////////////////////////

	//รับข้อมูลเข้าตาราง Student
	r.POST("/create_Student", controller.CreateStudent)
	//แสดงข้อมูลตาราง Student
	r.GET("/student_table", controller.ListStudentTable)
	// ดึงข้อมูล student by id
	r.GET("/student/:id", controller.ListStudentByID)
	// แก้ไขข้อมูล student
	r.PATCH("/update_student", controller.UpdateStudent)
	// ลบข้อมูล student by id
	r.DELETE("/delete_student/:id", controller.DeleteStudentByID)

	/////////////////////////////////////////////////////////////

	//รับข้อมูลเข้าตาราง Admin
	r.POST("/create_Admin", controller.CreateAdmiin)
	//แสดงข้อมูลตาราง Admin
	r.GET("/admin_table", controller.ListAdminTable)
	// ดึงข้อมูล admin by id
	r.GET("/admin/:id", controller.ListAdminByID)
	// แก้ไขข้อมูล admin
	r.PATCH("/update_admin", controller.UpdateAdmin)
	// ลบข้อมูล admin by id
	r.DELETE("/delete_admin/:id", controller.DeleteAdminByID)
	
	/////////////////////////////////////////////////////////////

	//รับข้อมูลเข้าตาราง Branch
	r.POST("/create_branch", controller.CreateBranch)
	//แสดงข้อมูลตาราง Branch
	r.GET("/data_branch", controller.ListBranchTable)
	// ดึงข้อมูล Branch by id
	r.GET("/branch/:id", controller.ListBranchByID)
	// แก้ไขข้อมูล branch
	r.PATCH("/update_branch", controller.UpdateBranch)
	// ลบข้อมูล branch by id
	r.DELETE("/delete_branch/:id", controller.DeleteBranchByID)

	/////////////////////////////////////////////////////////////

	//รับข้อมูลเข้าตาราง Course
	r.POST("/create_course", controller.CreateCourse)
	//แสดงข้อมูลตาราง Course
	r.GET("/course_table", controller.ListCourseTable)
	// ดึงข้อมูล course by id
	r.GET("/course/:id", controller.ListStudentByID)
	// แก้ไขข้อมูล course
	r.PATCH("/update_course", controller.UpdateStudent)
	// ลบข้อมูล course by id
	r.DELETE("/delete_course/:id", controller.DeleteStudentByID)

	/////////////////////////////////////////////////////////////

	r.Run()
}
