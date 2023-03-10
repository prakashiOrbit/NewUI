import React, { useState } from "react";
import Layout from "./Pages/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import FormView from "./Components/CreateForm";
import { useEffect } from "react";
import { getApi, postApi } from "./webservice";
//import Farmer from "./Components/Farmer/Farmer.jsx";
//import Po from "./Components/Po/po";
import FarmerList from "./Components/Farmer/FarmerList";
import Product from "./Components/Product/Product";
import Truck from "./Components/Truck/Truck";
import CollectionCenter from "./Components/CollectionCenter/CollectionCenter";
import Warehouse from "./Components/Warehouse/Warehouse";
import Customer from "./Components/Customer/Customer";
import Login from "./Components/login/Login";
import FarmerEdit from "./Components/Farmer/FarmerEdit";
import FarmerOnboard from "./Components/Farmer/FarmerOnboard";
import Protected from "./Components/Protected";
import CreateCollectionCenter from "./Components/CollectionCenter/CreateCollectionCenter";
import CreateProduct from "./Components/Product/CreateProduct";
import CreateWarehouse from "./Components/Warehouse/CreateWarehouse";
import CreateTruck from "./Components/Truck/CreateTruck";
import CreatePurchaseOrderTemplate from "./Components/Po/CreatePurchaseOrderTemplate";
import PurchaseOrderTemplateList from "./Components/Po/PurchaseOrderTemplateList";
import PurchaseOrderTemplateEdit from "./Components/Po/PurchaseOrderTemplateEdit";
import ProductEdit from "./Components/Product/ProductEdit";

const App = () => {
  const fields = "/Service/farmer.json";
  const list = "/Details/listFarmer.json";
  const lists = "/Details/listPo.json";
  const products = "/Service/MasterData/product.json";
  const trucks = "/Service/MasterData/truck.json";
  const warehouses = "/Service/MasterData/Warehouse.json";
  const centers = "/Service/MasterData/Collection_Center.json";
  const proList = "/Details/productlist.json";
  const truckList = "/Details/listTruck.json";
  const centerList = "/Details/listCenter.json";
  const warehouseList = "/Details/listWarehouse.json";
  const customerList = "/Details/listcustomer.json";
  const search = "/Service/farmerSearch.json";
  const searchs = "/Service/posearch.json";
  const proSearch = "/Service/prodsearch.json";
  const truckSearch = "/Service/truckSearch.json";
  const centerSearch = "/Service/centerSearch.json";
  const warehouseSearch = "/Service/warehouseSearch.json";
  const customerSearch = "/Service/customerSearch.json";
  const field = "/Service/po.json";
  const fieldss = "/Service/customer.json";

  const [isSignedIn, setIsSignedIn] = useState(false);
  //const list = "/Details/listOld.json"
  const navigate = useNavigate();
  useEffect(() => {
    // nav("/test/list")
  }, []);
  const signin = () => {
    setIsSignedIn(true);
  };
  const signout = () => {
    setIsSignedIn(false);
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Layout />
            </Protected>
          }
        >
          <Route
            path="/farmer"
            element={
              <Protected isSignedIn={isSignedIn}>
                <FarmerOnboard />
              </Protected>
            }
          />

<Route
            path="/farmer-edit"
            element={
              <Protected isSignedIn={isSignedIn}>
                <FarmerEdit />
              </Protected>
            }
          />

          <Route
            path="/farmerList"
            element={
              <Protected isSignedIn={isSignedIn}>
              {/* <FormView
                aev={"list"}
                fields={fields}
                list={list}
                search={search}
                getApi={getApi}
                postApi={postApi}
              /> */}
              <FarmerList/>
              </Protected>
            }
          />
          <Route
            path="/test/view"
            element={
              <FormView
                aev={"view"}
                fields={fields}
                list={list}
                search={search}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/edit"
            element={
              <FormView
                aev={"edit"}
                fields={fields}
                list={list}
                getApi={getApi}
                search={search}
                postApi={postApi}
              />
            }
          />

          <Route path="/po" element={<CreatePurchaseOrderTemplate />} />
          <Route
            path="/po-edit"
            element={
                <PurchaseOrderTemplateEdit />
              
            }
          />
          <Route
            path="/poList"
            element={
              // <FormView
              //   aev={"list"}
              //   fields={field}
              //   list={lists}
              //   search={searchs}
              //   getApi={getApi}
              //   postApi={postApi}
              // />
              <PurchaseOrderTemplateList />
            }
          />
         
          <Route
            path="/test/view"
            element={
              <FormView
                aev={"view"}
                fields={field}
                list={list}
                search={search}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/edit"
            element={
              <FormView
                aev={"edit"}
                fields={fields}
                list={list}
                getApi={getApi}
                search={search}
                postApi={postApi}
              />
            }
          />

          <Route path="/Product" element={<Product />} />
          <Route
            path="/productList"
            element={
              <FormView
                aev={"list"}
                fields={products}
                list={proList}
                search={proSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />

          <Route
            path="/CreateProduct"
            element={
              // <FormView
              //   aev={"add"}
              //   fields={products}
              //   list={list}
              //   getApi={getApi}
              //   search={search}
              //   postApi={postApi}
              // />
              <CreateProduct />
            }
          />
          <Route
            path="/test/view"
            element={
              <FormView
                aev={"view"}
                fields={products}
                list={list}
                search={search}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/edit"
            element={
              // <FormView
              //   aev={"edit"}
              //   fields={products}
              //   list={list}
              //   getApi={getApi}
              //   search={search}
              //   postApi={postApi}
              // />
              <ProductEdit />
            }
          />

          <Route path="/Truck" element={<Truck />} />
          <Route
            path="/truckList"
            element={
              <FormView
                aev={"list"}
                fields={trucks}
                list={truckList}
                search={truckSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/CreateTruck"
            element={
              // <FormView
              //   aev={"add"}
              //   fields={trucks}
              //   list={list}
              //   getApi={getApi}
              //   search={search}
              //   postApi={postApi}
              // />
              <CreateTruck />
            }
          />
          <Route
            path="/test/view"
            element={
              <FormView
                aev={"view"}
                fields={products}
                list={list}
                search={search}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/edit"
            element={
              <FormView
                aev={"edit"}
                fields={products}
                list={list}
                getApi={getApi}
                search={search}
                postApi={postApi}
              />
            }
          />

          <Route path="/CreateCollectionCenter" element={<CollectionCenter />} />
          <Route
            path="/centerList"
            element={
              <FormView
                aev={"list"}
                fields={centers}
                list={centerList}
                search={centerSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/CreateCenter"
            element={
              // <FormView
              //   aev={"add"}
              //   fields={centers}
              //   list={list}
              //   getApi={getApi}
              //   search={search}
              //   postApi={postApi}
              // />
              < CreateCollectionCenter />
            }
          />

          <Route path="/Warehouse" element={<Warehouse />} />
          <Route
            path="/warehouseList"
            element={
              <FormView
                aev={"list"}
                fields={warehouses}
                list={warehouseList}
                search={warehouseSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/CreateWarehouse"
            element={
              // <FormView
              //   aev={"add"}
              //   fields={warehouses}
              //   list={list}
              //   getApi={getApi}
              //   search={search}
              //   postApi={postApi}
              // />
              <CreateWarehouse />
            }
          />
          <Route path="/customer" element={<Customer />} />
          <Route
            path="/customerList"
            element={
              <FormView
                aev={"list"}
                fields={fieldss}
                list={customerList}
                search={customerSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/create"
            element={
              <FormView
                aev={"add"}
                fields={fieldss}
                list={customerList}
                search={customerSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/view"
            element={
              <FormView
                aev={"view"}
                fields={fieldss}
                list={customerList}
                search={customerSearch}
                getApi={getApi}
                postApi={postApi}
              />
            }
          />
          <Route
            path="/test/edit"
            element={
              <FormView
                aev={"edit"}
                fields={fieldss}
                list={customerList}
                getApi={getApi}
                search={customerSearch}
                postApi={postApi}
              />
            }
          />
        </Route>
        {/* <Route
          path="/test/view"
          element={
            <FormView
              aev={"view"}
              fields={fields}
              list={list}
              navigate={navigate}
              search={search}
              getApi={getApi}
              postApi={postApi}
            />
          }
        /> */}
        <Route
          path="/test/delete"
          element={
            <FormView
              aev={"delete"}
              fields={fields}
              list={list}
              navigate={navigate}
              search={search}
              getApi={getApi}
              postApi={postApi}
            />
          }
        />
        {/* <Route
          path="/test/edit"
          element={
            <FormView
              aev={"edit"}
              fields={fields}
              list={list}
              getApi={getApi}
              search={search}
              postApi={postApi}
            />
          }
        /> */}

        <Route
          path="/creates"
          element={
            <FormView
              aev={"add"}
              field={products}
              list={list}
              search={search}
              getApi={getApi}
              postApi={postApi}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
