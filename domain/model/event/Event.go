package event

import (
	"github.com/TerakoyaDev/Teranpass/domain/model/user"
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
	endTime string) *Event {
	return &Event{
		eventId:        uuid.New(),
		user:           givenUser,
		eventName:      eventName,
		description:    description,
		location:       location,
		startTime:      startTime,
		endTime:        endTime,
		participants:   []*user.User{},
		registeredTime: time.Now().Unix()}
}

func (self *Event) Equals(other *Event) bool {
	if self.eventId == other.eventId {
		return true
	}
	return false
}
