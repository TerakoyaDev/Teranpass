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
	if !reflect.DeepEqual(newEvent.User, newUser) {
		t.Errorf("got %v want %v", newEvent.User, newUser)
	}
	if newEvent.EventName != "eventName" {
		t.Errorf("got %v want %v", newEvent.EventName, "eventName")
	}
	if newEvent.Description != "description" {
		t.Errorf("got %v want %v", newEvent.Description, "description")
	}
	if newEvent.Location != "location" {
		t.Errorf("got %v want %v", newEvent.Location, "location")
	}
	if newEvent.StartTime != "startTime" {
		t.Errorf("got %v want %v", newEvent.StartTime, "startTime")
	}
	if newEvent.EndTime != "endTime" {
		t.Errorf("got %v want %v", newEvent.EndTime, "endTime")
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
