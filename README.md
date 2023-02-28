# API-Fetch
Parsing API


## Installation
***
```
$ Run npm install to install dependencies
$ Run npm run start to start the local server
$ Load http://localhost:8000 to test the endpoint. It will display a json result {"message":"Hey"}
```


## API Endpoints
***
# POST server/incomingdata
```
{
 	"message":"success",
 	"data":[
  		{
			"USER_ID": 1
			"APP_ID": "1234APPID1234",
			"APP_SECRET" : "enwdj3bshwer43bjhjs9ereuinkjcnsiurev8s",
			"ACTION": "user.update",
			"Content_Type":"application/json",
			"Accept":"*"
		}		
	]
}

```

# GET /server/incomingdatas
![Screenshot_20230217_030053](https://user-images.githubusercontent.com/51900501/220270427-7bc405b8-1992-4bb0-9194-d59a8d817237.png)

