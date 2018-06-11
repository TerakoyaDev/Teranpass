# server

This is dir for server side code.

## Install dependencies

```
dep init
dep ensure
```

## Test

```
go test -v github.com/TerakoyaDev/Teranpass/<package>
```

If you need testing all files, run following command.

```
go test -v github.com/TerakoyaDev/Teranpass/...
```

## graphQLの叩き方

endpoint: /graphql

#### fetch single user

```
BODY: {"query": "{user(id: \"1\"){userName}}"}
```

#### fetch all user

```
BODY: {"query": "{userList{userName}}"}
```

#### create user

```
BODY: {"query": "{createUser(userName: \"mituba\", ....){userName}}"}
```

#### update user

```
BODY: {"query": "{updateUser(userName: \"mituba\", ....){userName}}"}
```

#### delete user

```
BODY: {"query": "{deleteUser(userId: \"1\"){userName}}"}
```

## Documentation

Please read [wiki](https://github.com/TerakoyaDev/Teranpass/wiki)

## Contributing

Welcome commit and pull request.
