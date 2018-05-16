package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/domain/model/user"
)

// eventName,
// description,
// location,
// startTime,
// endTime string,
// user *model.User) ([]*model.Event, error) {

type EventRepository interface {
	CreateNewEvent(
		event event.Event,
		description,
		location,
		startTime,
		endTime string,
		user *user.User) ([]*event.Event, error)
}
