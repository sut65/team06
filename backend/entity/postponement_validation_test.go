package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Postponement_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	postponement := POSTPONEMENT{
		Postponement_Student_Number: "F63000",
		Postponement_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "4.00",
		Postponement_Credit:         "22",
		Postponement_Date:           time.Now(),
		Postponement_Reasons:        "เนื่องจากทางบ้านมีปัญหาเรื่องการเงิน",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(postponement)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Postponement_Student_Number: F63000 does not validate as matches(^[BMD]\\d{7}$)"))
}
func Test_Validate_Postponement_Student_Name(t *testing.T) {
	g := NewGomegaWithT(t)

	postponement := POSTPONEMENT{
		Postponement_Student_Number: "B6300000",
		Postponement_Student_Name:   "",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "4.00",
		Postponement_Credit:         "22",
		Postponement_Date:           time.Now(),
		Postponement_Reasons:        "เนื่องจากทางบ้านมีปัญหาเรื่องการเงิน",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(postponement)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("name cannot be blank"))
}

func Test_Validate_Postponement_Reasons(t *testing.T) {
	g := NewGomegaWithT(t)

	postponement := POSTPONEMENT{
		Postponement_Student_Number: "B6300000",
		Postponement_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "4.00",
		Postponement_Credit:         "22",
		Postponement_Date:           time.Now(),
		Postponement_Reasons:        "เน",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(postponement)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Postponement_Reasons: เน does not validate as minstringlength(10)"))
}
func Test_Postponementr(t *testing.T) {
	g := NewGomegaWithT(t)

	postponement := POSTPONEMENT{
		Postponement_Student_Number: "B6300000",
		Postponement_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Postponement_AcademicYear:   "2565",
		Postponement_Gpax:           "4.00",
		Postponement_Credit:         "22",
		Postponement_Date:           time.Now(),
		Postponement_Reasons:        "เนื่องจากทางบ้านมีปัญหาเรื่องการเงิน",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(postponement)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}