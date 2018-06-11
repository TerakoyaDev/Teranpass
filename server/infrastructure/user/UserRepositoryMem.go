package user

import (
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
)

type UserRepositoryMem struct {
	users []*user.User
}

func NewUserRepositoryMem() UserRepository {
	return &UserRepositoryMem{[]*user.User{}}
}

// store event to repository
func (self *UserRepositoryMem) Store(item *user.User) UserRepository {
	self.users = append(self.users, item)
	return self
}

func (self *UserRepositoryMem) Update(item *user.User) UserRepository {
	updatedSlice := []*user.User{}
	for _, val := range self.users {
		if val.UserId == item.UserId {
			updatedSlice = append(updatedSlice, item)
		} else {
			updatedSlice = append(updatedSlice, val)
		}
	}
	self.users = updatedSlice
	return self
}

func (self UserRepositoryMem) FindById(userId string) (*user.User, error) {
	for _, val := range self.users {
		if val.UserId == userId {
			return val, nil
		}
	}

	return nil, errors.New("user not found")
}

func (self *UserRepositoryMem) DeleteById(userId string) (*user.User, error) {
	removedSlice := []*user.User{}
	var removedUser *user.User
	for _, val := range self.users {
		if val.UserId != userId {
			removedSlice = append(removedSlice, val)
		} else {
			removedUser = val
		}
	}

	if len(removedSlice) == len(self.users) {
		return nil, errors.New("user not found")
	} else {
		self.users = removedSlice
		return removedUser, nil
	}
}

func (self UserRepositoryMem) FindAll() []*user.User {
	return self.users
}
