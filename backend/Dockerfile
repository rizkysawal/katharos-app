# Build stage
FROM golang:alpine AS builder

WORKDIR /app

# Enable automatic toolchain resolution
ENV GOTOOLCHAIN=auto

# Install git and certificates
RUN apk add --no-cache git ca-certificates tzdata

# Download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build statically compiled binaries
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o katharos-api ./cmd/api
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o katharos-seeder ./cmd/seed_bible

# Final production stage
FROM alpine:3.19

WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata

COPY --from=builder /app/katharos-api .
COPY --from=builder /app/katharos-seeder .

EXPOSE 8080

CMD ["./katharos-api"]
