import { useState, useEffect } from 'react';

import { DataCenter, delay } from '../lib/DataCenter';
import Item from './Item';

const Center = () => {
    const [ items, setItems ] = useState([]);
    const [ timestamp, setTimestamp ] = useState({current:0,previous:0});
    const [ loading, setLoading ] = useState(false);
    
    
    
    const displayItems = (items) => {
        if(!items.length)return;
        return items.map((item,idx)=><Item key={`item_${idx}`} data={item}/>);
    }

    const setLoadingToCenter = ()=>{
        console.log('setLoadingToCenter');
        DataCenter.setView = async ({timestamps,newItems})=>{
            setLoading(true);
            await delay(1);            
            setTimestamp({current:timestamps.current,previous:timestamps.previous});
            setItems(newItems);
            await delay(1);
            setLoading(false);
        }
    }
    
    useEffect(()=>{        
        setLoadingToCenter();
    },[]);

    return (
    <div className='component'>
        <div className='name'>Center</div>
        <div className='time'>
            
            <div>
                <h3>Time Stamp</h3>
            </div>
            
            <div className='timeData'>
                <div>current</div>
                <div>{timestamp.current}</div>
            </div>
            <div className='timeData'>
                <div>previous</div>
                <div>{timestamp.previous}</div>
            </div>            
            
        </div>
        <div className='data'>
            <div>
                <h3>Data Items</h3>
            </div>
            <div className='itemContainer'>
                {displayItems(items)}
            </div>
        </div>
        {loading?<div className='loading'>Loading</div>:null}
        
    </div>);
}

export default Center;