package com.rafael.messaging;

import java.time.Instant;
import java.util.UUID;

public record PaymentFailedV1 (
        UUID eventId,
        UUID paymentId,
        UUID orderId,
        Double amount,
        String method,
        String reason,
        Instant occurredAt
) {}