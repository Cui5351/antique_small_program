import { GetStoreNames } from "@/util/api"

export default {
    mounted() {
        
    },
    getStoreNames() {
        GetStoreNames().then(res => {
            this.storeNames = res.data
        })
    }
}