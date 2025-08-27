package com.rafael.service;

import com.rafael.utils.enums.PaymentMethod;

import java.util.UUID;

public interface PaymentGateway {
    GatewayResult authorize(UUID orderId, Double amount, PaymentMethod method);

    record GatewayResult(boolean approved, UUID transactionId, String reason) {
        public static GatewayResult approved(UUID txn) {
            return new GatewayResult(true, txn, null);
        }
        public static GatewayResult declined(String reason) {
            return new GatewayResult(false, null, reason);
        }
    }
}

