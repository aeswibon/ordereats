# Order Eats

![Vercel Status](https://img.shields.io/badge/vercel-passing-brightgreen?style=plastic&logo=vercel&link=https%3A%2F%2Fordereats.vercel.app%2F)
![Render Status](https://img.shields.io/badge/render-passing-brightgreen?style=plastic&logo=Render&logoColor=white&link=https%3A%2F%2Fordereats.onrender.com%2Fswagger)
![Docker Badge](https://img.shields.io/badge/docker-blue?style=plastic&logo=docker&logoColor=white&link=https%3A%2F%2Fhub.docker.com%2Fr%2Faeswibon%2Fordereats%2Ftags)

## Description

Order Eats is a web application that allows users to order food from a restaurant. The application is built using Next.js and Django. The application will enable users to view the menu of a restaurant, add items to their cart, and place an order.

## Features

- Users can view the menu of a restaurant
- Users can add items to their cart
- Users can place an order

## Technologies

- React
- Django
- Docker

## Installation

1. Clone the repository
2. Install the dependencies by running `pnpm install` in the `app` directory and `pipenv install`
3. Run the Django migrations by running `pipenv run python manage.py migrate`
4. Seed the data by running `pipenv run python manage.py load_data`
5. Start the Django server by running `pipenv run python manage.py runserver`
6. Start the React server by running `pnpm dev` in the `app` directory

## Deployment

The application is deployed on Vercel and Render. The Vercel deployment is available [here](https://ordereats.vercel.app) and the Render deployment is available [here](https://ordereats.onrender.com/swagger). The Docker image is available on Docker Hub [here](https://hub.docker.com/r/aeswibon/ordereats/tags).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Sample Users

- Username: `jane` Password: `order@123`
