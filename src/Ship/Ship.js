function Ship (length){
    
    let life = length

    const hit =  () =>{
        // eslint-disable-next-line no-const-assign, no-unused-expressions, no-plusplus
        life--
    }

    const getRemainingLife = () => life

    const isSunk = () => life === 0
    
    return {
        getRemainingLife,
        isSunk,
        hit
    }
}


export default Ship