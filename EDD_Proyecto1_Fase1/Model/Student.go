package Model

import "module/Stacks"

type Student struct {
	FullName   string        `json:"nombre"`
	License    int           `json:"carnet"`
	Password   string        `json:"password"`
	RootFolder string        `json:"Carpeta_Raiz"`
	Stack      *Stacks.Stack `json:"-"`
}

// Methods GET
func (student *Student) GetFullName() string {
	return student.FullName
}

func (student *Student) GetLicense() int {
	return student.License
}

func (student *Student) GetPassword() string {
	return student.Password
}

func (student *Student) GetActionsStudent() *Stacks.Stack {
	return student.Stack
}

// Methods SET
func (student *Student) SetFullName(fullname string) {
	student.FullName = fullname
}

func (student *Student) SetLicense(license int) {
	student.License = license
}

func (student *Student) SetPassword(password string) {
	student.Password = password
}

func (student *Student) SetActionsStudent(stack *Stacks.Stack) {
	student.Stack = stack
}
