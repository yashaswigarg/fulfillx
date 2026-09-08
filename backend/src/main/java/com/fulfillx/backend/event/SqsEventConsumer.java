package com.fulfillx.backend.event;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fulfillx.backend.service.FulfillmentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.DeleteMessageRequest;
import software.amazon.awssdk.services.sqs.model.Message;
import software.amazon.awssdk.services.sqs.model.ReceiveMessageRequest;

@Service
public class SqsEventConsumer {

    private final SqsClient sqsClient;
    private final ObjectMapper objectMapper;
    private final FulfillmentService fulfillmentService;

    private final String queueUrl;

    public SqsEventConsumer(
            SqsClient sqsClient,
            ObjectMapper objectMapper,
            FulfillmentService fulfillmentService,
            @Value("${aws.sqs.queue-url}")
            String queueUrl
    ) {
        this.sqsClient = sqsClient;
        this.objectMapper = objectMapper;
        this.fulfillmentService = fulfillmentService;
        this.queueUrl = queueUrl;
    }

    @Scheduled(fixedDelay = 5000)
    public void consume() {
        if (queueUrl == null || queueUrl.isBlank() || queueUrl.contains("123456789012")) {
            return;
        }

        try {
            var response =
                    sqsClient.receiveMessage(
                            ReceiveMessageRequest.builder()
                                    .queueUrl(queueUrl)
                                    .maxNumberOfMessages(10)
                                    .waitTimeSeconds(10)
                                    .visibilityTimeout(30)
                                    .build()
                    );

        for (Message message :
                response.messages()) {

            try {
                JsonNode root =
                        objectMapper.readTree(
                                message.body()
                        );

                JsonNode detail =
                        root.get("detail");

                PublishedOrderPaidEvent event =
                        objectMapper.treeToValue(
                                detail,
                                PublishedOrderPaidEvent.class
                        );

                fulfillmentService
                        .processOrderPaidEvent(event);

                sqsClient.deleteMessage(
                        DeleteMessageRequest.builder()
                                .queueUrl(queueUrl)
                                .receiptHandle(
                                        message.receiptHandle()
                                )
                                .build()
                );

            } catch (Exception e) {
                // Do not delete the message.
                // SQS will retry it and eventually
                // move it to the DLQ.
            }
        }
        } catch (Exception e) {
            // SQS poll failed
        }
    }
}
