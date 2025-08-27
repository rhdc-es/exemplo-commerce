package com.rafael.messaging;

public interface PaymentEventProducer {
    void publishAuthorized(PaymentAuthorizedV1 evt);
    void publishFailed(PaymentFailedV1 evt);
}
