package event

import (
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"github.com/google/uuid"
	"time"
)

type Event struct {
	eventId        [16]byte
	user           *user.User
	eventName      string
	description    string
	location       string
	startTime      string
	endTime        string
	participants   []*user.User
	registeredTime int64
}

// constructor
func NewEvent(
	givenUser *user.User,
	eventName string,
	description string,
	location string,
	startTime string,
	endTime string) (*Event, error) {

	// validate
	if eventName == "" {
		return nil, errors.New("eventName is empty")
	}
	if description == "" {
		return nil, errors.New("description is empty")
	}
	if location == "" {
		return nil, errors.New("location is empty")
	}
	if startTime == "" {
		return nil, errors.New("startTime is empty")
	}
	if endTime == "" {
		return nil, errors.New("endTime is empty")
	}
	if givenUser == nil {
		return nil, errors.New("user is nil")
	}

	return &Event{
		eventId:        uuid.New(),
		user:           givenUser,
		eventName:      eventName,
		description:    description,
		location:       location,
		startTime:      startTime,
		endTime:        endTime,
		participants:   []*user.User{},
		registeredTime: time.Now().Unix()}, nil
}

func (event *Event) Equals(other *Event) bool {
	if event.eventId == other.eventId {
		return true
	}
	return false
}
