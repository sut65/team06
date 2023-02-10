package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Suggestion_Teacher(t *testing.T) {
	g := NewGomegaWithT(t)

	suggestion := SUGGESTION{
		Suggestion_Teacher:        "",
		Suggestion_Student_Number: "B6300000",
		Suggestion_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Suggestion_Date:           time.Now(),
		Suggestion_Detail:         "ปรับการพูดตอนสอนในช้าลงกว่านี้ได้ไหมครับ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(suggestion)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่ออาจารย์"))
}

func Test_Validate_Suggestion_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	suggestion := SUGGESTION{
		Suggestion_Teacher:        "อ.เกษม จิตดี",
		Suggestion_Student_Number: "A63063",
		Suggestion_Student_Name:   "ศุภกานต์ แสงจันทร์",
		Suggestion_Date:           time.Now(),
		Suggestion_Detail:         "ปรับการพูดตอนสอนในช้าลงกว่านี้ได้ไหมครับ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(suggestion)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Suggestion_Student_Number: A63063 does not validate as matches(^[BMD]\\d{7}$)"))
}

func Test_Validate_Suggestion_Student_Name(t *testing.T) {
	g := NewGomegaWithT(t)

	suggestion := SUGGESTION{
		Suggestion_Teacher:        "อ.เกษม จิตดี",
		Suggestion_Student_Number: "B6300000",
		Suggestion_Student_Name:   "",
		Suggestion_Date:           time.Now(),
		Suggestion_Detail:         "ปรับการพูดตอนสอนในช้าลงกว่านี้ได้ไหมครับ",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(suggestion)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกชื่อสกุลนักศึกษา"))
}
