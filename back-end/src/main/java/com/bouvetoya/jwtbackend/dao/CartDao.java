package com.bouvetoya.jwtbackend.dao;

import java.util.List;

import com.bouvetoya.jwtbackend.entity.Cart;
import com.bouvetoya.jwtbackend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer> {
    public List<Cart> findByUser(User user);
}
