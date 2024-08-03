# LLM App

## Setup

1. Build the Docker image:

   ```sh
   docker build -t llm_app .
   ```

2. Run the Docker container:
   ```sh
   docker run -d -p 5000:5000 llm_app
   ```

## Usage

1. Select model:

   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{"model_name": "llama2"}' http://localhost:5000/select_model
   ```

2. Query model:
   ```sh
   curl -X POST -H "Content-Type: application/json" -d '{"question": "What is AI?"}' http://localhost:5000/query
   ```
