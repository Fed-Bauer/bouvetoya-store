package com.bouvetoya.jwtbackend.dao;

import com.bouvetoya.jwtbackend.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer> {
    public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase (
            String keyOne, String keyTwo, Pageable pageable
    );

    public List<Product> findAll(Pageable pageable);
}
