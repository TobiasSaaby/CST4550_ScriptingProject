FROM golang:latest

WORKDIR /app

COPY . .
RUN rm test.db

RUN go build

EXPOSE 8080

RUN echo $CTF1_SCORE

CMD ["./main" ]