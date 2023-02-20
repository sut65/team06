package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Discipline_Reason(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "",
		Discipline_Punishment: "โด๊น",
		Discipline_Point: 1,
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Discipline_Reason cannot be blank"))
}

func Test_Validate_Discipline_Punishment(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "นอนน้อย",
		Discipline_Punishment: "",
		Discipline_Point: 1,
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Discipline_Punishment cannot be blank"))
}

func Test_Validate_Discipline_Point_Blank(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "นอนน้อย",
		Discipline_Punishment: "โด๊น",
		Discipline_Point: 6,
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Discipline_Point: 6 does not validate as range(1|5)"))
}

func Test_Validate_Discipline_Added_Time_DatePast(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "นอนน้อย",
		Discipline_Punishment: "โด๊น",
		Discipline_Point: 1,
		Added_Time: time.Now().Add(-31*time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Added_Time is Past"))
}

func Test_Validate_Discipline_Added_Time_DateFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "นอนน้อย",
		Discipline_Punishment: "โด๊น",
		Discipline_Point: 1,
		Added_Time: time.Now().Add(31*time.Minute),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Added_Time is Future"))
}

func Test_Validate_Discipline_True(t *testing.T) {
	g := NewGomegaWithT(t)

	discipline := Discipline{
		Discipline_Reason: "นอนน้อย",
		Discipline_Punishment: "โด๊น",
		Discipline_Point: 1,
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(discipline)

	g.Expect(ok).To(BeTrue())
	g.Expect(err).To(BeNil())
}