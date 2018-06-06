package event

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"reflect"
	"testing"
)

func TestEventRepositorySameEventStored(t *testing.T) {
	event, _ := setupCreateNewEvent(t)

	repository := NewEventRepositoryMem()
	actual := repository.Store(event)

	repository2 := NewEventRepositoryMem()
	expected := repository2.Store(event)

	if !reflect.DeepEqual(actual.EventList(), expected.EventList()) {
		t.Errorf("got %v want %v", actual.EventList(), expected.EventList())
	}
}

func TestEventRepositoryDifferentEventStored(t *testing.T) {
	// create
	event, eventV2 := setupCreateNewEvent(t)

	repository := NewEventRepositoryMem()
	actual := repository.Store(event)

	repository2 := NewEventRepositoryMem()
	expected := repository2.Store(eventV2)

	if actual.EventList()[0].Equals(expected.EventList()[0]) {
		t.Errorf("got %v want %v", actual, expected)
	}

	if reflect.DeepEqual(actual.EventList(), expected.EventList()) {
		t.Errorf("got %v want %v", actual.EventList(), expected.EventList())
	}
}

// setup
func setupCreateNewEvent(t *testing.T) (*event.Event, *event.Event) {
	newUser, err := user.NewUser("userName", "description", "image", "email")
	if err != nil {
		t.Fatal(err)
	}

	actual, err := event.NewEvent(
		newUser,
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime")
	if err != nil {
		t.Fatal(err)
	}

	newUser, err = user.NewUser("userName", "description", "image", "email")
	if err != nil {
		t.Fatal(err)
	}
	expected, err := event.NewEvent(
		newUser,
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime")
	if err != nil {
		t.Fatal(err)
	}
	return actual, expected
}
