package com.czy.antique_admin.mappers;

import com.czy.antique_admin.dao.BillsStatistics;
import com.czy.antique_admin.dao.Statistics;
import com.czy.antique_admin.dao.StoreYearData;

import java.util.List;

public interface financeMapper {
    BillsStatistics GetBillsStatistics();
    Statistics GetTodayStatistics();
    Statistics GetMonthStatics();
    Statistics GetYearStatics();
    Statistics GetTotalStatics();
    List<StoreYearData> GetTotalStoreStatics(String start,String end);
    List<StoreYearData> GetYearStoreStatics(String start,String end);
    List<StoreYearData> GetYearStoreStaticsByYear(String year);
}
