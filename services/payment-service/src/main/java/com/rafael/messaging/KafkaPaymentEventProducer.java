package com.rafael.messaging;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class KafkaPaymentEventProducer implements PaymentEventProducer{

    private final String PAYMENTSV1 = "payments.v1";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public void publishAuthorized(PaymentAuthorizedV1 paymentEvent) {
        kafkaTemplate.send(PAYMENTSV1, paymentEvent.orderId().toString(), paymentEvent);
    }

    @Override
    public void publishFailed(PaymentFailedV1 paymentEvent) {
        kafkaTemplate.send(PAYMENTSV1, paymentEvent.orderId().toString(), paymentEvent);
    }
}
