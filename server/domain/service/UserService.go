package service

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
)

func FindUserById(userId string) (*user.User, error) {
	repository := infrastructure.NewUserRepository()
	return repository.FindById(userId)
}
