from google import genai
from google.genai import types
from dotenv import load_dotenv
from os import getenv

load_dotenv()
api = getenv("GOOGLE_API")

client = genai.Client(api_key=api)
model = "gemini-2.5-pro"

def generate_response(prompt: str = "Homeostasis definition") -> str:
    response = client.models.generate_content(
        model="gemini-2.5-pro",
        config=types.GenerateContentConfig(
            system_instruction="You are a helpful assistant that helps users in understanding words and learning languages.",),
        contents=prompt,
        
    )
    return response.text

    
def main():
    prompt = "Whats the definition of homeostasis."
    response = generate_response(prompt)
    print("Response:", response)

if __name__ == "__main__":
    main()