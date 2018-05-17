package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/domain/model/event"
)

type EventRepository interface {
	store(event *event.Event) *EventRepositoryImpl
	Equals(other *EventRepositoryImpl) bool
}
