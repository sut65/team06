package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Petition_Reason(t *testing.T) {
	g := NewGomegaWithT(t)

	petition := Petition{
		Petition_Reason: "",
		Petition_Startdate: time.Now(),
		Petition_Enddate: time.Now(),
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(petition)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Petition_Reason cannot be blank"))
}

func Test_Validate_Petition_Startdate(t *testing.T) {
	g := NewGomegaWithT(t)

	petition := Petition{
		Petition_Reason: "โด๊น",
		Petition_Startdate: time.Now().Add(-120 * time.Minute),
		Petition_Enddate: time.Now(),
		Added_Time: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(petition)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Petition_Startdate is invalid"))
}

func Test_Validate_Petition_Enddate(t *testing.T) {
	g := NewGomegaWithT(t)

	petition := Petition{
		Petition_Reason: "โด๊น",
		Petition_Startdate: time.Now(),
		Petition_Enddate: time.Now(),
		Added_Time: time.Now().Add(120 * time.Minute),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(petition)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Added_Time is invalid"))
}