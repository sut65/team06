package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Validate_Branch_Name(t *testing.T) {
	g := NewGomegaWithT(t)

	branch := BRANCH{
		Branch_Name:    "สาม",//ผิด
		Branch_Teacher: "UNCLE lala",
		Branch_Info:    "ตอบโจทย์ตลาดแรงงานในอนาคต",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(branch)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Branch_Name: สาม does not validate as stringlength(5|50)"))
}

func Test_Validate_Branch_Teacher_Name(t *testing.T) {
	g := NewGomegaWithT(t)

	branch := BRANCH{
		Branch_Name:    "วิศวกรรมคอมพิวเตอร์",
		Branch_Teacher: "อาณารารา",//ผิด
		Branch_Info:    "ตอบโจทย์ตลาดแรงงานในอนาคต",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(branch)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Branch_Teacher: อาณารารา does not validate as matches(^[a-zA-Z ]*$)"))
}

func Test_Validate_Branch_Info(t *testing.T) {
	g := NewGomegaWithT(t)

	branch := BRANCH{
		Branch_Name:    "วิศวกรรมคอมพิวเตอร์",
		Branch_Teacher: "uiui ui",
		Branch_Info:    "What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. LoreIpsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",//ผิด
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(branch)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Branch_Info: What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. LoreIpsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum does not validate as maxstringlength(450)"))
}
