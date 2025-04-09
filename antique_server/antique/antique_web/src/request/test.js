const axios = require("axios")
axios.delete("http://localhost:8666/admin/oilOff/DeleteTodayDataById",{params: { ids:[20] }}).then(e=>{
        console.log(e);
}).catch(e => {
    console.log(e,'err');
})