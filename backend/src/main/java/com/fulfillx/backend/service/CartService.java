package com.fulfillx.backend.service;

import com.fulfillx.backend.dto.*;
import com.fulfillx.backend.entity.Cart;
import com.fulfillx.backend.entity.CartItem;
import com.fulfillx.backend.entity.Product;
import com.fulfillx.backend.entity.User;
import com.fulfillx.backend.repository.CartItemRepository;
import com.fulfillx.backend.repository.CartRepository;
import com.fulfillx.backend.repository.ProductRepository;
import com.fulfillx.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CartResponse getCart(String email) {

        User user = getUser(email);

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(new Cart(user)));

        return toResponse(cart);
    }

    @Transactional
    public CartResponse addToCart(
            String email,
            AddToCartRequest request) {

        User user = getUser(email);

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(new Cart(user)));

        Product product = productRepository
                .findById(request.productId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Product not found"));

        if (!product.getActive()) {
            throw new IllegalArgumentException(
                    "Product is not available");
        }

        CartItem item = cartItemRepository
                .findByCartIdAndProductId(
                        cart.getId(),
                        product.getId())
                .orElse(null);

        if (item == null) {

            item = new CartItem(
                    cart,
                    product,
                    request.quantity());

        } else {

            item.increaseQuantity(
                    request.quantity());
        }

        cartItemRepository.save(item);

        return toResponse(cart);
    }

    @Transactional
    public CartResponse updateItem(
            String email,
            Long itemId,
            UpdateCartItemRequest request) {

        User user = getUser(email);

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Cart not found"));

        CartItem item = cartItemRepository
                .findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new IllegalArgumentException(
                    "Cart item does not belong to this user");
        }

        item.updateQuantity(request.quantity());

        cartItemRepository.save(item);

        return toResponse(cart);
    }

    @Transactional
    public void removeItem(
            String email,
            Long itemId) {

        User user = getUser(email);

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Cart not found"));

        CartItem item = cartItemRepository
                .findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new IllegalArgumentException(
                    "Cart item does not belong to this user");
        }

        cartItemRepository.delete(item);
    }

    private User getUser(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));
    }

    private CartResponse toResponse(Cart cart) {

        List<CartItemResponse> items = cartItemRepository
                .findByCartId(cart.getId())
                .stream()
                .filter(item -> item.getCart()
                        .getId()
                        .equals(cart.getId()))
                .map(item -> {

                    Product product = item.getProduct();

                    BigDecimal subtotal = product.getPrice()
                            .multiply(
                                    BigDecimal.valueOf(
                                            item.getQuantity()));

                    return new CartItemResponse(
                            item.getId(),
                            product.getId(),
                            product.getName(),
                            product.getSku(),
                            product.getPrice(),
                            item.getQuantity(),
                            subtotal);
                })
                .toList();

        BigDecimal total = items.stream()
                .map(CartItemResponse::subtotal)
                .reduce(
                        BigDecimal.ZERO,
                        BigDecimal::add);

        return new CartResponse(
                cart.getId(),
                items,
                total);
    }
}