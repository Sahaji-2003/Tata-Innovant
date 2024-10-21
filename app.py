import fitz  # PyMuPDF
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import time

def extract_text_from_pdf(pdf_path):
    with fitz.open(pdf_path) as pdf:
        text = ""
        for page in pdf:
            text += page.get_text()
    return text

pdf_files = ["database/tata1.pdf", "database/tata2.pdf","database/tata3.pdf"]  # Replace with your PDF file paths
corpus = [extract_text_from_pdf(pdf) for pdf in pdf_files]

# Configure the API key for Gemini
os.environ['API_KEY'] = "AIzaSyBtO4zrpspHyie3JuXnOuzFMphpeQCPvOk"
api_key = os.environ['API_KEY']
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')

class GraphRAG:
    def __init__(self, model, corpus):
        self.model = model
        self.corpus = corpus

    def generate_response(self, query):
        # Start a new chat session with an empty history
        chat = self.model.start_chat(history=[])
        
        # Adjust the prompt to encourage concise responses
        prompt = f'''You are a TATA Car Helper Chatbot /
            Alwas Start With How Can i help you to get your dream car /
            Then Help the user to get the car information 
            Provide a very concise and summarized response: {query} {self.corpus[0]}/
            Note: if the context of the car is not present in the context then give solution as per your knowledge'''
        response = self.send_message_with_retry(chat, prompt)
        return response

    def send_message_with_retry(self, chat, message, retries=3, delay=5):
        for attempt in range(retries):
            try:
                response = chat.send_message(message)
                return response.text
            except genai.exceptions.InternalServerError as e:
                print(f"Error: {e}")
                if attempt < retries - 1:
                    print(f"Retrying in {delay} seconds...")
                    time.sleep(delay)
                else:
                    print("Max retries reached. Exiting.")
                    return "Error: Unable to generate response."

graph_rag = GraphRAG(model, corpus)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat_route():
    user_input = request.json['message']
    response = graph_rag.generate_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
