import {createSlice } from "@reduxjs/toolkit";
import { active } from "d3";

import jsonData from '../static/db.json';
import { IEntity,IChangeNode } from '../types';

const initialState = jsonData as IEntity[];


export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    deleteProduct: (state: IEntity[], action) => {
      console.log('delete product-1');
      return state.map((cluster: IEntity) => {
        if (cluster.id !== action.payload.cluster.id) return cluster;
        console.log('delete product-2');
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
        if (cluster.id !== action.payload.cluster.newId) return cluster;
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
    },
    addGroup:(state:IEntity[],action)=>{
      return state.map((cluster:IEntity)=>{
        console.log('test addGroup');
        if (cluster.id !== action.payload.cluster.newId) return cluster;
        console.log(cluster);
        return {
          ...cluster,
          childrens:[...cluster.childrens as IEntity[],action.payload.group]
        }
      })
    },
    updateCluster:(state:IEntity[],action)=>{
      return state.map((cluster:IEntity,index)=>action.payload[index]);
    }
  }
});

export const {deleteProduct,addProduct, deleteGroup, addGroup, updateCluster} = clusterSlice.actions;
export const selectCluster = (state: any) => state.cluster;

export const changeNodeRelation = (nodeData:IChangeNode)=>(dispatch:any, getState:any)=>{
  dispatch(deleteProduct(nodeData));
  let newState = selectCluster(getState());
  console.log('test changeNodeRelation');
  console.log(newState);
  if(newState){
    dispatch(addProduct(nodeData));
  }
}

export const changeGroupRelation = (nodeData:IChangeNode)=>(dispatch:any, getState:any)=>{
  dispatch(deleteGroup(nodeData));
  let newState = selectCluster(getState());
  if(newState){
    console.log('test changeGroupRelation');
    console.log(newState);
    dispatch(addGroup(nodeData));
  }
}

export default clusterSlice.reducer;