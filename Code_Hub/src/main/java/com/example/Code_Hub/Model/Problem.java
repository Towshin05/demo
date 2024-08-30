package com.example.Code_Hub.Model;

import jakarta.persistence.*;

import java.net.URL;

@Entity
@Table(name = "problem")
public class Problem {

    @Id
    @Column(name = "prob_id")
    private Long prob_id;

    @Column(name = "title")
    private String title;

    @Column(name = "link")
    private String link;

    @Column(name = "level")
    private Integer level;

    @Column(name = "tutorial_link")
    private String tutorial_link;

    @ManyToOne
    @JoinColumn(name = "web_id", referencedColumnName = "web_id")
    private Website website;



    public Problem() {
    }

    public Problem(Long prob_id, String title, String link, Integer level,
                   String tutorial_link, Website website) {
        this.prob_id = prob_id;
        this.title = title;
        this.link = link;
        this.level = level;
        this.tutorial_link = tutorial_link;
        this.website = website;
    }

    public Long getProb_id() {
        return prob_id;
    }

    public void setProb_id(Long prob_id) {
        this.prob_id = prob_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Website getWebsite() {
        return website;
    }

    public void setWebsite(Website website) {
        this.website = website;
    }

    public String getTutorial_link() {
        return tutorial_link;
    }

    public void setTutorial_link(String tutorial_link) {
        this.tutorial_link = tutorial_link;
    }

    @Override
    public String toString() {
        return "Problem{" +
                "prob_id=" + prob_id +
                ", title='" + title + '\'' +
                ", link=" + link +
                ", level=" + level +
                ", tutorial_link=" + tutorial_link +
                ", website=" + website +
                '}';
    }
}
