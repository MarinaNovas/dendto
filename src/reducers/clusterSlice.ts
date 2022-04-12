import { /* createAsyncThunk, */ createSlice } from "@reduxjs/toolkit";

import jsonData from '../static/db.json';
import { IEntity } from '../types';

const initialState = jsonData as IEntity[];


export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    deleteProduct: (state: IEntity[], action) => {
      return state.map((cluster: IEntity) => {
        if (cluster.id !== action.payload.cluster.id) return cluster;
        return {
          ...cluster,
          childrens:cluster.childrens?.map((group:IEntity)=>{
            if(group.id !==action.payload.group.id) return group;
            console.log(group.id);
            return {
              ...group,
              childrens:group.childrens?.filter((product:IEntity)=>product.id!==action.payload.product.id)
            }
          })
        }
      })
    },
    addProduct:(state: IEntity[], action)=>{
      return state.map((cluster: IEntity) => {
        if (cluster.id !== action.payload.cluster.id) return cluster;
        return {
          ...cluster,
          childrens:cluster.childrens?.map((group:IEntity)=>{
            if(group.id !==action.payload.group.newId) return group;
            return {
              ...group,
              childrens:[...group.childrens as IEntity[],action.payload.product]
            }
          })
        }
      })
    },
    deleteGroup:(state:IEntity[],action)=>{
      return state.map((cluster: IEntity) => {
        if (cluster.id !== action.payload.cluster.id) return cluster;
        return {
          ...cluster,
          childrens:cluster.childrens?.filter((group:IEntity)=>group.id!==action.payload.group.id)
        }
      })
    }
  }
});

export const {deleteProduct,addProduct, deleteGroup} = clusterSlice.actions;
export const selectCluster = (state: any) => state.cluster;

export const changeNodeRelation = (nodeData:any)=>(dispatch:any,getState:any)=>{
  //const firstState = getState();
  console.log('test1');
  dispatch(deleteProduct(nodeData));
  const currentState = selectCluster(getState());

 if(currentState){
  console.log('test2');
  dispatch(addProduct(nodeData));
 }

}
export default clusterSlice.reducer;