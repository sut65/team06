package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_PersonalID(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check PersonalID", func(t *testing.T) {
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
		g.Expect(err.Error()).To(Equal("เลขบัตรประจำตัวประชาชนไม่ถูกต้อง"))

	})

	t.Run("Check Reasons", func(t *testing.T) {
		scholarshipap := SCHOLARSHIPAP{
			Identity_Card: "1134900124129",
			Reasons:       "distracted by the", // ผิด
			GPAX:          2.33,
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(scholarshipap)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("เหตุผลประกอบในการสมัครทุนการศึกษาต้องมีความยาวไม่ต่ำกว่า 300ตัวอักษร"))

	})

	t.Run("Check GPAX", func(t *testing.T) {
		scholarshipap := SCHOLARSHIPAP{
			Identity_Card: "1134900124129",
			Reasons:       "It is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by the",
			GPAX:          4.01, //ผิด
		}

		// ตรวจสอบด้วย govalidator
		ok, err := govalidator.ValidateStruct(scholarshipap)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("เกรดเฉลี่ยสะสมไม่ถูกต้อง"))

	})

	t.Run("Positive Case", func(t *testing.T) {
		scholarshipap := SCHOLARSHIPAP{
			Identity_Card: "1134900124129",
			Reasons:       "It is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by theIt is a long established fact that a reader will be distracted by the",
			GPAX:          3.88, 
		}

		ok, err := govalidator.ValidateStruct(scholarshipap)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

