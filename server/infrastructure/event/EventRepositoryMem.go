package event

import (
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
)

type EventRepositoryMem struct {
	events []*event.Event
}

func NewEventRepositoryMem() EventRepository {
	return &EventRepositoryMem{[]*event.Event{}}
}

// store event to repository
func (self *EventRepositoryMem) Store(item *event.Event) EventRepository {
	self.events = append(self.events, item)
	return self
}

func (self EventRepositoryMem) FindById(eventId string) (*event.Event, error) {
	for _, val := range self.events {
		if val.EventId == eventId {
			return val, nil
		}
	}

	return nil, errors.New("user not found")
}

func (self *EventRepositoryMem) DeleteById(eventId string) (*event.Event, error) {
	removedSlice := []*event.Event{}
	var removedEvent *event.Event
	for _, val := range self.events {
		if val.EventId != eventId {
			removedSlice = append(removedSlice, val)
		} else {
			removedEvent = val
		}
	}

	if len(removedSlice) == len(self.events) {
		return nil, errors.New("event not found")
	} else {
		self.events = removedSlice
		return removedEvent, nil
	}
}

func (self EventRepositoryMem) FindAll() []*event.Event {
	return self.events
}
