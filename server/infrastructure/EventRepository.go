package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
)

type EventRepository interface {
	store(event *event.Event) *EventRepositoryImpl
	Equals(other *EventRepositoryImpl) bool
}
