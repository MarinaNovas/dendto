import { createSlice, current } from "@reduxjs/toolkit";

interface IHistory {
  currentIndex:number;
  stack:[];
}

const  initialState:IHistory ={
  currentIndex:-1,
  stack:[]
}
export const historySlice = createSlice({
  name:'history',
  initialState,
  reducers:{
    addHistoryItem:(state:any,action:any)=>{
      if(state.currentIndex===-1) {
        state.stack.push(action.payload);
        return;
      }
      console.log('test addHistoryItem')
      state.stack.length=state.currentIndex+1;
      state.stack[state.currentIndex]=action.payload;
      state.currentIndex=-1;
      console.log(state)
      return;
    },
    setCurrentIndex:(state:any,action:any)=>{
      state.currentIndex=action.payload;
    },
    removeHistoryItem:(state:any)=>{
      state.stack.pop();
    }
  }
});

export const {addHistoryItem, setCurrentIndex, removeHistoryItem}=historySlice.actions;

export const selectHistoryStack = (state:any)=>state.history.stack;

export default historySlice.reducer;