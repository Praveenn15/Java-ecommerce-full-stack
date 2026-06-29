// package com.ecommerce.backend;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
// public class AuthController {

//     @Autowired // Automatic connection 
//     private UserRepository userRepository;

//     @PostMapping("/signup")
//     public ResponseEntity<?> registerUser(@RequestBody User user){
//         if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//             return ResponseEntity.status(400).body("Error: Email is already taken!");
//         }
//         // When registering new user that default role is  set to be ..."USER".... 
//         if (user.getRole() == null || user.getRole().isEmpty()) {
//             user.setRole("USER");
//         }
//         User savedUser = userRepository.save(user);
//         return ResponseEntity.ok(savedUser); 
//     }
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody User loginData) {
//         Optional<User> userOpt = userRepository.findByEmail(loginData.getEmail());

//         if (userOpt.isPresent()) {
//             User user = userOpt.get();
//             if (user.getPassword().equals(loginData.getPassword())) {
//                 return ResponseEntity.ok(user);
//             }
//         }
//         return ResponseEntity.status(401).body("Error: Invalid email ");
//     }
// }

