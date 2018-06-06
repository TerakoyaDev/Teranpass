package infrastructure

import "github.com/TerakoyaDev/Teranpass/server/infrastructure/user"

var NewUserRepository func() user.UserRepository = user.NewUserRepositoryMem

func UseMem() {
	NewUserRepository = user.NewUserRepositoryMem
}
