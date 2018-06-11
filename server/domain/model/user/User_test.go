package user

import "testing"

func TestCreateUserSuccess(t *testing.T) {
	mituba, err := NewUser("mituba", "des", "photoURL", "email")
	if err != nil {
		t.Fatal(err)
	}

	// confirm each value
	if mituba.UserName != "mituba" {
		t.Errorf("got %v want %v", mituba.UserName, "mituba")
	}
	if mituba.Description != "des" {
		t.Errorf("got %v want %v", mituba.Description, "des")
	}
	if mituba.PhotoURL != "photoURL" {
		t.Errorf("got %v want %v", mituba.PhotoURL, "photoURL")
	}
	if mituba.Email != "email" {
		t.Errorf("got %v want %v", mituba.Email, "email")
	}
}
func TestCreateUserFailed(t *testing.T) {
	// err should be not nil
	_, err := NewUser("", "des", "photoURL", "email")
	if err == nil {
		t.Fatal(err)
	}

	_, err = NewUser("mituba", "", "photoURL", "email")
	if err == nil {
		t.Fatal(err)
	}

	_, err = NewUser("mituba", "des", "", "email")
	if err == nil {
		t.Fatal(err)
	}

	_, err = NewUser("mituba", "des", "photoURL", "")
	if err == nil {
		t.Fatal(err)
	}
}
