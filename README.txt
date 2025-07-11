docker-compose down
docker volume rm kafka-data kafka-demo_kafka-data

docker run --rm -v kafka-data:/var/lib/kafka/data -v "C:\Users\cb30z\OneDrive - Alberta Energy Regulator\Desktop\technology\kafka-demo\kafka.properties:/etc/kafka/kafka.properties" confluentinc/cp-kafka:7.5.0 kafka-storage format --cluster-id sbgNWajRTW6kw1kI9m_6gg --ignore-formatted --config /etc/kafka/kafka.properties
