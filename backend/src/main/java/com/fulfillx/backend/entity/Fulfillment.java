package com.fulfillx.backend.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "fulfillments")
public class Fulfillment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private FulfillmentStatus status;

    @Column(name = "warehouse_location")
    private String warehouseLocation;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Column(name = "origin_hub")
    private String originHub;

    @Column(name = "destination_hub")
    private String destinationHub;

    @Column(name = "current_stage")
    private String currentStage;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    protected Fulfillment() {
    }

    public Fulfillment(Order order) {
        this.order = order;
        this.status = FulfillmentStatus.PENDING;
        this.currentStage = "COLLECTED_FROM_ARTISAN";
        this.trackingNumber = "KALA-" + System.currentTimeMillis();
        this.originHub = "Regional Rural Cluster Center";
        this.destinationHub = "Central Sorting Facility";
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public FulfillmentStatus getStatus() {
        return status;
    }

    public String getWarehouseLocation() {
        return warehouseLocation;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public String getOriginHub() {
        return originHub;
    }

    public String getDestinationHub() {
        return destinationHub;
    }

    public String getCurrentStage() {
        return currentStage;
    }

    public void setStatus(FulfillmentStatus status) {
        this.status = status;
    }

    public void setCurrentStage(String currentStage) {
        this.currentStage = currentStage;
    }
}