# ITSC-3155-Programs-Group-9

# Authors
- Bilal Sohail
- Connor Dawley
- David Ho

# Description

# Folder Structure
- client: React frontend
- project: Django backend
    - api: Django rest api that allows the React frontend to connect to
    - base: Django app that holds models and controllers
    - project: Django project

# Tech Stack
## Front End
- Typescript: Superset of javascript
- React: Javascript UI library
- React Router Dom: router library for React
- React Icons: React icons library
- React Loading Skeleton: React loading skeleton library
- Redux Toolkit: Modern Redux library for React Redux
- React Query: Rest data management library for React
- Headless UI: Component library for React
- Axios: Rest calls for Javascript
- Tailwind CSS:
- Clsx: Conditional classname utility library

## Back End
- Django: Python backend library
- Django Cors Headers: Allows cors to connect to frontend
- Django Rest Framework: Rest api framework library for Django
- Django Rest Framework SimpleJWT: JWT library for Django Rest Framework

# Installation Instructions
```shell
git clone https://github.com/David-Chan-Ho2/ITSC-3155-Programs-Group-9.git
```

## Python Start up
```shell
python -m venv .venv
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows
```

## Django Setup
### Clone repository
```shell
git clone https://github.com/your-repo.git
cd your-repo/backend
```

### Create a virtual environment
```shell
python -m venv .venv
source .venv/bin/activate  # Mac/Linux
.venv\Scripts\activate     # Windows
```

### Install dependencies
```shell
pip install -r requirements.txt
```

### Set up environment variables
```shell
Create a .env file and add your secrets/configurations.
```

### Apply migrations
```shell
python manage.py migrate
```

### Run the development server
```shell
python manage.py runserver
```

## React Setup
### Navigate to the frontend directory
```shell
cd ../frontend
```

### Install dependencies
```shell
yarn install
```

### Run the development server
```shell
yarn start
```