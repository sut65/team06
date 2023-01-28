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

	r.POST("/admin_Login", controller.Admin_Login)

	r.POST("/Student_Login", controller.Student_Login)
	
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
	//combobox ActivityType
	r.GET("/activityType", controller.ListActivityType)
	//combobox Trimester
	r.GET("/trimester", controller.ListTrimester)
	//combobx dormitorytype
	r.GET("/dormitorytype", controller.ListDormitoryType)
	//combobx roomtype
	r.GET("/roomtype", controller.ListRoomType)
	//list all Scholarship ให้ all_sholarship
	r.GET("/scholarship", controller.ListScholarship)
	//combobox Scholarship type
	r.GET("/scholarship_type", controller.ListScholarshipType)

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
	r.GET("/course/:id", controller.ListCourseByID)
	// แก้ไขข้อมูล course
	r.PATCH("/update_course", controller.UpdateCourse)
	// ลบข้อมูล course by id
	r.DELETE("/delete_course/:id", controller.DeleteCourseByID)

	/////////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง scholarship applicant
	r.POST("/create", controller.CreateScholarshipAp)
	//แสดงข้อมูลตาราง scholarship applicants
	r.GET("/data_scholarship_applicants", controller.ListScholarshipApTable)
	// ดึงข้อมูล scholarship applicants by id
	r.GET("/scholarship_applicants/:id", controller.ListScholarshipApByID)
	// แก้ไขข้อมูล scholarship applicants
	r.PATCH("/update_scholarship_applicants", controller.UpdateScholarshipAp)
	// ลบข้อมูล scholarship applicants by id
	r.DELETE("/delete_scholarship_applicants/:id", controller.DeleteScholarshipApByID)

	/// ดึงข้อมูล scholarship by id
	r.GET("/scholarship/:id", controller.ListScholarshipByID)
	/// ดึงข้อมูล scholarship type by id
	r.GET("/scholarship_type/:id", controller.ListScholarshipTypeByID)
	/// ดึงข้อมูล applicant by id
	r.GET("/applicant/:id", controller.GetApplicantByID)
	/// ดึงข้อมูล student by id มาใช้ในระบบ scholarship
	r.GET("/scholarship_student/:id", controller.GetStudentByID)
	
	/////////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง Grade
	r.POST("/create_Grade", controller.CreateGrade)
	//แสดงข้อมูลตารางGrade
	r.GET("/grade_table", controller.ListGradeTable)
	// ดึงข้อมูล Grade by id
	r.GET("/grade/:id", controller.ListGradeByID)
	// แก้ไขข้อมูล Grade
	r.PATCH("/update_grade", controller.UpdateGrade)
	// ลบข้อมูล Grade by id
	r.DELETE("/delete_Grade/:id", controller.DeleteGradeByID)

	/////////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง Activity
	r.POST("/create_Activity", controller.CreateActivity)
	//แสดงข้อมูลตาราง Activity
	r.GET("/activity_table", controller.ListActivityTable)
	// ดึงข้อมูล Activity by id
	r.GET("/activity/:id", controller.ListActivityByID)
	// แก้ไขข้อมูล Activity
	r.PATCH("/update_activity", controller.UpdateActivity)
	// ลบข้อมูล Activity by id
	r.DELETE("/delete_activity/:id", controller.DeleteActivityByID)

	///////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง Dormitory
	r.POST("/dormitory", controller.CreateDormitory)
	//แสดงข้อมูลตาราง Dormitory
	r.GET("/dormitory_table", controller.ListDormitoryTable)
	// ดึงข้อมูล dormitory by id
	r.GET("/dormitory_by_id/:id", controller.ListDormitoryByID)
	// แก้ไขข้อมูล Dormitory
	r.PATCH("/update_dormitory", controller.UpdateDormitory)
	// ลบข้อมูล Dormitory by id
	r.DELETE("/delete_dormitoty/:id", controller.DeleteDormitoyByID)

	///////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง Suggestion
	r.POST("/suggestion", controller.CreatSuggestion)
	//แสดงข้อมูลตาราง Suggestion
	r.GET("/suggestion_table", controller.ListSuggestionTable)
	// ดึงข้อมูล Suggestion by id
	r.GET("/suggestion_by_id/:id", controller.ListSuggestionByID)
	// แก้ไขข้อมูล Suggestion
	r.PATCH("/update_suggestion", controller.UpdateSuggestion)
	// ลบข้อมูล Suggestion by id
	r.DELETE("/delete_suggestion/:id", controller.DeleteSuggestionByID)

	///////////////////////////////////////////////////////////
	//รับข้อมูลเข้าตาราง Postponement
	r.POST("/create_Postponement", controller.CreatePostponement)
	//แสดงข้อมูลตาราง Postponement
	r.GET("/postponement_table", controller.ListPostponementTable)
	// ดึงข้อมูล Postponement by id
	r.GET("/postponement/:id", controller.ListPostponementByID)
	// แก้ไขข้อมูล Postponement
	r.PATCH("/update_postponement", controller.UpdatePostponement)
	// ลบข้อมูล Postponement by id
	r.DELETE("/delete_postponementadmin/:id", controller.DeletePostponementByID)

	//////////////////////////////////////////////////////////////////

	//DisciplineType
	r.POST("/CreateDisciplineType", controller.CreateDisciplineType)
	r.GET("/GetDisciplineType/:id", controller.GetDisciplineType)
	r.GET("/ListDisciplineType", controller.ListDisciplineType)
	r.DELETE("/DeleteDisciplineType/:id", controller.DeleteDisciplineType)
	r.PATCH("/UpdateDisciplineType", controller.UpdateDisciplineType)

	//Discipline
	r.POST("/CreateDiscipline", controller.CreateDiscipline)
	r.GET("/GetDiscipline/:id", controller.GetDiscipline)
	r.GET("/ListDiscipline", controller.ListDiscipline)
	r.DELETE("/DeleteDiscipline/:id", controller.DeleteDiscipline)
	r.PATCH("/UpdateDiscipline", controller.UpdateDiscipline)

	//////////////////////////////////////////////////////////////////

	//PetitionType
	r.POST("/CreatePetitionType", controller.CreatePetitionType)
	r.GET("/ListPetitionType", controller.ListPetitionType)
	r.GET("/GetPetitionType/:id", controller.GetPetitionType)
	r.PATCH("/UpdatePetitionType", controller.UpdatePetitionType)
	r.DELETE("/DeletePetitionType/:id", controller.DeletePetitionType)

	//PetitionPeriod
	r.POST("/CreatePetitionPeriod", controller.CreatePetitionPeriod)
	r.GET("/ListPetitionPeriod", controller.ListPetitionPeriod)
	r.GET("/GetPetitionPeriod/:id", controller.GetPetitionPeriod)
	r.PATCH("/UpdatePetitionPeriod", controller.UpdatePetitionPeriod)
	r.DELETE("/DeletePetitionPeriod/:id", controller.DeletePetitionPeriod)

	//Petition
	r.POST("/CreatePetition", controller.CreatePetition)
	r.GET("/ListPetition", controller.ListPetition)
	r.GET("/GetPetition/:id", controller.GetPetition)
	r.PATCH("/UpdatePetition", controller.UpdatePetition)
	r.DELETE("/DeletePetition/:id", controller.DeletePetition)

	/////////////////////////////////////////////////////////////

	r.Run()
}
