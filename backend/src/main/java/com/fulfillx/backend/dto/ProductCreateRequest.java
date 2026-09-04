package com.fulfillx.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductCreateRequest(

        @NotBlank(message = "Product name is required") @Size(max = 255, message = "Product name must not exceed 255 characters") String name,

        @Size(max = 5000, message = "Description must not exceed 5000 characters") String description,

        @NotBlank(message = "SKU is required") @Size(max = 100, message = "SKU must not exceed 100 characters") String sku,

        @NotNull(message = "Price is required") @DecimalMin(value = "0.00", message = "Price cannot be negative") BigDecimal price,

        @NotBlank(message = "Category is required") @Size(max = 100, message = "Category must not exceed 100 characters") String category,

        @NotNull(message = "Stock quantity is required") @Min(value = 0, message = "Stock quantity cannot be negative") Integer stockQuantity) {
}