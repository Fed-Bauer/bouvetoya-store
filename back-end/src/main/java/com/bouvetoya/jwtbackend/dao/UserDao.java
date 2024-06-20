package com.bouvetoya.jwtbackend.dao;

import com.bouvetoya.jwtbackend.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User, String> {

}
