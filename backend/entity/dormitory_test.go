package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Dormitory_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	dormitory := DORMITORY{
		Dormitory_Student_Number: "A63063",
		Dormitory_AcademicYear:   2565,
		Room_Number:              8210,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(dormitory)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Dormitory_Student_Number: A63063 does not validate as matches(^[BMD]\\d{7}$)"))
}

func Test_Validate_Dormitory_AcademicYear(t *testing.T) {
	g := NewGomegaWithT(t)

	dormitory := DORMITORY{
		Dormitory_Student_Number: "B6300000",
		Dormitory_AcademicYear:   256,
		Room_Number:              8210,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(dormitory)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Dormitory_AcademicYear: 256 does not validate as matches(^\\d{4}$)"))
}

func Test_Validate_Room_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	dormitory := DORMITORY{
		Dormitory_Student_Number: "B6300000",
		Dormitory_AcademicYear:   2565,
		Room_Number:              810,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(dormitory)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Room_Number: 810 does not validate as matches(^\\d{4}$)"))
}

func Test_Validate_Dormitory_Positive(t *testing.T) {
	g := NewGomegaWithT(t)

	dormitory := DORMITORY{
		Dormitory_Student_Number: "B6300000",
		Dormitory_AcademicYear:   2565,
		Room_Number:              8210,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(dormitory)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())

}