package com.springbootmicroservices.bookingservice.repository;

import com.springbootmicroservices.bookingservice.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByProductIdAndBookingDate(Long productId, String bookingDate);

    List<Booking> findByProductIdAndBookingDateAndTimeSlot(Long productId, String bookingDate, String timeSlot);

}

