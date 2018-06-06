package graphql_util

import (
	"github.com/graphql-go/graphql"
	"github.com/TerakoyaDev/Teranpass/server/application/graphql_util/types"
	"github.com/TerakoyaDev/Teranpass/server/domain/service"
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
)

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"user": &graphql.Field{
			Type: types.UserType,
			Description: "Get single user",
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				userId, isOK := params.Args["id"].(string)
				if isOK {
					return service.FindUserById(userId)
				}

				return nil, errors.New("no userId")
			},
		},
		"userList": &graphql.Field{
			Type: graphql.NewList(types.UserType),
			Description: "List of users",
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return infrastructure.NewUserRepository().UserList(), nil
			},
		},
	},
})
