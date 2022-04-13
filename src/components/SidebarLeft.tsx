import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteProduct,
  addProduct,
  changeNodeRelation,
  selectCluster 
} from '../reducers/clusterSlice';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

//import jsonData from '../static/db.json';
import '../styles/sidebarLeft.css';
import { IEntity } from '../types';

import ListItem from './ListItem';


const SidebarLeft = () => {
  //const data = jsonData as IEntity[];

  const data = useSelector(selectCluster);
  const dispatch = useDispatch();

  const [treeData, updateTreeData] = useState(data);

  //console.log(Array.from(treeData));

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const items = Array.from(treeData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateTreeData(items);
  } 
  
  return (
    <div id="sidebarLeft">
     <DragDropContext onDragEnd={handleOnDragEnd}>
       <Droppable droppableId="clusters">
          {(provided: any) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                { data.map((item: IEntity, index:number) => {
                    return(
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        { (provided:any)=>(
                           <ListItem innerRef={provided.innerRef} provided={provided} item={item}/>
                         )}
                      </Draggable>
                    )
                })}
                 {provided.placeholder}
              </ul>
          )}
        </Droppable> 
      </DragDropContext> 
      {/* <ul>
        { data.map((item: IEntity) => (
            <ListItem1 item={item} />
        ))}
      </ul> */}
     {/*  <button onClick={()=>dispatch(deleteProduct({cluster:{id:"2131231"},group:{id:"32335"},product:{id:"11113"}}))}>Delete product</button>
      <button onClick={()=>dispatch(addProduct({
          cluster:{id:"2131231"},
          group:{id:"32333"},
          product:{
                    "id": "11113",
                    "type": "product",
                    "name": "продукт2",
                    "isLinkedWithGroup": true,
                    "isLinkedWithCluster": true
                  }
          }))}>Add product</button>
      <button onClick={()=>dispatch(changeNodeRelation({
        cluster:{id:"2131231"},
        group:{id:"32335",newId:"32333"},
        product:{
          "id": "11113",
          "type": "product",
          "name": "продукт2",
          "isLinkedWithGroup": true,
          "isLinkedWithCluster": true
        }
      }))}>Изменить связь</button> */}
    </div>
  );
};



export default SidebarLeft;