import { useState, useEffect } from 'react';

import { DataCenter, CenterB } from '../lib/DataCenter';
import Item from './Item';

const B = () => {
    
    const [ items, setItems ] = useState([]);
    const [ timestamp, setTimestamp ] = useState({current:0,previous:0});
    const [ loading, setLoading ] = useState(false);
    const [ polling, setPolling ] = useState(false);

    const displayItems = (items) => {
        if(!items.length)return;
        return items.map((item,idx)=><Item key={`item_${idx}`} data={item}/>);
    }

    const addItem = async () => {
        if(loading) return;
        setLoading(true);
        let item = {state:'ready'};
        let setResult = await DataCenter.setData(item); // check needed the item saved well.
        let prevTime = CenterB.timestamp;
        let newTime = setResult.timestamp;
        CenterB.timestamp = newTime;
        setTimestamp({current:newTime,previous:prevTime});
        setLoading(false);
    }
    const checkTimestamp = async () => {
        if(polling) return;
        if(loading){
            return setTimeout(()=>{
                checkTimestamp()
            },3000);
        }
        setPolling(true);
        let latestTime = DataCenter.getTimestamp();
        if(!CenterB.initFlag || CenterB.timestamp !== latestTime){//get data
            CenterB.initFlag = true;
            let prevTime = CenterB.timestamp;
            CenterB.timestamp = latestTime;
            let latestData = await DataCenter.getData();              
            setTimestamp({current:latestData.timestamp,previous:prevTime});
            setItems(latestData.items);
        }else{                               
            console.log('[ B ][ checkTimestamp ] up-to-date');                
        }
        setTimeout(()=>{                
            checkTimestamp();            
        }, 10000);
        setPolling(false); 
    }

    useEffect(()=>{        
        checkTimestamp();
        // eslint-disable-next-line
    },[]);


    // console.log(`[${new Date().toLocaleString()}] ${timestamp}`)
    return (
    <div className='component'>
        <div className='name'>component B</div>
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
        <div className='btn'>
            <div className='btnItem' onClick={()=>{addItem()}}>Add Item</div>
        </div>
        {loading?<div className='loading'>Loading</div>:null}
        
    </div>);
}

export default B;