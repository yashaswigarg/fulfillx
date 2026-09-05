package com.fulfillx.backend.entity;

public enum OutboxEventStatus {
    PENDING,
    PUBLISHED,
    FAILED
}