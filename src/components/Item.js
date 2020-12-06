const Item = ({data}) => {
    let {id, state} = data;
    return(
        <div>
            ITEM - {`${id} : ${state}`}
        </div>
    );
}

export default Item;