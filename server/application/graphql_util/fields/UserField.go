package fields

import (
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/application/graphql_util/types"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"github.com/TerakoyaDev/Teranpass/server/domain/service"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
	"github.com/graphql-go/graphql"
)

var UserField = &graphql.Field{
	Type:        types.UserType,
	Description: "Get single user",
	Args: graphql.FieldConfigArgument{
		"userId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		userId, isOK := params.Args["userId"].(string)
		if isOK {
			return service.FindUserById(userId)
		}

		return nil, errors.New("no userId")
	},
}

var UserListField = &graphql.Field{
	Type:        graphql.NewList(types.UserType),
	Description: "List of users",
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		return infrastructure.NewUserRepository().FindAll(), nil
	},
}

var CreateUserField = &graphql.Field{
	Type:        types.UserType,
	Description: "Create new user",
	Args: graphql.FieldConfigArgument{
		"userName": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"description": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"photoURL": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"email": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		userName, _ := params.Args["userName"].(string)
		description, _ := params.Args["description"].(string)
		photoURL, _ := params.Args["photoURL"].(string)
		email, _ := params.Args["email"].(string)

		newUser, err := user.NewUser(userName, description, photoURL, email)
		if err != nil {
			panic(err)
		}
		infrastructure.NewUserRepository().Store(newUser)
		return newUser, nil
	},
}

var DeleteUserField = &graphql.Field{
	Type:        types.UserType,
	Description: "Delete new user",
	Args: graphql.FieldConfigArgument{
		"userId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		userId, _ := params.Args["userId"].(string)
		return service.DeleteUserById(userId)
	},
}
