package com.fulfillx.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.eventbridge.EventBridgeClient;
import software.amazon.awssdk.services.sqs.SqsClient;

@Configuration
public class AwsConfig {

    @Value("${aws.region}")
    private String region;

    @Bean
    public EventBridgeClient eventBridgeClient() {
        return EventBridgeClient.builder()
                .region(Region.of(region))
                .build();
    }

    @Bean
    public SqsClient sqsClient() {
        return SqsClient.builder()
                .region(Region.of(region))
                .build();
    }
}
