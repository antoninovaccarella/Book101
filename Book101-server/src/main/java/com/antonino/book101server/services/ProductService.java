package com.antonino.book101server.services;

import com.antonino.book101server.models.Product;
import com.antonino.book101server.models.ProductCategory;
import com.antonino.book101server.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // TESTING
    @Transactional(readOnly = true)
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Product> getProduct(Long id) {return productRepository.findById(id);}

    @Transactional(readOnly = false)
    public Optional<Product> addProduct(Product product) {
        Optional<Product> productOptional = getProduct(product.getId());
        if (productOptional.isEmpty()) {
            return Optional.of(productRepository.save(product));
        }
        return Optional.empty();
    }

    @Transactional(readOnly = false)
    public Optional<Product> updateProduct(Product product) {
        Optional<Product> productOptional = getProduct(product.getId());
        return productOptional.map(value -> productRepository.save(
                value
                        .setName(product.getName())
                        .setStock(product.getStock())
                        .setShortDetails(product.getShortDetails())
                        .setDescription(product.getDescription())
                        .setPicture(product.getPicture())
                        .setPrice(product.getPrice())));
    }

    @Transactional(readOnly = true)
    public List<Product> showAllProducts() {
        return productRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Product> showAllProducts(int pageNumber, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = productRepository.findAll(paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }


    @Transactional(readOnly = true)
    public List<Product> showAllProductsByCategory(ProductCategory category, int pageNumber, int pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        Page<Product> pagedResult = productRepository.findProductByCategory(category, paging);
        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<>();
        }
    }

    @Transactional(readOnly = true)
    public List<Product> showProductsByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }


}
