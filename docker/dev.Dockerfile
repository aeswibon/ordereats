FROM python:3.12-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ENV PATH /venv/bin:$PATH

RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential libjpeg-dev zlib1g-dev \
    libpq-dev gettext wget curl gnupg git \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

# use pipenv to manage virtualenv
RUN python -m venv /venv
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install --system --categories "packages dev-packages"

COPY . /app

HEALTHCHECK \
    --interval=10s \
    --timeout=5s \
    --start-period=10s \
    --retries=48 \
    CMD ["/app/scripts/healthcheck.sh"]

WORKDIR /app
