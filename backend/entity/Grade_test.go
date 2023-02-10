package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Grade_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "B642252555",
		Grade_Code_Supject:   "523332",
		Grade_Supject:        "SOFTWARE ENGINEERING",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Student_Number: B642252555 does not validate as matches(^[BMD]\\d{7}$)"))
}

func Test_Validate_Grade_Student_Number_Not_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "",
		Grade_Code_Supject:   "523332",
		Grade_Supject:        "SOFTWARE ENGINEERING",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Student_Number: non zero value required"))
}

func Test_Validate_Grade_Supject(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "B6422525",
		Grade_Code_Supject:   "523332",
		Grade_Supject:        "SOFTWARE ENGINEERING SOFTWARE ENGINEERING SOFTWARE ENGINEERING",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Supject: SOFTWARE ENGINEERING SOFTWARE ENGINEERING SOFTWARE ENGINEERING does not validate as maxstringlength(20)"))
}

func Test_Validate_Grade_Supject_Not_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "B6422525",
		Grade_Code_Supject:   "523332",
		Grade_Supject:        "",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Supject: non zero value required"))
}
func Test_Validate_Grade_Code_Supject(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "B6422525",
		Grade_Code_Supject:   "54",
		Grade_Supject:        "SOFTWARE",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Code_Supject: 54 does not validate as matches(^\\d{6}$)"))
}

func Test_Validate_Grade_Code_Supject_Not_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	Grade := GRADE{
		Grade_Student_Number: "B6422525",
		Grade_Code_Supject:   "",
		Grade_Supject:        "SOFTWARE",
		Grade:                "A",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Grade)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Grade_Code_Supject: non zero value required"))
}
