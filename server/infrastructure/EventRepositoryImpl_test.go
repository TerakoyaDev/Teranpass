package infrastructure

import (
	"testing"
)

func TestEventRepositorySameEventStored(t *testing.T) {
	event, _ := setupCreateNewEvent(t)

	repository := newEventRepositoryImpl()
	actual := repository.store(event)

	repository_2 := newEventRepositoryImpl()
	expected := repository_2.store(event)

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
	event, event_v2 := setupCreateNewEvent(t)

	repository := newEventRepositoryImpl()
	actual := repository.store(event)

	repository_2 := newEventRepositoryImpl()
	expected := repository_2.store(event_v2)

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
