package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team06/controller"
	"github.com/sut65/team06/entity"
	"github.com/sut65/team06/middlewares"
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
	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{

			//combobox Institute
			router.GET("/institute", controller.ListInstitute)
			//combobox Branch
			router.GET("/branch", controller.ListBranch)
			//combobox Course
			router.GET("/course", controller.ListCourse)
			//combobox Degree
			router.GET("/degree", controller.ListDegree)
			//combobox Prefix
			router.GET("/prefix", controller.ListPrefix)
			//combobox Gender
			router.GET("/gender", controller.ListGender)
			//combobox Province
			router.GET("/province", controller.ListProvince)
			//combobox ActivityType
			router.GET("/activityType", controller.ListActivityType)
			//combobox Trimester
			router.GET("/trimester", controller.ListTrimester)
			//combobx dormitorytype
			router.GET("/dormitorytype", controller.ListDormitoryType)
			//combobx roomtype
			router.GET("/roomtype", controller.ListRoomType)
			//list all Scholarship ให้ all_sholarship
			router.GET("/scholarship", controller.ListScholarship)
			//combobox Scholarship type
			router.GET("/scholarship_type", controller.ListScholarshipType)

			/////////////////////////////////////////////////////////////

			//รับข้อมูลเข้าตาราง Student
			router.POST("/create_Student", controller.CreateStudent)
			//แสดงข้อมูลตาราง Student
			router.GET("/student_table", controller.ListStudentTable)
			// ดึงข้อมูล student by id
			router.GET("/student/:id", controller.ListStudentByID)
			// แก้ไขข้อมูล student
			router.PATCH("/update_student", controller.UpdateStudent)
			// ลบข้อมูล student by id
			router.DELETE("/delete_student/:id", controller.DeleteStudentByID)

			/////////////////////////////////////////////////////////////

			//รับข้อมูลเข้าตาราง Admin
			router.POST("/create_Admin", controller.CreateAdmiin)
			//แสดงข้อมูลตาราง Admin
			router.GET("/admin_table", controller.ListAdminTable)
			// ดึงข้อมูล admin by id
			router.GET("/admin/:id", controller.ListAdminByID)
			// แก้ไขข้อมูล admin
			router.PATCH("/update_admin", controller.UpdateAdmin)
			// ลบข้อมูล admin by id
			router.DELETE("/delete_admin/:id", controller.DeleteAdminByID)

			/////////////////////////////////////////////////////////////

			//รับข้อมูลเข้าตาราง Branch
			router.POST("/create_branch", controller.CreateBranch)
			//แสดงข้อมูลตาราง Branch
			router.GET("/data_branch", controller.ListBranchTable)
			// ดึงข้อมูล Branch by id
			router.GET("/branch/:id", controller.ListBranchByID)
			// แก้ไขข้อมูล branch
			router.PATCH("/update_branch", controller.UpdateBranch)
			// ลบข้อมูล branch by id
			router.DELETE("/delete_branch/:id", controller.DeleteBranchByID)
			// get admin by id
			router.GET("/branch_admin/:id", controller.GetAdminByID)


			/////////////////////////////////////////////////////////////

			//รับข้อมูลเข้าตาราง Course
			router.POST("/create_course", controller.CreateCourse)
			//แสดงข้อมูลตาราง Course
			router.GET("/course_table", controller.ListCourseTable)
			// ดึงข้อมูล course by id
			router.GET("/course/:id", controller.ListCourseByID)
			// แก้ไขข้อมูล course
			router.PATCH("/update_course", controller.UpdateCourse)
			// ลบข้อมูล course by id
			router.DELETE("/delete_course/:id", controller.DeleteCourseByID)

			/////////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง scholarship applicant
			r.POST("/create", controller.CreateScholarshipAp)
			//ใช้ในหน้าแสดงข้อมูล data scholarship applicant
			r.GET("/ListScholarshipApBySID/:id", controller.ListScholarshipApBySID)

			// แก้ไขข้อมูล scholarship applicants
			r.PATCH("/update_scholarship_applicants", controller.UpdateScholarshipAp)
			// ลบข้อมูล scholarship applicants by id
			r.DELETE("/delete_scholarship_applicants/:id", controller.DeleteScholarshipApByID)

			/// ดึงข้อมูล scholarships by id ใช้ในหน้า all scholarship
			r.GET("/scholarship/:id", controller.ListScholarshipByID)
			/// ดึงข้อมูล scholarship type by id ใช้ในหน้า all scholarship
			r.GET("/scholarship_type/:id", controller.ListScholarshipTypeByID)
			/// ดึงข้อมูล applicant by id ใช้ในหน้า update scholarship applicant
			r.GET("/applicant/:id", controller.GetApplicantByID)
			/// ดึงข้อมูล student by id ใช้ในหน้า create scholarship applicant
			r.GET("/scholarship_student/:id", controller.GetStudentByID)


			/////////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง Grade
			router.POST("/create_Grade", controller.CreateGrade)
			//แสดงข้อมูลตารางGrade
			router.GET("/grade_table", controller.ListGradeTable)
			// ดึงข้อมูล Grade by student_id
			router.GET("/grade/:id", controller.ListGradeByID)
			// ดึงข้อมูล Grade by id
			router.GET("/grades/:id", controller.GradeByID)
			// แก้ไขข้อมูล Grade
			router.PATCH("/update_grade", controller.UpdateGrade)
			// ลบข้อมูล Grade by id
			router.DELETE("/delete_Grade/:id", controller.DeleteGradeByID)

			/////////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง Activity
			router.POST("/create_Activity", controller.CreateActivity)
			//แสดงข้อมูลตาราง Activity
			router.GET("/activity_table", controller.ListActivityTable)
			// ดึงข้อมูล Activity by student_id
			router.GET("/activity/:id", controller.ListActivityByID)
			// ดึงข้อมูล Activity by id
			router.GET("/activitys/:id", controller.ActivityByID)
			// แก้ไขข้อมูล Activity
			router.PATCH("/update_activity", controller.UpdateActivity)
			// ลบข้อมูล Activity by id
			router.DELETE("/delete_activity/:id", controller.DeleteActivityByID)

			///////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง Dormitory
			router.POST("/dormitory", controller.CreateDormitory)
			//แสดงข้อมูลตาราง Dormitory
			router.GET("/dormitory_table", controller.ListDormitoryTable)
			// ดึงข้อมูล dormitory by student_id
			// router.GET("/dormitory_by_id/:id", controller.ListDormitoryByID)
			// ดึงข้อมูล Dromitpry by id
			router.GET("/dormitory_id/:id", controller.ListDormitoryID)
			// แก้ไขข้อมูล Dormitory
			router.PATCH("/update_dormitory", controller.UpdateDormitory)
			// ลบข้อมูล Dormitory by id
			router.DELETE("/delete_dormitoty/:id", controller.DeleteDormitoyByID)

			///////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง Suggestion
			router.POST("/suggestion", controller.CreatSuggestion)
			//แสดงข้อมูลตาราง Suggestion
			router.GET("/suggestion_table", controller.ListSuggestionTable)
			// ดึงข้อมูล Suggestion by id
			router.GET("/suggestion_by_id/:id", controller.ListSuggestionByID)
			router.GET("/suggestion_id/:id", controller.ListSuggestionID)
			// แก้ไขข้อมูล Suggestion
			router.PATCH("/update_suggestion", controller.UpdateSuggestion)
			// ลบข้อมูล Suggestion by id
			router.DELETE("/delete_suggestion/:id", controller.DeleteSuggestionByID)

			///////////////////////////////////////////////////////////
			//รับข้อมูลเข้าตาราง Postponement
			router.POST("/create_Postponement", controller.CreatePostponement)
			//แสดงข้อมูลตาราง Postponement
			router.GET("/postponement_table", controller.ListPostponementTable)
			// ดึงข้อมูล Postponement by student id
			router.GET("/postponement/:id", controller.ListPostponementByID)
			// ดึงข้อมูล Postponement by id
			router.GET("/postponements/:id", controller.PostponementByID)
			// แก้ไขข้อมูล Postponement
			router.PATCH("/update_postponement", controller.UpdatePostponement)
			// ลบข้อมูล Postponement by id
			router.DELETE("/delete_postponementadmin/:id", controller.DeletePostponementByID)

			//////////////////////////////////////////////////////////////////

			//DisciplineType
			router.POST("/CreateDisciplineType", controller.CreateDisciplineType)
			router.GET("/GetDisciplineType/:id", controller.GetDisciplineType)
			router.GET("/ListDisciplineType", controller.ListDisciplineType)
			router.DELETE("/DeleteDisciplineType/:id", controller.DeleteDisciplineType)
			router.PATCH("/UpdateDisciplineType", controller.UpdateDisciplineType)

			//Discipline
			router.POST("/CreateDiscipline", controller.CreateDiscipline)
			router.GET("/GetDiscipline/:id", controller.GetDiscipline)
			router.GET("/ListDiscipline", controller.ListDiscipline)
			router.DELETE("/DeleteDiscipline/:id", controller.DeleteDiscipline)
			router.PATCH("/UpdateDiscipline", controller.UpdateDiscipline)

			//////////////////////////////////////////////////////////////////

			//PetitionType
			router.POST("/CreatePetitionType", controller.CreatePetitionType)
			router.GET("/ListPetitionType", controller.ListPetitionType)
			router.GET("/GetPetitionType/:id", controller.GetPetitionType)
			router.PATCH("/UpdatePetitionType", controller.UpdatePetitionType)
			router.DELETE("/DeletePetitionType/:id", controller.DeletePetitionType)

			//PetitionPeriod
			router.POST("/CreatePetitionPeriod", controller.CreatePetitionPeriod)
			router.GET("/ListPetitionPeriod", controller.ListPetitionPeriod)
			router.GET("/GetPetitionPeriod/:id", controller.GetPetitionPeriod)
			router.PATCH("/UpdatePetitionPeriod", controller.UpdatePetitionPeriod)
			router.DELETE("/DeletePetitionPeriod/:id", controller.DeletePetitionPeriod)

			//Petition
			router.POST("/CreatePetition", controller.CreatePetition)
			router.GET("/ListPetition", controller.ListPetition)
			router.GET("/GetPetition/:id", controller.GetPetition)
			router.PATCH("/UpdatePetition", controller.UpdatePetition)
			router.DELETE("/DeletePetition/:id", controller.DeletePetition)

			/////////////////////////////////////////////////////////////
		}
	}
	r.Run()
}
