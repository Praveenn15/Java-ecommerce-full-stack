package com.ecommerce.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EcommerceController{  
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

// Add new categories
    @PostMapping("/categories")
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
    //Read or see all categories
    @GetMapping("/categories")
    public List<Category> getALLCategories() {
        return categoryRepository.findAll();
    }
    //Add new products
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    @GetMapping("/products")
    public List<Product> getALLProducts(@RequestParam(required = false) String search){
        if (search != null && !search.isEmpty()){
            return productRepository.findByNameContainingIgnoreCase(search);
        }
        return productRepository.findAll();
    }
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }

    @GetMapping("/ping")
    public String ping() {
        return "Server is awake!";
    }
}