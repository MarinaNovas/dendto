import * as d3 from 'd3';
import {useEffect, useRef, VFC} from 'react';
import {IEntity} from '../types';
import { EEntityType } from '../enums';

//import { INodeInf } from '../types';
//import jsonData from '../static/db.json';

import { useSelector} from 'react-redux';
import {
  selectCluster 
} from '../reducers/clusterSlice';

interface IProps {
    //onSelectEntity: (entity: IEntity) => void;
    //onSelectEntity: (entity: INodeInf) => void;
    onSelectEntity: (entity: IEntity) => void;
}

const Dendrogram: VFC<IProps> = ({onSelectEntity}) => {
    const d3Container = useRef(null);
    //const data = jsonData as IEntity[];
    const data = useSelector(selectCluster);

    useEffect(() => {
        
        if (data && data.length > 0) {
            data.forEach((cluster:IEntity) => {
                const width = 460;
                const height = 460;

                // append the svg object to the body of the pag

                const svg = d3
                    .select(d3Container.current)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .append('g')
                    .attr('transform', 'translate(40,0)');

                const d3Cluster = d3.cluster().size([height, width - 100]); // 100 is the margin I will have on the right side
                const root = d3.hierarchy(cluster, d => d.childrens);
                d3Cluster(root);

                // Add the links between nodes:

                svg.selectAll('path')
                    .data(root.descendants().slice(1))
                    .join('path')
                    .attr(
                        'd',
                        d =>
                            'M' +
                            // @ts-ignore
                            d.y +
                            ',' +
                            // @ts-ignore
                            d.x +
                            'C' +
                            // @ts-ignore
                            (d.parent.y + 50) +
                            ',' +
                            // @ts-ignore
                            d.x +
                            ' ' +
                            // @ts-ignore
                            (d.parent.y + 150) +
                            ',' +
                            // @ts-ignore
                            d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
                            ' ' +
                            // @ts-ignore
                            d.parent.y +
                            ',' +
                            // @ts-ignore
                            d.parent.x
                    )
                    .style('fill', 'none')
                    .attr('stroke', '#ccc');

                // Add a circle for each node.
                svg.selectAll('g')
                    .data(root.descendants())
                    .join('g')
                    // @ts-ignore
                    .attr('transform', d => `translate(${d.y},${d.x})`)
                    .append('circle')
                    .on('click', (event, d) => {
                        event.target.style.fill = '#fff';
                        onSelectEntity(d.data);
                    })
                    .attr('r', 7)
                    .style('fill', '#69b3a2')
                    .attr('stroke', 'black')
                    .style('stroke-width', 2);

                svg.selectAll('g')
                    .append('text')
                    .style('font', '14px sans-serif')
                    .style('fill', '#fff')
                    // @ts-ignore
                    .text(d => d.data.name)
                    .attr('x', 30);
            });
        }
    }, [data]);

    return <div ref={d3Container} />;
};

export default Dendrogram;
