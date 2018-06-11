package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/server/infrastructure/event"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure/user"
)

var NewUserRepository func() user.UserRepository = user.NewUserRepositoryMem

func UseUserRepositoryMem() {
	NewUserRepository = user.NewUserRepositoryMem
}

var NewEventRepository func() event.EventRepository = event.NewEventRepositoryMem

func UseEventRepositoryMem() {
	NewEventRepository = event.NewEventRepositoryMem
}
