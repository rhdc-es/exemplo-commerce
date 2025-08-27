package com.rafael.api.response;

import com.rafael.utils.enums.OrderStatus;
import com.rafael.utils.enums.PaymentMethod;

import java.time.Instant;
import java.util.UUID;

public record OrderResponse(
        UUID orderId,
        UUID customerId,
        OrderStatus status,
        Double total,
        PaymentMethod paymentMethod,
        Instant createdAt
) {}