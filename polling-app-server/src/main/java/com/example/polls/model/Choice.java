package com.example.polls.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;


/**
 * Created by rajeevkumarsingh on 20/11/17.
 */
@Data
@RequiredArgsConstructor
@Entity
@Table(name = "choices")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 40)
    private String text;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;
}