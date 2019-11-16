package com.example.polls.model.supervision;

import com.example.polls.model.audit.UserDateAudit;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@Entity
@Table(name = "supervision_report_details")
public class SRDetail extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String srdSubject;

    private Integer srdSubjectCount;

    private Integer srdSubjectErrorCount;

    private String srdComment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "srHeader_id", nullable = false)
    private SRHeader srHeader;




}
