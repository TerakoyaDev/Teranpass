package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
)

type EventRepositoryImpl struct {
	events []*event.Event
}

func newEventRepositoryImpl() *EventRepositoryImpl {
	return &EventRepositoryImpl{[]*event.Event{}}
}

// store event to repository
func (self *EventRepositoryImpl) store(event *event.Event) *EventRepositoryImpl {
	self.events = append(self.events, event)
	return self
}

func (self *EventRepositoryImpl) Equals(other *EventRepositoryImpl) bool {
	for key, event := range self.events {
		if !event.Equals(other.events[key]) {
			return false
		}
	}
	return true
}
