from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
from flask import render_template
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") 
genai.configure(api_key=GOOGLE_API_KEY) 
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat/', methods=['POST'])
def chat():
  data = request.get_json()
  query = data.get('query', '')
  response = model.generate_content(query)
  return jsonify({'answer': response.text})

if __name__ == '__main__':
    app.run(debug=True)
