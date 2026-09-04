package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.ProductCreateRequest;
import com.fulfillx.backend.dto.ProductResponse;
import com.fulfillx.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

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

    @PostMapping
    public ProductResponse createProduct(
            @Valid @RequestBody ProductCreateRequest request) {
        return productService.createProduct(request);
    }
}