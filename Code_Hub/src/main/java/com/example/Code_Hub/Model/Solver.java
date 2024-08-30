package com.example.Code_Hub.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "solver")
public class Solver {

    @Id
    @Column(name="user_name")
    private String user_name;
    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email_address")
    private String email_address;

    @Column(name = "address")
    private String address;

    @Column(name = "institution")
    private String institution;

    @Column(name = "introduction")
    private String introduction;

    public Solver() {
    }

    public Solver(String user_name, String name, String password, String email_address, String address, String institution, String introduction) {
        this.user_name = user_name;
        this.name = name;
        this.password = password;
        this.email_address = email_address;
        this.address = address;
        this.institution = institution;
        this.introduction = introduction;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    @Override
    public String toString() {
        return "Solver{" +
                "user_name='" + user_name + '\'' +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", email_address='" + email_address + '\'' +
                ", address='" + address + '\'' +
                ", institution='" + institution + '\'' +
                ", introduction='" + introduction + '\'' +
                '}';
    }
}
