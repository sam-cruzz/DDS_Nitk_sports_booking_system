package com.springbootmicroservices.bookingservice.service;

import com.springbootmicroservices.bookingservice.model.Booking;
import com.springbootmicroservices.bookingservice.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    // simple fixed slots
    private static final List<String> DEFAULT_SLOTS = Arrays.asList(
            "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
            "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00",
            "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"
    );

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Map<String, Object>> getSlots(String productId, String date) {
        Long prodId = null;
        try {
            prodId = Long.parseLong(productId);
        } catch (NumberFormatException e) {
            // return empty if invalid
        }
        
        List<Booking> bookings = bookingRepository.findByProductIdAndBookingDate(prodId, date);
        Set<String> bookedSlots = new HashSet<>();
        for (Booking b : bookings) { 
            if (b.getTimeSlot() != null) bookedSlots.add(b.getTimeSlot()); 
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (String slot : DEFAULT_SLOTS) {
            Map<String, Object> m = new HashMap<>();
            m.put("timeSlot", slot);
            m.put("available", !bookedSlots.contains(slot));
            result.add(m);
        }
        return result;
    }

    public Booking createBooking(Booking booking) {
        // basic check: ensure slot not already booked for product/date
        List<Booking> existing = bookingRepository.findByProductIdAndBookingDateAndTimeSlot(
            booking.getProductId(), booking.getBookingDate(), booking.getTimeSlot()
        );
        if (!existing.isEmpty()) {
            throw new IllegalStateException("Slot already booked");
        }
        return bookingRepository.save(booking);
    }

}

