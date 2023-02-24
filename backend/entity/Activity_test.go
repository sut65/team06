package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
)

func Test_Validate_Activity_Student_Number(t *testing.T) {
	g := NewGomegaWithT(t)

	Activity := ACTIVITY{
		Activity_Student_Number: "B6332426789",
		Activity_Name:           "กิจกรรมปลูกป่ารักโลก",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           time.Now(),
		Activity_Year:           "2565",
		Hour:                    "12",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Activity)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Activity_Student_Number: B6332426789 does not validate as matches(^[BMD]\\d{7}$)"))
}

func Test_Validate_Activity_Student_Number_Not_Null(t *testing.T) {
	g := NewGomegaWithT(t)

	Activity := ACTIVITY{
		Activity_Student_Number: "",
		Activity_Name:           "กิจกรรมปลูกป่ารักโลก",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           time.Now(),
		Activity_Year:           "2565",
		Hour:                    "12",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Activity)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Activity_Student_Number: non zero value required"))
}

func Test_Validate_Activity_Name(t *testing.T) {
	g := NewGomegaWithT(t)

	Activity := ACTIVITY{
		Activity_Student_Number: "B6332426",
		Activity_Name:           "",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           time.Now(),
		Activity_Year:           "2565",
		Hour:                    "12",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Activity)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Activity_Name: non zero value required"))
}

func Test_Validate_Activity_Year(t *testing.T) {
	g := NewGomegaWithT(t)
	Activity := ACTIVITY{
		Activity_Student_Number: "B6332426",
		Activity_Name:           "กิจกรรมปลูกป่ารักโลก",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           time.Now(),
		Activity_Year:           "",
		Hour:                    "12",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Activity)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Activity_Year: non zero value required"))
}

func Test_Validate_Activity_Positive(t *testing.T) {
	g := NewGomegaWithT(t)

	Activity := ACTIVITY{
		Activity_Student_Number: "B6300000",
		Activity_Name:           "กิจกรรมปลูกป่ารักโลก",
		Location:                "ป่าชายเลน",
		Position:                "เข้าร่วมกิจกรรม",
		Activity_Date:           time.Now(),
		Activity_Year:           "2565",
		Hour:                    "12",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Activity)

	g.Expect(ok).To(BeTrue())
	g.Expect(err).To(BeNil())

}

