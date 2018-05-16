package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/domain/model/event"
)

type EventRepositoryImpl struct {
	events []*event.Event
}

func newEventRepositoryImpl() *EventRepositoryImpl {
	return &EventRepositoryImpl{[]*event.Event{}}
}

func (self *EventRepositoryImpl) store(event *event.Event) *EventRepositoryImpl {
	self.events = append(self.events, event)
	return self
}

func (self *EventRepositoryImpl) Equals(other *EventRepositoryImpl) bool {
	var isEquals = true
	for i := 0; i < len(self.events); i++ {
		if !self.events[i].Equals(other.events[i]) {
			isEquals = false
		}
	}
	return isEquals
}
