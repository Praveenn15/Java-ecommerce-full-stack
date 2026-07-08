package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired // Automatic connection 
    private UserRepository userRepository;

    @Value("${BREVO_API_KEY}")
    private String brevoApiKey;
    

    // A small box to remainder otp..
    private Map<String, String> otpMap = new HashMap<>();

    //Only for otp sending 
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> req){
        String email = req.get("email");
        if (!userRepository.findByEmail(email).isPresent()) return ResponseEntity.badRequest().body("Email not found!");

        String otp = String.valueOf((int)(Math.random() * 900000) + 100000);                                        
        otpMap.put(email,otp);

      
      sendOtpEmail(email, otp);

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
    
    };

    private void sendOtpEmail(String toEmail, String otp){
        String url = "https://api.brevo.com/v3/smtp/email";
        org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

        headers.set("api-key", brevoApiKey);

        Map<String, Object> bodyMap = new HashMap<>();
        bodyMap.put("sender", java.util.Map.of("name", "E-Commerce App", "email", "praveentkj@gmail.com"));
        bodyMap.put("to", java.util.List.of(java.util.Map.of("email", toEmail)));
        bodyMap.put("subject","Password Reset OTP");
        bodyMap.put("htmlContent", "<html><body><h2>Hello!</h2><p>Your OTP for password reset is : <b>" + otp + "</b></p><body></html>");


        //---------------For debug-----------------
        system.out.println("----Debugging Data Dump----");
        system.out.printlm("Reciept Email: " + toEmail);
        system.out.println("OTP value: " + otp);
        system.out.println("Payload being sent :" + bodyMap.toString());
        system.out.println("---------")
        // ----------------------------------
        
        org.springframework.http.HttpEntity<Map<String, Object>> entity  = new org.springframework.http.HttpEntity<>(bodyMap, headers);
        
        try {
            restTemplate.postForEntity(url, entity,String.class);
            System.out.println( "OTP Email sent successfully via Brevo API!");
        } catch (Exception e) {
            System.out.println(" Error sending email via brevo: " + e.getMessage());
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }
    }
}

