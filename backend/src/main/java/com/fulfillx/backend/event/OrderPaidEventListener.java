package com.fulfillx.backend.event;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class OrderPaidEventListener {

    @EventListener
    public void handleOrderPaid(OrderPaidEvent event) {

        System.out.println(
                "OrderPaidEvent received: orderId="
                        + event.orderId());

        // Future consumers:
        //
        // 1. Inventory
        // 2. Fulfillment
        // 3. Notification
    }
}