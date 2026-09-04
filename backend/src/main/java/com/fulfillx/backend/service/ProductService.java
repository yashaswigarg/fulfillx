package com.fulfillx.backend.service;

import com.fulfillx.backend.dto.ProductCreateRequest;
import com.fulfillx.backend.dto.ProductResponse;
import com.fulfillx.backend.entity.Product;
import com.fulfillx.backend.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<ProductResponse> getProducts(
            String category,
            Pageable pageable) {
        Page<Product> products;

        if (category != null && !category.isBlank()) {
            products = productRepository.findByCategoryAndActiveTrue(
                    category,
                    pageable);
        } else {
            products = productRepository.findByActiveTrue(pageable);
        }

        return products.map(this::toResponse);
    }

    public ProductResponse createProduct(ProductCreateRequest request) {

        if (productRepository.existsBySku(request.sku())) {
            throw new IllegalArgumentException(
                    "Product with SKU already exists: " + request.sku());
        }

        Product product = new Product(
                request.name(),
                request.description(),
                request.sku(),
                request.price(),
                request.category(),
                request.stockQuantity());

        Product savedProduct = productRepository.save(product);

        return toResponse(savedProduct);
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getSku(),
                product.getPrice(),
                product.getCategory(),
                product.getStockQuantity(),
                product.getActive(),
                product.getCreatedAt(),
                product.getUpdatedAt());
    }
}