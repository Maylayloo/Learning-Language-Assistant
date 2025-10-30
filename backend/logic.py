from google.genai import types
from dotenv import load_dotenv
import google.generativeai as genai
from os import getenv

load_dotenv()
api = getenv("GOOGLE_API_KEY")

genai.configure(api_key=api)

modelname = "gemini-2.5-flash"

system_prompt = """You are a helpful language learning assistant.
Your task is to help users learn new languages by providing translations, explanations of grammar, vocabulary suggestions, and practice exercises.
Always respond in a friendly and encouraging manner."""

model = genai.GenerativeModel(modelname, system_instruction=system_prompt)

chats = []

def send_message(message: str, chat_id) -> str:
    response = chats[int(chat_id)-1].send_message(
        message
    )
    return response.text

def create_chat():
    try:
        chat = model.start_chat(history=[])
        chats.append(chat)
        chat_id = len(chats)
        return {chat_id}
    except Exception as e:
        print("Error creating chat:", e)
        return {None}

def delete_chat(chat_id):
    try:
        if chat_id in chats:
            del chats[int(chat_id)-1]
    except Exception as e:
        print("Error deleting chat:", e)

# def list_chats():
#     for chat in chats:
#         return chat