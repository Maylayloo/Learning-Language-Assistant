from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logic import send_message, get_history

app = FastAPI()

# Pozwalamy Next.js (frontendowi) łączyć się z backendem
app.add_middleware(
    CORSMiddleware,
    allow_origins=[],  # adres frontu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/chat")
async def chat_endpoint(prompt: str):
    response = send_message(prompt)
    return {"response": response}

@app.get("/api/history")
async def history_endpoint():
    history = get_history()
    return {"history": history}