import { request } from "../request/request"
export default {
    mounted() {
        this.loadData(1)
    },
    methods: {
        loadData(page){
            // 默认拿20条数据
            request.get("/admin/oilOff/page",params={page,pageSize:20}).then(res => {
                console.log(res,'res');
                this.tableData.push(...res.records)
            })
        }
    },
}