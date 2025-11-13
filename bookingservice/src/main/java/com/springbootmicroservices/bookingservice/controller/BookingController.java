package com.springbootmicroservices.bookingservice.controller;

import com.springbootmicroservices.bookingservice.model.Booking;
import com.springbootmicroservices.bookingservice.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/slots")
    public ResponseEntity<List<Map<String, Object>>> getSlots(@RequestParam String productId, @RequestParam String date) {
        List<Map<String, Object>> slots = bookingService.getSlots(productId, date);
        return ResponseEntity.ok(slots);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking created = bookingService.createBooking(booking);
            return ResponseEntity.ok(created.getId());
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(409).body(Map.of("error", ex.getMessage()));
        }
    }

}
