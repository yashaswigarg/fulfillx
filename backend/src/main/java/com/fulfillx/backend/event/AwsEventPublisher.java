package com.fulfillx.backend.event;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.eventbridge.EventBridgeClient;
import software.amazon.awssdk.services.eventbridge.model.PutEventsRequest;
import software.amazon.awssdk.services.eventbridge.model.PutEventsRequestEntry;

@Service
public class AwsEventPublisher {

    private final EventBridgeClient eventBridgeClient;
    private final ObjectMapper objectMapper;

    @Value("${aws.eventbridge.bus-name}")
    private String eventBusName;

    public AwsEventPublisher(
            EventBridgeClient eventBridgeClient,
            ObjectMapper objectMapper
    ) {
        this.eventBridgeClient = eventBridgeClient;
        this.objectMapper = objectMapper;
    }

    public void publish(
            PublishedOrderPaidEvent event
    ) {
        try {
            String detail =
                    objectMapper.writeValueAsString(event);

            PutEventsRequestEntry entry =
                    PutEventsRequestEntry.builder()
                            .eventBusName(eventBusName)
                            .source("fulfillx.orders")
                            .detailType("OrderPaid")
                            .detail(detail)
                            .build();

            eventBridgeClient.putEvents(
                    PutEventsRequest.builder()
                            .entries(entry)
                            .build()
            );

        } catch (JsonProcessingException e) {
            throw new IllegalStateException(
                    "Failed to serialize AWS event",
                    e
            );
        }
    }
}
