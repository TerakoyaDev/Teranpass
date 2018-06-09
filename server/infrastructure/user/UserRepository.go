package user

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
)

type UserRepository interface {
	Store(item *user.User) UserRepository
	FindById(userId string) (*user.User, error)
	DeleteById(userId string) (*user.User, error)
	FindAll() []*user.User
}
