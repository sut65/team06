package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	
)

func Test_Validate_Course_Credit(t *testing.T) {
	g := NewGomegaWithT(t)

	Course := COURSE{
		Course_Name:    "วิศวกรรมเครื่องกลหลักสูตร(พ.ศ.2560)",
		Course_Teacher: "แอบมอง คนดี",
		Course_Credit:  119,
		Course_Detail:  "เป็นหลักสูตรของสาขาวิศวกรรมเครื่องกลเป็นหลักสูตรที่ออกแบบมาเพื่อตอบโจทย์กับอนาคต",
		Course_Year:    2560,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course_Credit: 119 does not validate as range(120|200)"))
}

func Test_Validate_Course_Detail(t *testing.T) {
	g := NewGomegaWithT(t)

	Course := COURSE{
		Course_Name:    "วิศวกรรมเครื่องกลหลักสูตร(พ.ศ.2560)",
		Course_Teacher: "แอบมอง คนดี",
		Course_Credit:  120,
		Course_Detail:  "เป็นหลัก",
		Course_Year:    2560,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course_Detail: เป็นหลัก does not validate as minstringlength(10)"))
}

func Test_Validate_Course_Year(t *testing.T) {
	g := NewGomegaWithT(t)

	Course := COURSE{
		Course_Name:    "วิศวกรรมเครื่องกลหลักสูตร(พ.ศ.2560)",
		Course_Teacher: "แอบมอง คนดี",
		Course_Credit:  120,
		Course_Detail:  "เป็นหลักสูตรของสาขาวิศวกรรมเครื่องกลเป็นหลักสูตรที่ออกแบบมาเพื่อตอบโจทย์กับอนาคต",
		Course_Year:    2559,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Course)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Course_Year: 2559 does not validate as range(2560|9999)"))
}