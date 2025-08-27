package com.rafael.service;

import com.rafael.domain.model.Payment;
import com.rafael.domain.repository.PaymentRepository;
import com.rafael.messaging.KafkaPaymentEventProducer;
import com.rafael.messaging.PaymentAuthorizedV1;
import com.rafael.messaging.PaymentFailedV1;
import com.rafael.utils.enums.PaymentMethod;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final FakePaymentGateway gateway;
    private final KafkaPaymentEventProducer producer;

    @Transactional
    public void process(UUID orderId, Double amount, PaymentMethod method) {
        log.info("Iniciando processamento do pagamento. orderId={}, amount={}, method={}", orderId, amount, method);

        var payment = Payment.createPending(orderId, amount, method);
        log.debug("Pagamento pendente criado: {}", payment);
        paymentRepository.save(payment);
        log.info("Pagamento salvo como pendente no banco. paymentId={}", payment.getId());

        try {
            log.info("Autorizando pagamento com gateway externo. orderId={}, amount={}, method={}", orderId, amount, method);
            var result = gateway.authorize(orderId, amount, method);
            log.debug("Resposta do gateway: approved={}, transactionId={}", result.approved(), result.transactionId());

            if (result.approved()) {
                payment.markAuthorized();
                paymentRepository.save(payment);
                log.info("Pagamento autorizado e salvo. paymentId={}", payment.getId());
            }

            var evt = new PaymentAuthorizedV1(
                    UUID.randomUUID(),
                    payment.getId(),
                    payment.getOrderId(),
                    amount,
                    method.name(),
                    result.transactionId(),
                    Instant.now()
            );
            log.info("Publicando evento PaymentAuthorizedV1 para orderId={}, paymentId={}", payment.getOrderId(), payment.getId());
            producer.publishAuthorized(evt);

        } catch (RuntimeException ex) {
            log.error("Erro ao processar pagamento para orderId={}, motivo: {}", orderId, ex.getMessage(), ex);

            payment.markFailed();
            paymentRepository.save(payment);
            log.warn("Pagamento marcado como falhado. paymentId={}", payment.getId());

            var paymentFailedEvent = new PaymentFailedV1(
                    UUID.randomUUID(),
                    payment.getId(),
                    payment.getOrderId(),
                    amount,
                    method.name(),
                    ex.toString(),
                    Instant.now()
            );
            log.info("Publicando evento PaymentFailedV1 para orderId={}, paymentId={}", payment.getOrderId(), payment.getId());
            producer.publishFailed(paymentFailedEvent);
        }

        log.info("Processamento de pagamento concluído para orderId={}", orderId);
    }
}
