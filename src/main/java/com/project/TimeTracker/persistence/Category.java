package com.project.TimeTracker.persistence;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class Category {
    public Long id;
    public String name;
}
