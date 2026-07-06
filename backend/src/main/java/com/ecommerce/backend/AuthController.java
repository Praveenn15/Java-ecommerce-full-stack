package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import org.springframework.mail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired // Automatic connection 
    private UserRepository userRepository;
    @Autowired 
    private JavaMailSender mailsender;

    // A small box to remainder otp..
    private Map<String, String> otpMap = new HashMap<>();

    //Only for otp sending 
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req){
        String email = req.get("email");
        if (!userRepository.findByEmail(email).isPresent()) return ResponseEntity.badRequest().body("Email not found!");

        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);                                        
        otpMap.put(email,otp);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Your OTP");
        msg.setText("OTP is: " + otp);
        mailsender.send(msg);

        return ResponseEntity.ok("OTP Sent!");
    };
    //only for changing password 

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String>req) {
        String email = req.get("email");

//checking OTP is perfect or not

        if (otpMap.containsKey(email) && otpMap.get(email).equals(req.get("otp"))) {
            User user = userRepository.findByEmail(email).get();
            user.setPassword(req.get("newPassword"));
            userRepository.save(user);
            otpMap.remove(email);
            return ResponseEntity.ok("Password Updated!.");
        }
        return ResponseEntity.badRequest().body("Wrong OTP!");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Error: Email is already taken!");
        }
        // When registering new user that default role is  set to be ..."USER".... 
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser); 
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginData.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(401).body("Error: Invalid email ");
    }
}

