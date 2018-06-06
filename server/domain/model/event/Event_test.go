package event

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"reflect"
	"testing"
)

func TestCreateEventSuccess(t *testing.T) {
	newUser, err := user.NewUser("userName", "description", "image", "email")
	if err != nil {
		t.Fatal(err)
	}

	newEvent, err := NewEvent(
		newUser,
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime")
	if err != nil {
		t.Fatal(err)
	}

	// confirm each value
	if !reflect.DeepEqual(newEvent.user, newUser) {
		t.Errorf("got %v want %v", newEvent.user, newUser)
	}
	if newEvent.eventName != "eventName" {
		t.Errorf("got %v want %v", newEvent.eventName, "eventName")
	}
	if newEvent.description != "description" {
		t.Errorf("got %v want %v", newEvent.description, "description")
	}
	if newEvent.location != "location" {
		t.Errorf("got %v want %v", newEvent.location, "location")
	}
	if newEvent.startTime != "startTime" {
		t.Errorf("got %v want %v", newEvent.startTime, "startTime")
	}
	if newEvent.endTime != "endTime" {
		t.Errorf("got %v want %v", newEvent.endTime, "endTime")
	}
}
func TestCreateUserFailed(t *testing.T) {
	newUser, err := user.NewUser("userName", "description", "image", "email")
	if err != nil {
		t.Fatal(err)
	}
	_, err = NewEvent(
		nil,
		"eventName",
		"description",
		"location",
		"startTime",
		"endTime")
	if err == nil {
		t.Fatal(err)
	}

	_, err = NewEvent(
		newUser,
		"",
		"description",
		"location",
		"startTime",
		"endTime")
	if err == nil {
		t.Fatal(err)
	}
	_, err = NewEvent(
		newUser,
		"eventName",
		"",
		"location",
		"startTime",
		"endTime")
	if err == nil {
		t.Fatal(err)
	}
	_, err = NewEvent(
		newUser,
		"eventName",
		"description",
		"",
		"startTime",
		"endTime")
	if err == nil {
		t.Fatal(err)
	}
	_, err = NewEvent(
		newUser,
		"eventName",
		"description",
		"location",
		"",
		"endTime")
	if err == nil {
		t.Fatal(err)
	}
	_, err = NewEvent(
		newUser,
		"eventName",
		"description",
		"location",
		"startTime",
		"")
	if err == nil {
		t.Fatal(err)
	}
}
