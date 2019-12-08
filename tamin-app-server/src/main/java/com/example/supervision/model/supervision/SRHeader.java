package com.example.supervision.model.supervision;

import com.example.supervision.model.audit.UserDateAudit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "supervision_report")
public class SRHeader extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 10)
    private String surveyDate;

    @NotBlank
    private String brchName;

    @NotBlank
    private String unitName;

    @NotNull
    private Long missionNo;

    @NotBlank
    private String supervisorName;

    @Size(max = 10)
    private String preSurveyDate;

    @NotBlank
    private String surveySubject;

    @Column(columnDefinition = "TEXT")
    private String surveyMatters;

    @Column(columnDefinition = "TEXT")
    private String recommendationUnitManager;

    @Column(columnDefinition = "TEXT")
    private String recommendationBrchManager;

    @Size(max = 10)
    private String status;

    @OneToMany(
            mappedBy = "srHeader",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
//    @Size(min = 2, max = 6)
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    @JsonIgnore
    private List<SRDetail> srDetails = new ArrayList<>();

    public void addDetail(SRDetail detail) {
        srDetails.add(detail);
        detail.setSrHeader(this);
    }

    public void removeDetail(SRDetail detail) {
        srDetails.remove(detail);
        detail.setSrHeader(null);
    }

}
