import React from 'react';
import { EEntityType } from '../enums';
import { VFC } from 'react';
import '../styles/list.css';


const ListItem: VFC<any> = ({ innerRef, provided, item }) => {
  let children = null;
  console.log(item.type);
  if (item.type !== EEntityType.Product) {
    if (item.type == EEntityType.Cluster) {
      children = (
        <ul className={`list list-${item.type}`}>
          {
            item.childrens.map((i: any) => {
              console.log(i);
              return <ListItem item={i} key={i.id} />
            })
          }
        </ul>
      );
    }else{
      children = (
        <ul className={`list list-${item.type}`}>
          {
            item.childrens.map((i: any) => {
              console.log(i);
              return <ListItem item={i} key={i.id} />
            })
          }
        </ul>
      );
    }

  }
  return (
    <React.Fragment>
      {item.type== EEntityType.Cluster ?
            <li 
            className='list__item' 
            key={item.id}
            ref={innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
          >
            <div className={`item-type item-type-${item.type}`}>{item.name}</div>
            {children}
          </li>
          :
          <li 
            className='list__item' 
          >
            <div className={`item-type item-type-${item.type}`}>{item.name}</div>
            {children}
          </li>

      }
    </React.Fragment>
  )
}
export default ListItem;