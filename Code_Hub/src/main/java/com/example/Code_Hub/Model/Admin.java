package com.example.Code_Hub.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "admin")
public class Admin {
    @Id
    @Column(name = "admin_id")
    private long admin_id;
    @Column(name = "Password")
    private String Password;
    @Column(name = "admin_name")
    private String admin_name;
    @Column(name = "email_address")
    private String email_address;

    public Admin() {
    }

    public Admin(long admin_id, String password, String admin_name, String email_address) {
        this.admin_id = admin_id;
        Password = password;
        this.admin_name = admin_name;
        this.email_address = email_address;
    }

    public long getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(long admin_id) {
        this.admin_id = admin_id;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getAdmin_name() {
        return admin_name;
    }

    public void setAdmin_name(String admin_name) {
        this.admin_name = admin_name;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "admin_id=" + admin_id +
                ", Password='" + Password + '\'' +
                ", admin_name='" + admin_name + '\'' +
                ", email_address='" + email_address + '\'' +
                '}';
    }
}
