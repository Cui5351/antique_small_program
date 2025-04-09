package com.czy.antique_admin.services;

import com.czy.antique_admin.dao.BillsStatistics;
import com.czy.antique_admin.dao.Statistics;
import com.czy.antique_admin.dao.StoreYearData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.czy.antique_admin.mappers.financeMapper;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class financeServiceImp implements financeMapper {
    @Autowired
    private financeMapper financeMapper;

    @Override
    public BillsStatistics GetBillsStatistics() {
        BillsStatistics result = new BillsStatistics();
        result.setToday(GetTodayStatistics());
        log.info("{}",GetTodayStatistics());
        result.setMonth(GetMonthStatics());
        result.setYear(GetYearStatics());
        result.setTotal(GetTotalStatics());
        return result;
    }

    @Override
    public Statistics GetTodayStatistics() {
        return financeMapper.GetTodayStatistics();
    }

    @Override
    public Statistics GetMonthStatics() {
        return financeMapper.GetMonthStatics();
    }

    @Override
    public Statistics GetYearStatics() {
        return financeMapper.GetYearStatics();
    }

    @Override
    public Statistics GetTotalStatics() {
        return financeMapper.GetTotalStatics();
    }

    @Override
    public List<StoreYearData> GetTotalStoreStatics(String start,String end) {
        return financeMapper.GetTotalStoreStatics(start,end);
    }

    @Override
    public List<StoreYearData> GetYearStoreStatics(String start, String end) {
        return financeMapper.GetYearStoreStatics(start,end);
    }

    @Override
    public List<StoreYearData> GetYearStoreStaticsByYear(String year) {
        return financeMapper.GetYearStoreStaticsByYear(year);
    }
}
