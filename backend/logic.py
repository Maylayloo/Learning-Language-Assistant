from google import genai
from google.genai import types
from dotenv import load_dotenv
from os import getenv

load_dotenv()
api = getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=api)
model = "gemini-2.5-flash"

system_prompt = """You are a helpful language learning assistant.
Your task is to help users learn new languages by providing translations, explanations of grammar, vocabulary suggestions, and practice exercises.
Always respond in a friendly and encouraging manner."""

chat = client.chats.create(
    model='gemini-2.5-flash', # Zalecany do czatów
    config={
        'system_instruction': system_prompt
    }
    )

def send_message(message: str):
    response = chat.send_message(
        message
    )
    return response.text