package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.ProductCreateRequest;
import com.fulfillx.backend.dto.ProductResponse;
import com.fulfillx.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Products", description = "Product catalog management")
public class ProductController {

    private final ProductService productService;
    private final com.fulfillx.backend.service.ImageStorageService imageStorageService;

    public ProductController(
            ProductService productService,
            com.fulfillx.backend.service.ImageStorageService imageStorageService) {
        this.productService = productService;
        this.imageStorageService = imageStorageService;
    }

    @Operation(summary = "List products", description = "Returns paginated active products.")
    @GetMapping
    public Page<ProductResponse> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        if (page < 0) {
            throw new IllegalArgumentException("Page cannot be negative");
        }

        if (size < 1 || size > 100) {
            throw new IllegalArgumentException(
                    "Page size must be between 1 and 100");
        }

        Pageable pageable = PageRequest.of(page, size);

        return productService.getProducts(category, pageable);
    }

    @Operation(summary = "Create product", description = "Creates a product. Requires ADMIN role.")
    @PostMapping
    public ProductResponse createProduct(
            @Valid @RequestBody ProductCreateRequest request) {
        return productService.createProduct(request);
    }

    @Operation(summary = "Generate S3 image upload metadata", description = "Generates AWS S3 partition key and URL for artisan craft photos")
    @PostMapping("/upload-url")
    @PreAuthorize("hasRole('ADMIN')")
    public com.fulfillx.backend.service.ImageStorageService.ImageUploadResponse generateUploadUrl(
            @RequestParam String fileName,
            @RequestParam(required = false) String category) {
        return imageStorageService.generateUploadMetadata(fileName, category);
    }

    @PutMapping("/{id}/stock")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update product stock", description = "Updates inventory quantity for a product")
    public ProductResponse updateStock(
            @PathVariable Long id,
            @RequestParam Integer quantity) {
        return productService.updateStock(id, quantity);
    }

}