package com.bouvetoya.jwtbackend.service;

import com.bouvetoya.jwtbackend.dao.RoleDao;
import com.bouvetoya.jwtbackend.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}

