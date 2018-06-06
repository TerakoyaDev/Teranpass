package service

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
)

func FindEventById(userId string) (*event.Event, error) {
	repository := infrastructure.NewEventRepository()
	return repository.FindById(userId)
}
