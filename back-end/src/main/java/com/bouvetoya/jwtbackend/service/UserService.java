package com.bouvetoya.jwtbackend.service;

import java.util.HashSet;
import java.util.Set;

import com.bouvetoya.jwtbackend.dao.RoleDao;
import com.bouvetoya.jwtbackend.dao.UserDao;
import com.bouvetoya.jwtbackend.entity.Role;
import com.bouvetoya.jwtbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly user");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserName("admin_1");
        adminUser.setUserPassword(getEncodedPassword("admin-bs-pass-1"));
        adminUser.setUserFirstName("admin_bouvetoya");
        adminUser.setUserLastName("admin_bouvetoya");
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserName("Bertolt");
        user.setUserPassword(getEncodedPassword("bertolt&27"));
        user.setUserFirstName("Bertolt");
        user.setUserLastName("Winterhalter");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);
    }

    public User registerNewUser(User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));
        return userDao.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
