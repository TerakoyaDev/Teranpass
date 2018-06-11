package event

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
)

type EventRepository interface {
	Store(item *event.Event) EventRepository
	Update(item *event.Event) EventRepository
	FindById(eventId string) (*event.Event, error)
	DeleteById(eventId string) (*event.Event, error)
	FindAll() []*event.Event
}
