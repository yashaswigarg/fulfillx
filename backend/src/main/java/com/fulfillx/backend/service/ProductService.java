package com.fulfillx.backend.service;

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

    public Page<Product> getProducts(
            String category,
            Pageable pageable) {
        if (category != null && !category.isBlank()) {
            return productRepository.findByCategoryAndActiveTrue(
                    category,
                    pageable);
        }

        return productRepository.findByActiveTrue(pageable);
    }
}