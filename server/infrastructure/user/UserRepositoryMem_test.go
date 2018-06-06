package user

import (
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"reflect"
	"testing"
)

var mituba, _ = user.NewUser("mituba", "des", "photoURL", "email")
var terako, _ = user.NewUser("terako", "des", "photoURL", "email")

func TestUserRepositoryMemFindByIdSuccess(t *testing.T) {
	newUserRepositoryMem := NewUserRepositoryMem()
	newUserRepositoryMem.Store(mituba)

	actual, err := newUserRepositoryMem.FindById(mituba.UserId)
	if err != nil {
		panic(err)
	}

	// isEquals
	if !actual.Equals(*mituba) {
		t.Errorf("got %v want %v", actual, mituba)
	}
}

func TestUserRepositoryMemFindByIdFailed(t *testing.T) {
	newUserRepositoryMem := NewUserRepositoryMem()
	newUserRepositoryMem.Store(mituba)

	_, err := newUserRepositoryMem.FindById(terako.UserId)

	// user not found
	if err == nil {
		t.Fatal(err)
	}
}

func TestUserRepositoryMemIsStored(t *testing.T) {
	newUserRepositoryMem := NewUserRepositoryMem()

	actual := newUserRepositoryMem.UserList()
	excepted := []*user.User{}

	// isEmpty
	if !reflect.DeepEqual(actual, excepted) {
		t.Errorf("got %v want %v", actual, excepted)
	}

	newUserRepositoryMem.Store(mituba)

	actual = newUserRepositoryMem.UserList()
	excepted = []*user.User{mituba}

	// isStored
	if len(actual) != 1 && !reflect.DeepEqual(actual, excepted) {
		t.Errorf("got %v want %v", actual, excepted)
	}

	newUserRepositoryMem.Store(terako)

	actual = newUserRepositoryMem.UserList()
	excepted = []*user.User{terako}

	// isStored
	if len(actual) != 2 && !reflect.DeepEqual(actual, excepted) {
		t.Errorf("got %v want %v", actual, excepted)
	}
}

func TestUserRepositoryMemSameEventStored(t *testing.T) {
	newUserRepositoryMem := NewUserRepositoryMem()
	newUserRepositoryMem.Store(mituba)

	newUserRepositoryMem2 := NewUserRepositoryMem()
	newUserRepositoryMem2.Store(mituba)

	actual := newUserRepositoryMem.UserList()
	excepted := newUserRepositoryMem2.UserList()

	// equal
	if !reflect.DeepEqual(actual, excepted) {
		t.Errorf("got %v want %v", actual, excepted)
	}
}

func TestUserRepositoryMemDifferentEventStored(t *testing.T) {
	newUserRepositoryMem := NewUserRepositoryMem()
	newUserRepositoryMem.Store(mituba)

	newUserRepositoryMem2 := NewUserRepositoryMem()
	newUserRepositoryMem2.Store(terako)

	actual := newUserRepositoryMem.UserList()
	excepted := newUserRepositoryMem2.UserList()

	// not equal
	if reflect.DeepEqual(actual, excepted) {
		t.Errorf("got %v want %v", actual, excepted)
	}
}
