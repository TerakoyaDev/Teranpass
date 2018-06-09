package fields

import (
	"encoding/json"
	"errors"
	"github.com/TerakoyaDev/Teranpass/server/application/graphql_util/types"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/event"
	"github.com/TerakoyaDev/Teranpass/server/domain/model/user"
	"github.com/TerakoyaDev/Teranpass/server/domain/service"
	"github.com/TerakoyaDev/Teranpass/server/infrastructure"
	"github.com/graphql-go/graphql"
)

var EventField = &graphql.Field{
	Type:        types.EventType,
	Description: "Get single event",
	Args: graphql.FieldConfigArgument{
		"eventId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		eventId, isOK := params.Args["eventId"].(string)
		if isOK {
			return service.FindEventById(eventId)
		}

		return nil, errors.New("no eventId")
	},
}

var EventListField = &graphql.Field{
	Type:        graphql.NewList(types.EventType),
	Description: "List of events",
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		return infrastructure.NewEventRepository().FindAll(), nil
	},
}

var CreateEventField = &graphql.Field{
	Type:        types.EventType,
	Description: "Create new event",
	Args: graphql.FieldConfigArgument{
		"user": &graphql.ArgumentConfig{
			Type: types.UserInput,
		},
		"eventName": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"description": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"location": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"startTime": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"endTime": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		givenUser, _ := params.Args["user"]
		eventName, _ := params.Args["eventName"].(string)
		description, _ := params.Args["description"].(string)
		location, _ := params.Args["location"].(string)
		startTime, _ := params.Args["startTime"].(string)
		endTime, _ := params.Args["endTime"].(string)

		parsedJson, err := json.Marshal(givenUser)
		if err != nil {
			panic(err)
		}
		var parsedUser user.User
		err = json.Unmarshal(parsedJson, &parsedUser)
		if err != nil {
			panic(err)
		}

		// create new Event
		newEvent, err := event.NewEvent(&parsedUser, eventName, description, location, startTime, endTime)
		if err != nil {
			panic(err)
		}

		infrastructure.NewEventRepository().Store(newEvent)
		return newEvent, nil
	},
}

var DeleteEventField = &graphql.Field{
	Type:        types.EventType,
	Description: "Get single event",
	Args: graphql.FieldConfigArgument{
		"eventId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		eventId, isOK := params.Args["eventId"].(string)
		if isOK {
			return service.DeleteEventById(eventId)
		}

		return nil, errors.New("no eventId")
	},
}
