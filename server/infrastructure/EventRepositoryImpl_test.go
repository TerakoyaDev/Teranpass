package infrastructure

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"testing"
)

func TestEventRepositorySameEventStored(t *testing.T) {
	event, _ := setupCreateNewEvent(t)

	repository := newEventRepositoryImpl()
	actual := repository.store(event)

	repository2 := newEventRepositoryImpl()
	expected := repository2.store(event)

	// equal object
	if !actual.Equals(expected) {
		t.Errorf("got %v want %v", actual, expected)
	}

	if !expected.Equals(actual) {
		t.Errorf("got %v want %v", actual, expected)
	}

	// equal object
	if !actual.Equals(actual) {
		t.Errorf("got %v want %v", actual, actual)
	}
	if !expected.Equals(expected) {
		t.Errorf("got %v want %v", expected, expected)
	}

	// test equal address
	if &actual != &actual {
		t.Errorf("got %v want %v", &actual, &actual)
	}
	if &expected != &expected {
		t.Errorf("got %v want %v", &expected, &expected)
	}

	// different address ??
	if &actual == &expected {
		t.Errorf("got %v want %v", &actual, &expected)
	}

}

func TestEventRepositoryDifferentEventStored(t *testing.T) {
	// create
	event, eventV2 := setupCreateNewEvent(t)

	repository := newEventRepositoryImpl()
	actual := repository.store(event)

	repository2 := newEventRepositoryImpl()
	expected := repository2.store(eventV2)

	if actual.events[0].Equals(expected.events[0]) {
		t.Errorf("got %v want %v", actual, expected)
	}

	// not equal object
	if actual.Equals(expected) {
		t.Errorf("got %v want %v", actual, expected)
	}

	if expected.Equals(actual) {
		t.Errorf("got %v want %v", actual, expected)
	}

	// equal object
	if !actual.Equals(actual) {
		t.Errorf("got %v want %v", actual, expected)
	}
	if !expected.Equals(expected) {
		t.Errorf("got %v want %v", actual, expected)
	}

	// test equal address
	if &actual != &actual {
		t.Errorf("got %v want %v", &actual, &actual)
	}
	if &expected != &expected {
		t.Errorf("got %v want %v", &expected, &expected)
	}

	// different address ??
	if &actual == &expected {
		t.Errorf("got %v want %v", &actual, &expected)
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
