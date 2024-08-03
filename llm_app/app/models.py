# this is the Mock models to demonstrate structure, bellow is how it can be implemented using Hugging Face transformers
class Llama2Model:
    def __init__(self):
        self.context = []
    
    def query(self, question):
        self.context.append(question)
        # Mock response
        return f"Llama2 response to: {question}"

class MistralModel:
    def __init__(self):
        self.context = []
    
    def query(self, question):
        self.context.append(question)
        # Mock response
        return f"Mistral response to: {question}"


# to use this uncomment "transformers" and "torch" within the requirements.txt
# from transformers import pipeline

# class Llama2Model:
#     def __init__(self):
#         self.context = []
#         self.model_name = "meta-llama/Llama-2-7b"  
#         self.pipeline = pipeline('text-generation', model=self.model_name)
    
#     def query(self, question):
#         self.context.append(question)
#         # Generate response using the model
#         response = self.pipeline(question, max_length=50, num_return_sequences=1)
#         answer = response[0]['generated_text']
#         return answer

# class MistralModel:
#     def __init__(self):
#         self.context = []
#         self.model_name = "mistralai/Mistral-7B"  
#         self.pipeline = pipeline('text-generation', model=self.model_name)
    
#     def query(self, question):
#         self.context.append(question)
#         # Generate response using the model
#         response = self.pipeline(question, max_length=50, num_return_sequences=1)
#         answer = response[0]['generated_text']
#         return answer