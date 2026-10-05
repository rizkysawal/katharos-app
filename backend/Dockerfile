# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Install git and certificates
RUN apk add --no-cache git ca-certificates tzdata

# Download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build statically compiled binary
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o katharos-api ./cmd/api

# Final production stage
FROM alpine:3.19

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/katharos-api .

EXPOSE 8080

CMD ["./katharos-api"]
