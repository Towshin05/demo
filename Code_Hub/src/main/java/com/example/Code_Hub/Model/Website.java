package com.example.Code_Hub.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "website")
public class Website {

    @Id
    @Column(name="web_id")
    private Long web_id  ;
    @Column(name = "web_name")
    private String web_name;

    @Column(name = "web_link")
    private String web_link;

    public Website() {
    }

    public Website(Long web_id, String web_name, String web_link) {
        this.web_id = web_id;
        this.web_name = web_name;
        this.web_link = web_link;
    }

    public Long getWeb_id() {
        return web_id;
    }

    public void setWeb_id(Long web_id) {
        this.web_id = web_id;
    }

    public String getWeb_name() {
        return web_name;
    }

    public void setWeb_name(String web_name) {
        this.web_name = web_name;
    }

    public String getWeb_link() {
        return web_link;
    }

    public void setWeb_link(String web_link) {
        this.web_link = web_link;
    }

    @Override
    public String toString() {
        return "Website{" +
                "web_id=" + web_id +
                ", web_name='" + web_name + '\'' +
                ", web_link='" + web_link + '\'' +
                '}';
    }
}
