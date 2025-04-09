<template>
  <div class="page">
    <div class="data">
      <labelTitle title="今日订单" :money="titleData.today.totalMoney.toFixed(2)" :num="titleData.today.totalComplete" :cancel="titleData.today.totalCancel"></labelTitle>
      <labelTitle title="当月订单"  :money="titleData.month.totalMoney.toFixed(2)" :num="titleData.month.totalComplete" :cancel="titleData.month.totalCancel"></labelTitle>
      <labelTitle title="今年订单"  :money="titleData.year.totalMoney.toFixed(2)" :num="titleData.year.totalComplete" :cancel="titleData.year.totalCancel"></labelTitle>
      <labelTitle title="总计订单"  :money="titleData.total.totalMoney.toFixed(2)" :num="titleData.total.totalComplete" :cancel="titleData.total.totalCancel"></labelTitle>
    </div>
    <!-- <div></div>
      <div>2</div>
      <div>3</div>
      <div style="margin-bottom: 100px;">4</div> -->
      <div class="container">
      <div class="title">
        <div>订单统计</div>
        <div class="title">
          <el-date-picker
        v-model="value2"
        @change="changeDate"
          value-format="YYYY-MM-DD"
        type="daterange"
        range-separator="To"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      </div>
      </div>
      <div class="charts">
        <div id="main3" style="width: 800px;height: 450px;">
        </div>
        <div>
          <el-table :data="salesTotal" border style="width: 100%">
            <el-table-column prop="storeName" label="店铺名" width="180" show-overflow-tooltip />
            <el-table-column prop="totalIncome" label="总收入" width="150" show-overflow-tooltip>
              <template #default="scope">
                <!-- <el-tag type="success"> -->
                  {{ scope.row.totalIncome.toFixed(2) }} 
                  元
                <!-- </el-tag> -->
              </template>
            </el-table-column>
            <el-table-column prop="totalSales" width="120" label="总计售量">
              <template #default="scope">
                {{ scope.row.totalSales }} 件
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
      <div class="container">
      <div class="title">
        <div>近年订单统计</div>
        <div>
          <el-date-picker
        v-model="value1"
        @change="changeYear"
        type="yearrange"
        value-format="YYYY"
        range-separator="To"
        start-placeholder="开始年份"
        end-placeholder="结束年份"
      />
        </div>
      </div>
      <div class="charts">
        <div id="main2" style="width: 700px;height: 450px;">
        </div>
        <div>
          <el-table :data="yearData" border style="width: 100%">
            <el-table-column prop="years" label="日期" width="80" show-overflow-tooltip />
            <el-table-column prop="totalIncome" label="总收入" width="140" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.totalIncome.toFixed(2) }} 元
              </template>
            </el-table-column>
            <el-table-column prop="totalSales" width="120" label="总计销量" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.totalSales }} 件
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="container" style="margin-bottom: 50px;">
      <div class="title">
        <div>年度订单统计</div>
        <div>
        <el-date-picker
          v-model="value5"
          @change="changeMonth"
          type="year"
          value-format="YYYY"
          placeholder="选择年份"
        />
        </div>
      </div>
      <div class="charts">
        <div id="main" style="width: 800px;height: 450px;">
        </div>
        <div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="years" label="日期" width="80" />
            <el-table-column prop="totalIncome" label="总收入" width="140" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.totalIncome.toFixed(2) }} 元
              </template>
            </el-table-column>
            <el-table-column prop="totalSales" width="120" label="总计销量" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.totalSales }} 件
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 
        <div class="container" style="margin-bottom: 50px;">
      <div class="title">
        <div>月度订单统计</div>
        <div>
        <el-date-picker
          v-model="value5"
          @change="changeMonth"
          type="month"
          value-format="YYYY-MM"
          placeholder="选择月份"
        />
        </div>
      </div>
      <div class="charts">
        <div id="main" style="width: 650px;height: 450px;">
        </div>
        <div style="flex-grow: 1;">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import labelTitle from "./components/label.vue"
import * as echarts from "echarts";
import { GetBillsStatistics, GetTotalStoreStatics, GetYearStoreStatics, GetYearStoreStaticsByYear } from "@/util/api";
export default {
  name: 'finance',
  components: {
    labelTitle
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('main'));
    this.myChart2 = echarts.init(document.getElementById('main2'));
    this.myChart3 = echarts.init(document.getElementById('main3'));
    this.loadDataYears()
    this.loadDataYears2()
    this.loadDataYears3()
  },
  setup() {
    const myChart = ref(null)
    const myChart2 = ref(null)
    const myChart3 = ref(null)
    const titleData = reactive({
      today:{
        totalCancel:0,
        totalComplete:0,
        totalMoney:0
      },
      month:{
        totalCancel:0,
        totalComplete:0,
        totalMoney:0
      },
      year:{
        totalCancel:0,
        totalComplete:0,
        totalMoney:0
      },
      total:{
        totalCancel:0,
        totalComplete:0,
        totalMoney:0
      }
    })
    const GetBillsStatisticsData = () => {
      GetBillsStatistics().then((res) => {
        console.log(res)
        Object.keys(titleData).forEach(item => {
          Object.keys(titleData[item]).forEach(key => {
            titleData[item][key] = res.data[item][key] 
          })
        })
      })
    }

    const loadDataYears = (year) => {
      GetYearStoreStaticsByYear({
        year:year
      }).then((res) => {
        const dates = res.data.map(item => item.years);
        const store1Sales = res.data.map(item => item.totalIncome);
        tableData.splice(0,tableData.length,...res.data)
      const option = {
        title: {
          left: 'center',
          textStyle: {
            color: '#333',
            fontSize: 24
          }
        },
        label:{
          show:true,
          position:'top',
          color:'#666', 
          formatter:'{c}元'
        },
        tooltip: {
          trigger: 'item',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
          formatter: '{b}<br/> 总收入 : {c}元'
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
              title: '保存为图片'
            }
          } 
        },
        legend: {
          top: '5%',
          textStyle: {
            color: '#666'
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          name: '销量',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: ['#eee']
            }
          }
        },
        series: [
          {
            smooth:true,
            type: 'line',
            data: store1Sales,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              color: '#5793f3'
            },
            itemStyle: {
              color: '#5793f3'
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option);
    }).catch((error) => {
      console.error("Error fetching data:", error); 
    })

    }
    const tableData = reactive([])
    const loadDataYears2 = (startYear,endYear) => {
      GetYearStoreStatics({
        start:startYear,
        end:endYear
      }).then(res => {
        yearData.splice(0,yearData.length,...res.data)
         // 假设的年份数据
    var years = res.data.map(item =>item.years);
    // 假设的每年金额数据
    var amounts = res.data.map(item => item.totalIncome);

    // 配置项
    var option = {
      title: {
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 24,
          fontWeight: 'bold'
        }
      },
      label:{
        show:true,
        position:'top',
        color:'#666',
        fontSize:15,
        formatter:'{c}元'
      },
      tooltip: {
        trigger: 'item',
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
        formatter: function (params) {
          return `${params.name}年<br/>总收入：${params.value.toLocaleString()}元`; 
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: '保存为图片'
          }  
        } 
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666',
          fontSize: 14
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '金额（元）',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666',
          fontSize: 14,
          formatter: function (value) {
            return value.toLocaleString();
          }
        },
        splitLine: {
          lineStyle: {
            color: ['#eee']
          }
        }
      },
      series: [
        {
          name: '金额',
          type: 'bar',
          data: amounts,
          barWidth: '40%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#1890ff' },
                { offset: 1, color: '#40a9ff' }
              ]
            ),
            borderRadius: [5, 5, 0, 0],
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 5
          }
        }
      ]
    };
        myChart2.value.setOption(option);
      }).catch(err => {})
    }
    const loadDataYears3 = (start,end) => {
      // 假设的店铺名称数据
      GetTotalStoreStatics({
        start:start,
        end:end
      }).then(res => {
        salesTotal.splice(0,salesTotal.length,...res.data)
          // 假设的店铺名称数据
    var shopNames = res.data.map(item => item.storeName);
    // 假设的总计交易金额数据
    var totalAmounts = res.data.map(item => item.totalIncome);

    // 颜色数组，为每个店铺设置不同的颜色
    var colors = ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0'];

    // 配置项
    var option = {
      // 图表标题
      title: {
        left: 'center',
        textStyle: {
          color: '#333'
        }
      },
      // 提示框
      tooltip: {
        trigger: 'item',
        formatter: "{a}({d}%) <br/>{b} : {c}元"
      },
      // 图例
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: shopNames,
      //   textStyle: {
      //     color: '#666'
      //   }
      // },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: '保存为图片'
          }  
        } 
      },
      // 系列
      series: [
        {
          name: '交易金额',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: "{b}: {c}元 ({d}%)",
            position: 'outside',
            textStyle: {
              color: '#333'
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: shopNames.map((name, index) => ({
            value: totalAmounts[index],
            name: name,
            itemStyle: {
              color: colors[index]
            }
          }))
        }
      ]
    };
      myChart3.value.setOption(option); 
    }).catch(err => {})

    }
    const salesTotal = reactive([])
    const yearData = reactive([])
    const value1 = ref([]);
    const value5 = ref(null);
    GetBillsStatisticsData()
    const changeYear = () => {
      loadDataYears2(value1.value[0],value1.value[1])
    }
    const changeMonth = () => {
      loadDataYears(value5.value)
    }
    const value2 = ref([]);
    const changeDate = () => {
      if(value2.value == null)
        loadDataYears3()
      else
      loadDataYears3(value2.value[0],value2.value[1])
    }
    return { loadDataYears, value5,changeDate, value2 , changeMonth, value1, changeYear, myChart, tableData, myChart2, loadDataYears2, myChart3, loadDataYears3, salesTotal, yearData, titleData }
  }
}
</script>

<style scoped lang="less">
@import "../../general/page.css";

.page {
  padding: 20px;
  overflow-y: auto;
  text-align: start;
  height: 100%;
  max-height: 100%;

  .container {
    margin:20px 0;
    padding: 10px 20px;
  }
  .charts{
    display: flex;
    align-items: center;
  }
  .data {
    display: flex;
    gap: 20px;
  }

  .title {
    display: flex;
    justify-content: space-between;
  }

  &>div {
    background: white;
  }

  // display: flex;
  // flex-wrap: wrap;
  // &>div{
  //   width:600px;
  //   height: 400px;
  //   border: 1px solid gray;
  // }
}
</style>