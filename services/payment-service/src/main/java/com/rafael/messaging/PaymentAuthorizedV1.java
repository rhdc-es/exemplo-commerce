package com.rafael.messaging;

import java.time.Instant;
import java.util.UUID;

public record PaymentAuthorizedV1(
        UUID eventId,
        UUID paymentId,
        UUID orderId,
        Double amount,
        String method,
        UUID transactionId,
        Instant occurredAt
) {}