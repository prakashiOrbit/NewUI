export const sideMenu = [
  {
    text: "Farmer Management",
    options: [
      {
        text: "Onboard Farmer",
        link: "/farmer",
      },
      {
        text: "View Farmer",
        link: "/farmerList",
      },
    ],
  },
  {
    text: "Purchase order",
    options: [
      {
        text: "Create PO Template",
        link: "/po",
      },
      {
        text: "View PO Template",
        link: "/poList",
      },
    ],
  },
  {
    text: "Master Data",
    options: [
      {
        text: "Product",
        link: "/productList",
      },
      {
        text: "Truck",
        link: "/truckList",
      },
      {
        text: "Collection Center",
        link: "/centerList",
      },
      {
        text: "Warehouse",
        link: "/warehouseList",
      },
    ],
  },
  {
    text: "Customer Order",
    options: [
      {
        text: "Create Order",
        link: "/customer",
      },
      {
        text: "View Order",
        link: "/customerList",
      },
    ],
  },
  {
    text: "Transport Order",
    options: [
      {
        text: "Create Order",
        link: "/customer",
      },
      {
        text: "View Order",
        link: "/customerList",
      },
    ],
  },
];
export const config = {
  host: "localhost",
  port: "9082",
  tenant: "apptest",
  editFarmer:"/FarmerFlow/EditFarmer",
  addfarmer:"/FarmerFlow/CreateFarmer",
  getfarmer:"/FarmerFlow/SearchFarmers",
  getcc:"/MasterDataFlow/SearchCollectionCenter",
  editCollectionCenter:"/MasterDataFlow/EditCollectionCenter",
  addCollectionCenter:"/MasterDataFlow/CreateCollectionCenter",
  getCollectionCenter:"/MasterDataFlow/SearchCollectionCenter",
  editProduct:"/MasterDataFlow/EditProduct",
  addProduct:"/MasterDataFlow/CreateProduct",
  getProduct:"/MasterDataFlow/SearchProduct",
  editWarehouse:"/MasterDataFlow/EditWarehouse",
  addWarehouse:"/MasterDataFlow/CreateWarehouse",
  getWarehouse:"/MasterDataFlow/SearchWarehouse",
  editTruck:"/MasterDataFlow/EditTruck",
  addTruck:"/MasterDataFlow/CreateTruck",
  getTruck:"/MasterDataFlow/SearchTruck",
  editPurchaseOrderTemplate:"/PurchaseOrderTemplateFlow/EditPurchaseOrderTemplate",
  addPurchaseOrderTemplate:"/PurchaseOrderTemplateFlow/CreatePurchaseOrderTemplate",
  getPurchaseOrderTemplate:"/PurchaseOrderTemplateFlow/SearchPurchaseOrderTemplate",
  getcc:"/PurchaseOrderTemplateFlow/GetPurchaseOrderTemplate",

};
