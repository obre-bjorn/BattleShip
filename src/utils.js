
export default  function randomCoordinates(){

    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return [y,x]
}


export function clearContainer(parentElement){
    
   // eslint-disable-next-line no-param-reassign
   parentElement.innerHTML = ''

}

// Show ship in the UI if It is damaged or just showing its location

export function showShip(coordinates,shipLength,side,condition){
    let[x,y] = coordinates
    
    for(let shipPart = 0; shipPart < shipLength; shipPart+=1){
        const cellSelected = document.querySelector(`[data-row ="${x}"][data-col="${y}"]`)
        
        console.log(x,y)

        if (condition === 'show'){
            
            cellSelected.classList.add('show') 
            if( side === 'vertical'){
                
                x+=1
    
            }else{
                y+=1
    
            }   
        }else{

            cellSelected.classList.add('destroyed') 
            if( side === 'vertical'){
                
                x+=1
    
            }else{
                y+=1
    
            }  
        }


    }


}