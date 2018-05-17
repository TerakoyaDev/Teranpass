package infrastructure

import (
	"errors"
	"github.com/TerakoyaDev/Teranpass/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/domain/model/user"
)

func CreateNewEvent(
	eventName,
	description,
	location,
	startTime,
	endTime string,
	user *user.User) (*event.Event, error) {

	// validate
	if eventName == "" {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("eventName is empty")
	}
	if description == "" {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("description is empty")
	}
	if location == "" {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("location is empty")
	}
	if startTime == "" {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("startTime is empty")
	}
	if endTime == "" {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("endTime is empty")
	}
	if user == nil {
		return event.NewEvent(nil, "", "", "", "", ""), errors.New("user is nil")
	}

	// call constructor
	event := event.NewEvent(user, eventName, description, location, startTime, endTime)
	return event, nil
}
