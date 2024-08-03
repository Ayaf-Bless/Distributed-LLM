# Node.js API Server

run this command, it will start everything:

```sh
docker-compose up node_server
```

## Usage

1. Send query to the Python program:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"question": "What is AI?", "model":"llama2"}' http://localhost:3000/conversation/query
```

2. List conversation history:

```sh
curl http://localhost:3000/conversations
```

3. Get conversation detail:

```sh
   curl http://localhost:3000/conversations/{id}
```
