import instance from "@/request/request";
// 加载门店信息

// /loadStoreInfo
const loadStoreInfo = (data) => instance.get("/StoreItem/list2",{params:{...data}})

// /loadStoreInfoById
const loadStoreInfoById = (data) => instance.get("/StoreItem/findById",{params:{...data}})

// GetStoreNames
const GetStoreNames = () => instance.get("/Store/getStoreNames")
// /AddStoreItem
const AddStoreItem = (data) => instance.post("/StoreItem/add",data)
// /EditStoreItem
const EditStoreItem = (data) => instance.post("/StoreItem/edit",data)
// delete
const DeleteStoreItem = (data) => instance.post("/StoreItem/delete",data)

const AddStore = (data) => instance.post("/Store/add",data)

// StoreItem/buyGoodsAll
const buyGoodsAll = (data) => instance.get("/StoreItem/GetBuyGoodsAll",{params:{...data}})

// editBuyGoodsState2
const editBuyGoodsState2 = (data) => instance.put("/StoreItem/editBuyGoodsState2",data)

// getAllStoreAccount
const getAllStoreAccount = (data) => instance.get("/Store/getAllStoreAccount",{params:{...data}})

// getStoreById
const getStoreById = (data) => instance.get("/Store/getStoreById",{params:{...data}})

// /editStoreById
const editStoreById = (data) => instance.put("/Store/editStoreById",data)

// /DelStore
const DelStore = (data) => instance.delete("/Store/DelStore",{params:{...data}})

// Antique/AddAntique
const AddAntique = (data) => instance.post("/Antique/AddAntique",data)

// /Antique/GetAntiqueAll
const GetAntiqueAll = (data) => instance.get("/Antique/GetAntiqueAll",{params:{...data}})

// /Antique/login
const AntiqueLogin = (data) => instance.post("/Antique/login",data)

// /Antique/GetAntiqueCollect
const GetAntiqueCollect = (data) => instance.get("/Antique/GetAntiqueCollect",{params:{...data}})

// Antique/AddAntiqueCollect
const AddAntiqueCollect = (data) => instance.post("/Antique/AddAntiqueCollect",data)

// Antique/FindAntiqueById
const FindAntiqueById = (data) => instance.get("/Antique/FindAntiqueById",{params:{...data}})

// Antique/GetCollectById
const GetCollectById = (data) => instance.get("/Antique/GetCollectById",{params:{...data}})

// Antique/EditCollectById
const EditCollectById = (data) => instance.put("/Antique/EditCollectById",data)

// Antique/DelAntiqueCollect
const DelAntiqueCollect = (data) => instance.put("/Antique/DelAntiqueCollect",data)


// Antique/EditAntiqueById
const EditAntiqueById = (data) => instance.put("/Antique/EditAntiqueById",data)

const GetStoreForAntique = (data) => instance.get("/Antique/GetStoreForAntique",{params:{...data}})

// DelAntiqueBindStore
const DelAntiqueBindStore = (data) => instance.put("/Antique/DelAntiqueBindStore",data)

// AddAntiqueBindStore
const AddAntiqueBindStore = (data) => instance.put("/Antique/AddAntiqueBindStore",data)

// GetMyBindStoreById
const GetMyBindStoreById = (data) => instance.get("/Antique/GetMyBindStoreById",{params:{...data}})

// DeleteGoodsPic
const DeleteGoodsPic = (data) => instance.delete("/StoreItem/DeleteGoodsPic",{params:{...data}})

const DelAntique = (data) => instance.delete("/Antique/DelAntique",{params:{...data}})

const DeleteStoreCarouselPic = (data) => instance.delete("/Store/DeleteStoreCarouselPic",{params:{...data}})

const GetAllCommunity = (data) => instance.get("/Community/GetAllCommunity",{params:{...data}})

const UpdateCommunityStatus = (data) => instance.post("/Community/UpdateCommunityStatus",data)
// DeleteCommunity
const DeleteCommunity = (data) => instance.delete("/Community/DeleteCommunity",{params:{...data}})

// GetYearStoreStatics
const GetYearStoreStatics = (data) => instance.get("/Finance/GetYearStoreStatics",{params:{...data}})
// GetBillsStatistics
const GetBillsStatistics = (data) => instance.get("/Finance/GetBillsStatistics",{params:{...data}})
// GetTotalStoreStatics
const GetTotalStoreStatics = (data) => instance.get("/Finance/GetTotalStoreStatics",{params:{...data}})
// GetYearStoreStaticsByYear
const GetYearStoreStaticsByYear = (data) => instance.get("/Finance/GetYearStoreStaticsByYear",{params:{...data}})
// /StoreItem/buyGoodsAllToExcel
const buyGoodsAllToExcel = (data) => instance.get("/StoreItem/buyGoodsAllToExcel",{params:{...data},responseType:"blob"})

// buyGoodsToExcelById
const buyGoodsToExcelById = (data) => instance.get("/StoreItem/buyGoodsToExcelById",{params:{...data},responseType:"blob"})

export {
    buyGoodsToExcelById,
    buyGoodsAllToExcel,
    GetYearStoreStatics,
    GetBillsStatistics,
    GetTotalStoreStatics,
    GetYearStoreStaticsByYear,

    GetAllCommunity,
    UpdateCommunityStatus,
    DeleteCommunity,

    DelAntique,
    DeleteGoodsPic,
    DeleteStoreCarouselPic,

    AddAntiqueBindStore,
    DelAntiqueBindStore,
    GetMyBindStoreById,

    GetStoreForAntique,
    EditAntiqueById,
    DelAntiqueCollect,
    EditCollectById,
    GetCollectById,
    FindAntiqueById,
    AddAntiqueCollect,
    GetAntiqueCollect,
    AntiqueLogin,
    AddAntique,
    GetAntiqueAll,

    DelStore,
    getStoreById,
    editStoreById,
    getAllStoreAccount,
    buyGoodsAll,
    editBuyGoodsState2,
    AddStore,
    loadStoreInfo,
    loadStoreInfoById,
    GetStoreNames,
    AddStoreItem,
    EditStoreItem,
    DeleteStoreItem
}