package service

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
)

func FindEventById(eventId string) (*event.Event, error) {
	repository := infrastructure.NewEventRepository()
	return repository.FindById(eventId)
}

func DeleteEventById(eventId string) (*event.Event, error) {
	repository := infrastructure.NewEventRepository()
	return repository.DeleteById(eventId)
}
