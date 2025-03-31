Projekt: [TaskManager]

Opis

Krótki opis projektu:

Cel aplikacji

Główne funkcje

Technologie: Node.js, Express, React, MySQL

Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:

Node.js (sprawdź wersję: node -v)

MySQL (sprawdź wersję: mysql --version)

Git (sprawdź wersję: git --version)

Instalacja

Sklonuj repozytorium

git clone https://github.com/twoj-user/twoj-projekt.git
cd twoj-projekt

Instalacja zależności

Backend

cd backend
npm install

Frontend

cd ../frontend
npm install

Konfiguracja bazy danych

Utwórz bazę danych w MySQL

Uzupełnij plik .env w folderze backend

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=haslo
DB_NAME=nazwa_bazy

Uruchamianie aplikacji

Uruchom backend

cd backend
npm start

Uruchom frontend

cd frontend
npm start

Aplikacja powinna działać na:

Backend: http://localhost:5000

Frontend: http://localhost:3000

Struktura katalogów

/
|-- backend/       # Serwer Node.js + Express
|-- frontend/      # Aplikacja React
|-- README.md      # Dokumentacja

API (przykładowe endpointy)

GET /api/users - Pobiera listę użytkowników

POST /api/users - Dodaje nowego użytkownika

Autorzy

Imię i Nazwisko - Twój GitHub

Licencja

Ten projekt jest udostępniany na licencji MIT.
