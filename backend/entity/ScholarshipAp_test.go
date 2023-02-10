package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_PersonalID(t *testing.T) {
	g := NewGomegaWithT(t)

	scholarshipap := SCHOLARSHIPAP{
		Identity_Card: "1134900", //ผิด
		Reasons:       "It is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by the",
		GPAX:          2.33,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(scholarshipap)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Identity_Card: 1134900 does not validate as matches(^\\d{13}$)"))
}

func Test_Validate_Reasons(t *testing.T) {
	g := NewGomegaWithT(t)

	scholarshipap := SCHOLARSHIPAP{
		Identity_Card: "1134900124129", 
		Reasons:       "distracted by the",// ผิด
		GPAX:          2.33,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(scholarshipap)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Reasons: distracted by the does not validate as minstringlength(300)"))
}

func Test_Validate_GPAX(t *testing.T) {
	g := NewGomegaWithT(t)

	scholarshipap := SCHOLARSHIPAP{
		Identity_Card: "1134900124129", 
		Reasons:       "It is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by the",
		GPAX:          4.01,//ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(scholarshipap)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("GPAX: 4.01 does not validate as matches(^[+]?([1-3]+([.][0-9]*)?|[4]?|[.][0]+)$)"))
}

