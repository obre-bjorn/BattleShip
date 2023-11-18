function Ship (length){
    
    let life = length

    const hit =  () =>{
        // eslint-disable-next-line no-const-assign, no-unused-expressions, no-plusplus
        life-=1
    }

    const getShipName = () => name

    const getLength = () => length
    

    const getRemainingLife = () => life

    const isSunk = () => life === 0
    
    return {
        getLength,
        getRemainingLife,
        isSunk,
        hit
    }
}


export default Ship