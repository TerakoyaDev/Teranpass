package graphql_util

import (
	"github.com/graphql-go/graphql"
	"github.com/TerakoyaDev/Teranpass/server/application/graphql_util/types"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
)

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields {
		"createUser": &graphql.Field{
			Type: types.UserType,
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
		},
	},
})