package com.springbootmicroservices.paymentservice.controller;

import com.springbootmicroservices.paymentservice.model.Payment;
import com.springbootmicroservices.paymentservice.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/pay")
    public ResponseEntity<?> pay(@RequestBody Map<String, Object> payload) {
        // expected payload: { bookingId: <number>, amount: <number> }
        Long bookingId = payload.get("bookingId") == null ? null : Long.valueOf(String.valueOf(payload.get("bookingId")));
        Integer amount = payload.get("amount") == null ? null : Integer.valueOf(String.valueOf(payload.get("amount")));

        if (bookingId == null || amount == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "bookingId and amount required"));
        }

        Payment p = new Payment();
        p.setBookingId(bookingId);
        p.setAmount(amount);
        p.setStatus("SUCCESS"); // for simplicity assume success

        Payment saved = paymentRepository.save(p);
        return ResponseEntity.ok(saved.getId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPayment(@PathVariable Long id) {
        return paymentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getByBooking(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
