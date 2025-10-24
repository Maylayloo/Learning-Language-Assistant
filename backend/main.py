from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logic import generate_response

app = FastAPI()

# Pozwalamy Next.js (frontendowi) łączyć się z backendem
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # adres frontu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/generate")
def generate(prompt: str):
    response = generate_response(prompt)
    return {"response": response}

