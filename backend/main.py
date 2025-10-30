from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logic import send_message, create_chat, delete_chat#, list_chats

app = FastAPI()

# Pozwalamy Next.js (frontendowi) łączyć się z backendem
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000/'],  # adres frontu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/chat")
async def chat_endpoint(prompt: str, chat_id):
    response = send_message(prompt, chat_id)
    return {"response": response}

@app.post("/api/chat/create")
async def create_chat_endpoint():
    chat_id = create_chat()
    return {"chat_id": chat_id}

@app.delete("/api/chat/{chat_id}")
async def delete_chat_endpoint(chat_id: str):
    delete_chat(chat_id)
    return {"status": "deleted"}

# @app.get("/api/chats")
# async def list_chats_endpoint():
#     chat_ids = list_chats()
#     return {"chat_ids": chat_ids}
#nie dziala
