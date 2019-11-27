/*
  Created by Mojtaba Shayegh (shayegh@gmail.com) on ${DATE}
*/

package com.example.supervision.model.supervision;

import com.example.supervision.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @Column(columnDefinition = "TEXT")
    private String srdComment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "srHeader_id", nullable = false)
    @JsonIgnore
    private SRHeader srHeader;


}
