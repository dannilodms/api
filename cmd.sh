docker compose -f ./infra/compose.yml up -d --build
docker compose -f ./infra/compose.yml stop
docker compose -f ./infra/compose.yml down
