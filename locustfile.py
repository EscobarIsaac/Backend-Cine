from locust import HttpUser, task, between
import random
from datetime import datetime

class CineEncuentroUser(HttpUser):
    wait_time = between(1, 3)  # tiempo aleatorio entre cada solicitud

    host = "http://localhost:8000"  # Cambia si tu gateway expone otro puerto

    @task(1)
    def crear_pelicula(self):
        payload = {
            "titulo": f"Pelicula Test {random.randint(1,1000)}",
            "genero": random.choice(["Acción", "Drama", "Comedia"]),
            "duracion": random.randint(90, 150),
            "clasificacion": random.choice(["ATP", "13+", "16+", "18+"])
        }
        self.client.post("/eventos/peliculas", json=payload)

    @task(2)
    def listar_peliculas(self):
        self.client.get("/eventos/peliculas")

    @task(1)
    def enviar_mensaje_rabbit(self):
        mensaje = {
            "mensaje": f"Mensaje de prueba desde locust {random.randint(1000, 9999)}",
            "fecha": datetime.utcnow().isoformat() + "Z",
            "tipo": "INFO"
        }
        self.client.post("/eventos/test-rabbit", json=mensaje)
