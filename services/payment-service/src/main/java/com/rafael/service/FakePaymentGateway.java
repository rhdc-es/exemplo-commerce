package com.rafael.service;

import com.rafael.utils.enums.PaymentMethod;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FakePaymentGateway implements PaymentGateway {
    public GatewayResult authorize(UUID orderId, Double amount, PaymentMethod method) {
        if (amount <= 500) {
            return GatewayResult.approved(UUID.randomUUID());
        }
        return GatewayResult.declined("VALOR_ACIMA_LIMITE");
    }
}
