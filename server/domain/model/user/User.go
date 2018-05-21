package user

import (
	"github.com/google/uuid"
)

type User struct {
	userId      [16]byte
	userName    string
	description string
	image       string
	email       string
}

// constructor
func NewUser(
	userName string,
	description string,
	image string,
	email string) *User {
	return &User{
		userId:      uuid.New(),
		userName:    userName,
		description: description,
		image:       image,
		email:       email}
}

func Equals(other User) {

}
