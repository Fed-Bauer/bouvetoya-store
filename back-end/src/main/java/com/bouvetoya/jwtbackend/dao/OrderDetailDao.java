package com.bouvetoya.jwtbackend.dao;

import com.bouvetoya.jwtbackend.entity.OrderDetail;
import com.bouvetoya.jwtbackend.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {
    public List<OrderDetail> findByOrderStatus(String status);

    public List<OrderDetail> findByUser(User user);
}
