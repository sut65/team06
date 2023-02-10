package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าpassword < 8 หลักแล้วต้องเจอ Error
func Test_Validate_Admin_Password(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := ADMIN{
		Admin_Name:     "สมใจ จิตดี",
		Admin_Email:    "Admin0001@gmail.com",
		Admin_Password: "1234567", //ผิด
		Admin_Tel:      "0956156705",
		Admin_Address:  "121225fffffffffffffffffffffffffffffffff",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Admin_Password: 1234567 does not validate as minstringlength(8)"))
}
func Test_Validate_Admin_Tel(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := ADMIN{
		Admin_Name:     "สมใจ จิตดี",
		Admin_Email:    "Admin0001@gmail.com",
		Admin_Password: "123456789",
		Admin_Tel:      "0956156", //ผิด
		Admin_Address:  "121225fffffffffffffffffffffffffffffffff",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Admin_Tel: 0956156 does not validate as matches(^\\d{10}$)"))
}

func Test_Validate_Admin_Address(t *testing.T) {
	g := NewGomegaWithT(t)

	admin := ADMIN{
		Admin_Name:     "สมใจ จิตดี",
		Admin_Email:    "Admin0001@gmail.com",
		Admin_Password: "123456705",
		Admin_Tel:      "0956156705",
		Admin_Address:  "12", //ผิด

	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(admin)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Admin_Address: 12 does not validate as minstringlength(20)"))
}
