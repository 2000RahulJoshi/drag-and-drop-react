import React, { useRef, useState } from 'react';
import './container.css'

function Container() {
    const [leftItems,setLeftItems] = useState(["Item 1","Item 2","Item 3","Item 4","Item 5","Item 6","Item 7"]);
    const [rightItems,setRightItems] = useState([]);
    let id = 0;
    const inputRef = useRef(0);
    let flag = false;

    function start(event){
        id = event.target.textContent;
        id = id.slice(5)
    }

    function rightStart(event){
        id = event.target.textContent;
        id = id.slice(5);
        flag = true;
    }


    function addItems(event){
        let contentVal = "Item "+id;
        if(event.target.id === 'rightBox'){
            const newRightArr = [];
            for(let i of rightItems){
                if(i.slice(5) !== id){
                    newRightArr.push(i);
                }
            }
            newRightArr.push(contentVal);
            setRightItems(newRightArr)
        }  
        else if(flag){
            const newRightArr = [];
            let cnt = 0;
            let index;
            for(let i of rightItems){
                if(i.slice(5) === id)    continue;
                if(i.slice(5) === event.target.id){
                    index = cnt;
                    newRightArr.push(cnt);
                    newRightArr.push(i);
                }
                else{
                    newRightArr.push(i);
                }
                cnt++;
            }
            newRightArr[index] = contentVal;
            setRightItems(newRightArr);
        }
        else{
            const newRightArr = [];
            for(let i of rightItems){
                if(i.slice(5) === event.target.id){
                    newRightArr.push(contentVal);
                    newRightArr.push(i);
                }
                else{
                    newRightArr.push(i);
                }
            }
            setRightItems(newRightArr);
        }
        const newLeftArr = [];
        for(let i of leftItems){
            if(i.slice(5) !== id){
                newLeftArr.push(i);
            }
        }
        setLeftItems(newLeftArr)
    }


  return (
    <div className='d-flex align-items-center justify-content-center box gap-5'>
        <div className='leftDiv w-25 d-flex flex-column p-2'>
            {
                leftItems.map( (boxes)=>{
                    let id = boxes.slice(5);
                    return (
                        <div className='text-center py-2 listItems' draggable='true' onDragStart={start} id={id} key={id}>
                            {boxes}
                        </div>
                    )
                })
            }
        </div>
        <div className='rightDiv w-25 d-flex flex-column p-2' id='rightBox' onDrop={addItems} onDragOver={(event)=>event.preventDefault()}>
            {
                rightItems.map( (boxes)=>{
                    let id = boxes.slice(5);
                    return (
                        <div className='text-center py-2 listItems' draggable='true' id={id} key={id} ref={inputRef} onDragStart={rightStart} >
                            {boxes}
                        </div>
                    )
                } )
            }
        </div>
    </div>
  )
  
}

export default Container;
