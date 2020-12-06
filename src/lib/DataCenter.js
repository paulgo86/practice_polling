const delay = (sec)=>{
    return new Promise(res=>{
        setTimeout(()=>{
            res(1);
        },300)
    })
}

const CenterA = {
    initFlag:false,
    timestamp:0,
}

const CenterB = {
    initFlag:false,
    timestamp:0,
}

const DataCenter = {
    // set view for DataCenter to Center component
    setView:()=>{
        console.log("setView of Center component function hasn't been set yet.");
    },

    // set center data - set data and timestamp , return current center timestamp
    setData: async (item,idx='new')=>{
        await delay(1);
        if(idx === 'new'){
            let id = DataCenter.items.length+1;
            Object.assign(item,{id});
            Object.assign(DataCenter.items,[...DataCenter.items,item]);
        }else{
            Object.assign(DataCenter.items[idx-1],item);
        }
        let newTimestamp = DataCenter.setTimestamp();
        await DataCenter.setView({timestamps:{current:DataCenter.timestamp,previous:DataCenter.prevTimestamp},newItems:DataCenter.items});
        await delay(1);
        return {timestamp:newTimestamp}
    }, 

    // get center data
    getData: async ()=>{
        await delay(0.5);
        return {
            timestamp:DataCenter.timestamp,
            items:DataCenter.items
        }
    },

    // set center timestamp
    setTimestamp:()=>{
        DataCenter.prevTimestamp = DataCenter.timestamp;
        DataCenter.timestamp = new Date().getTime();
        return DataCenter.timestamp;
    },
    // get center timestamp
    getTimestamp:()=>{
        return DataCenter.timestamp;
    },

    // previous timestamp
    prevTimestamp:0,
    // timestamp
    timestamp:0,
    // items
    items:[],

}

export { DataCenter, delay, CenterA, CenterB };