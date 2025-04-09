<template>
  <div class="pages">
    <div id="main" class="left" style="width: 95%; height: 400px; border: 1px solid black; margin-bottom: 10px;"></div>
    <div id="main1" class="right" style="width: 95%; height: 400px; border: 1px solid black; margin-bottom: 10px;"></div>


      <div class="test" style="height: 100px;">已经到最底下了...</div>
  </div>
</template>

<script setup>
import request from "../../../request/request"
import { onMounted } from 'vue';
import * as echarts from 'echarts';

const initCharts = async() => {
  const main = document.getElementById('main');

  var myChart = echarts.init(main);
  // 创建一个Date对象表示当前日期和时间
  const today = new Date();

// 获取年、月、日
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始计数，所以要加1，并且使用padStart方法补零
const day = String(today.getDate()).padStart(2, '0');

// 拼接成指定格式的字符串
const formattedDate = `${year}-${month}-${day}`;
  await request.get(`/admin/report/getReportTodayData?toDay=${formattedDate}`)
  .then((response) => {
        console.log("下面是date输出");
        
        console.log(response.data);

        myChart.setOption(dataOption(response.data.alcoholReport, '今日出货详细可视化表'));
      })
  .catch((error) => {
        console.error('导出失败', error);
      });
};

const initCharts1 = async() => {
  const main1 = document.getElementById('main1');

  var myChart1 = echarts.init(main1);
  await request.get('/admin/report/getReportMonthData?month=11&year=2024')
  .then((response) => {
        console.log("今月进货详细可视化表-下面是date输出");
        
        console.log(response.data);

        myChart1.setOption(dataOption1(response.data.alcoholReport, '今月进货详细可视化表'));
      })
  .catch((error) => {
        console.error('导出失败', error);
      });
};

onMounted(() => {
  initCharts();
  initCharts1();
});

function dataOption(data, title) {
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.storeNameList.split(','),
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: '60%',
        data: data.storeNameDateList.split(',')
      },
      {
        name: '收款人',
        type: 'bar',
        data: data.recipient.split(',')
      },
      {
        name: '出货类型',
        type: 'bar',
        data: data.type.split(',')
      }
    ]
  };
  return option;
}


function dataOption1(data, title) {
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.storeNameDateList.split(','),
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: '60%',
        data: data.storeNameList.split(',')
      },
      {
        name: '收款人',
        type: 'bar',
        data: data.recipient.split(',')
      },
      {
        name: '进货类型',
        type: 'bar',
        data: data.type.split(',')
      }
    ]
  };
  return option;
}
</script>

<style scoped>
.pages{
  background: white;
  width:100%;
}
</style>