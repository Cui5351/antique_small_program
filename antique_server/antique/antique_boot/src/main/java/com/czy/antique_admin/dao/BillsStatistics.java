package com.czy.antique_admin.dao;

import lombok.Data;

@Data
public class BillsStatistics {
    private Statistics today;
    private Statistics month;
    private Statistics year;
    private Statistics total;
}
