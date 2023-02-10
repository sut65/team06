package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	
)

func Test_Validate_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	student := STUDENT {
		Student_Year_Of_Entry: time.Now(),
		Student_Number:        "B630000",
		Student_Name:          "ศุภกานต์ แสงจันทร์",
		Student_Birthday:      time.Now(),
		Student_Tel:           "0987564387",
		Student_Identity_Card: "1134900124561",
		Student_Nationality:   "ไทย",
		Student_Religion:      "พุทธ",
		Student_Address:       "23/21ต.คลอง1 อ.คลองหลวง จ.ปทุมธานี",
		Student_Fathers_Name:  "สมชาย แสงจันทร์",
		Student_Mothers_Name:  "สมหญิง แสงจันทร์",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student_Number: B630000 does not validate as matches(^[BMD]\\d{7}$)"))
}

func Test_Validate_Student_Identity_Card(t *testing.T) {
	g := NewGomegaWithT(t)

	student := STUDENT {
		Student_Year_Of_Entry: time.Now(),
		Student_Number:        "B6300001",
		Student_Name:          "ศุภกานต์ แสงจันทร์",
		Student_Birthday:      time.Now(),
		Student_Tel:           "0987564387",
		Student_Identity_Card: "11349001245",
		Student_Nationality:   "ไทย",
		Student_Religion:      "พุทธ",
		Student_Address:       "23/21ต.คลอง1 อ.คลองหลวง จ.ปทุมธานี",
		Student_Fathers_Name:  "สมชาย แสงจันทร์",
		Student_Mothers_Name:  "สมหญิง แสงจันทร์",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student_Identity_Card: 11349001245 does not validate as matches(^\\d{13}$)"))
}

func Test_Validate_Student_Address(t *testing.T) {
	g := NewGomegaWithT(t)

	student := STUDENT {
		Student_Year_Of_Entry: time.Now(),
		Student_Number:        "B6300000",
		Student_Name:          "ศุภกานต์ แสงจันทร์",
		Student_Birthday:      time.Now(),
		Student_Tel:           "0987564387",
		Student_Identity_Card: "1134900124516",
		Student_Nationality:   "ไทย",
		Student_Religion:      "พุทธ",
		Student_Address:       "ปทุม",
		Student_Fathers_Name:  "สมชาย แสงจันทร์",
		Student_Mothers_Name:  "สมหญิง แสงจันทร์",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(student)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Student_Address: ปทุม does not validate as minstringlength(10)"))
}