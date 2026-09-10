package com.fulfillx.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "products", indexes = {
        @Index(name = "idx_products_category", columnList = "category"),
        @Index(name = "idx_products_active", columnList = "active"),
        @Index(name = "idx_products_created_at", columnList = "created_at")
})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private String category;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    private Boolean active;

    @Column(name = "artisan_name")
    private String artisanName;

    @Column(name = "origin_town")
    private String originTown;

    @Column(name = "origin_state")
    private String originState;

    @Column(name = "craft_type")
    private String craftType;

    @Column(name = "image_url", length = 1000)
    private String imageUrl;

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }

    protected Product() {
    }

    public Product(
            String name,
            String description,
            String sku,
            BigDecimal price,
            String category,
            Integer stockQuantity) {
        this.name = name;
        this.description = description;
        this.sku = sku;
        this.price = price;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.active = true;
        this.createdAt = OffsetDateTime.now();
        this.updatedAt = OffsetDateTime.now();
    }

    public Product(
            String name,
            String description,
            String sku,
            BigDecimal price,
            String category,
            Integer stockQuantity,
            String artisanName,
            String originTown,
            String originState,
            String craftType,
            String imageUrl,
            BigDecimal rating) {
        this(name, description, sku, price, category, stockQuantity);
        this.artisanName = artisanName;
        this.originTown = originTown;
        this.originState = originState;
        this.craftType = craftType;
        this.imageUrl = imageUrl;
        this.rating = rating != null ? rating : new BigDecimal("4.80");
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getSku() {
        return sku;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public Boolean getActive() {
        return active;
    }

    public String getArtisanName() {
        return artisanName != null ? artisanName : "Rural Master Artisan";
    }

    public String getOriginTown() {
        return originTown != null ? originTown : "Varanasi";
    }

    public String getOriginState() {
        return originState != null ? originState : "Uttar Pradesh";
    }

    public String getCraftType() {
        return craftType != null ? craftType : "Handicraft";
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BigDecimal getRating() {
        return rating != null ? rating : new BigDecimal("4.80");
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void setArtisanName(String artisanName) {
        this.artisanName = artisanName;
    }

    public void setOriginTown(String originTown) {
        this.originTown = originTown;
    }

    public void setOriginState(String originState) {
        this.originState = originState;
    }

    public void setCraftType(String craftType) {
        this.craftType = craftType;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }
}