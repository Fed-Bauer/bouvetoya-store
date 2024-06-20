package com.bouvetoya.jwtbackend.dao;

import com.bouvetoya.jwtbackend.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
