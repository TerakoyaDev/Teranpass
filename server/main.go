package main

import (
	"encoding/json"
	"fmt"
	"github.com/TerakoyaDev/Teranpass/server/application/graphql_util"
	"github.com/graphql-go/graphql"
	"net/http"
	"io/ioutil"
)

type Query struct {
	Query string `json:"query"`
}

func executeQuery(query string, schema graphql.Schema) *graphql.Result {
	result := graphql.Do(graphql.Params{
		Schema:        schema,
		RequestString: query,
	})
	if len(result.Errors) > 0 {
		fmt.Printf("wrong result, unexpected errors: %v", result.Errors)
	}
	return result
}

func main() {
	http.HandleFunc("/graphql", func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()

		// bodyの読み取り処理
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}

		jsonBytes := ([]byte)(fmt.Sprintf("%s", body))
		query := new(Query)

		if err = json.Unmarshal(jsonBytes, query); err != nil {
			panic(err)
		}

		result := executeQuery(query.Query, graphql_util.NewSchema())
		json.NewEncoder(w).Encode(result)
	})

	http.ListenAndServe(":8080", nil)
}
