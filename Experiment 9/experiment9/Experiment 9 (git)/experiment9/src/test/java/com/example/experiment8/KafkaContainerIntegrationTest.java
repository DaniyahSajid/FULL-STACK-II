package com.example.experiment8;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.testcontainers.kafka.KafkaContainer;
import org.testcontainers.utility.DockerImageName;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Testcontainers
@Tag("docker")
class KafkaContainerIntegrationTest {

    @Container
    static final KafkaContainer kafka = new KafkaContainer(
            DockerImageName.parse("apache/kafka:3.9.1"));

    @Test
    void kafkaBrokerStartsAndExposesBootstrapAddress() {
        String bootstrapServers = kafka.getBootstrapServers();

        assertNotNull(bootstrapServers);
        assertTrue(bootstrapServers.contains(":"));
    }
}