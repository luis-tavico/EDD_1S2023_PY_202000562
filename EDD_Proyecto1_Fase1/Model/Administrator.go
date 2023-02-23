package Model

import "module/Stacks"

type Administrator struct {
	User  string
	Pass  string
	Stack *Stacks.Stack
}

// Methods GET
func (admin *Administrator) GetUser() string {
	return admin.User
}

func (admin *Administrator) GetPass() string {
	return admin.Pass
}

func (admin *Administrator) GetActionsAdmin() *Stacks.Stack {
	return admin.Stack
}

// Methods SET
func (admin *Administrator) SetUser(user string) {
	admin.User = user
}

func (admin *Administrator) SetPass(pass string) {
	admin.Pass = pass
}

func (admin *Administrator) SetActionsAdmin(stack *Stacks.Stack) {
	admin.Stack = stack
}
