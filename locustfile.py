from locust import HttpUser, task, between
import random
from datetime import datetime

class CineEncuentroUser(HttpUser):
    host = "http://localhost:8000"  # Gateway

    wait_time = between(1, 3)

    @task
    def flujo_completo(self):
        # Paso 1: Obtener lista de películas
        with self.client.get("/eventos/peliculas", catch_response=True) as response:
            if response.status_code == 200 and isinstance(response.json(), list) and len(response.json()) > 0:
                peliculas = response.json()
                pelicula = random.choice(peliculas)

                # Paso 2: Crear entrada
                entrada_payload = {
                    "peliculaId": pelicula.get("id", 1),  # Asegúrate de tener un campo "id"
                    "usuario": f"usuario_{random.randint(1, 1000)}",
                    "cantidad": 1,
                    "fecha": datetime.utcnow().isoformat() + "Z"
                }

                self.client.post("/entradas/crear", json=entrada_payload)
            else:
                response.failure("❌ No se pudieron obtener películas para continuar el flujo")
