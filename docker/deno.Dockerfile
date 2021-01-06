FROM hayd/alpine-deno:latest

WORKDIR /app

COPY src/ .
COPY templates/ templates
COPY .env .

CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read","app.ts"]
