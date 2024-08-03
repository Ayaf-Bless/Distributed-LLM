from flask import Flask, request, jsonify
from models import Llama2Model, MistralModel

app = Flask(__name__)
models = {
    "llama2": Llama2Model(),
    "mistral": MistralModel()
}
current_model = None

@app.route('/select_model', methods=['POST'])
def select_model():
    global current_model
    model_name = request.json.get('model_name')
    if model_name in models:
        current_model = models[model_name]
        return jsonify({"message": f"Model {model_name} selected."}), 200
    return jsonify({"error": "Invalid model name"}), 400

@app.route('/query', methods=['POST'])
def query():
    global current_model
    if not current_model:
        return jsonify({"error": "No model selected"}), 400
    question = request.json.get('question')
    answer = current_model.query(question)
    return jsonify({"answer": answer, "context": current_model.context}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
