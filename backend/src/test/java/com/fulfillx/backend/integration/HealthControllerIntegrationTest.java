package com.fulfillx.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class HealthControllerIntegrationTest
        extends PostgresIntegrationTest {

    @LocalServerPort
    private int port;

    private final RestTemplate restTemplate = new RestTemplate();

    @Test
    void applicationShouldStartSuccessfully() {

        String response = restTemplate.getForObject(
                "http://localhost:" + port + "/actuator/health",
                String.class);

        assertThat(response)
                .isNotNull();
    }
}