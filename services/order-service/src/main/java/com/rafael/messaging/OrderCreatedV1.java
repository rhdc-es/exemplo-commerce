package com.rafael.messaging;

import com.rafael.utils.enums.PaymentMethod;

import java.time.Instant;
import java.util.UUID;

public class OrderCreatedV1 {
    public UUID eventId;
    public UUID orderId;
    public UUID customerId;
    public Double total;
    public Instant occuredAt;
    public PaymentMethod paymentMethod;

    public OrderCreatedV1(UUID orderId, UUID customerId, Double total, PaymentMethod paymentMethod) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.total = total;
        this.paymentMethod = paymentMethod;

        this.eventId = UUID.randomUUID();
        this.occuredAt = Instant.now();
    }
}
