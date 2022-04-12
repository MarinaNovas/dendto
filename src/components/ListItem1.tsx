import { EEntityType } from '../enums';
import { VFC } from 'react';
import '../styles/list.css';

const ListItem: VFC<any> = ({item }) => {
  let children = null;
  console.log(item.type);

  if (item.type !== EEntityType.Product) {
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

  return (
    <li 
      className='list__item'
      key={item.id}>
      <div className={`item-type item-type-${item.type}`}>{item.name}</div>
      {children}
    </li>
  )
}
export default ListItem;