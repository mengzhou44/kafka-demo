docker-compose down -v
docker volume rm kafka-demo_kafka-data

docker-compose up -d --build

docker logs kafka --tail 100


docker exec -it kafka sh -c "cat /etc/kafka/kafka.properties"


docker exec -it kafka bash

docker exec -it kafka kafka-topics --bootstrap-server localhost:9092 --list



kafka-topics --bootstrap-server localhost:9092 \
  --alter --topic order-created --partitions 3