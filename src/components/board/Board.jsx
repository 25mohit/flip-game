import { useEffect, useState } from "react"

const Board = () => {
    const [indexing, setIndexing] = useState({val1: null, val2: null})
    const [selectedCard, setSelectedCard] = useState({card1: null, card2: null})
    const [filteredArr, setFilteredArr] = useState([])

    const tilesArray = [
        { text: 'a', value: 1, status: false},
        { text: 'b', value: 2, status: false},
        { text: 'c', value: 3, status: false},
        { text: 'd', value: 4, status: false},
        { text: 'f', value: 6, status: false},
        { text: 'e', value: 5, status: false},
        { text: 'a', value: 1, status: false},
        { text: 'b', value: 2, status: false},
        { text: 'c', value: 3, status: false},
        { text: 'd', value: 4, status: false},
        { text: 'e', value: 5, status: false},
        { text: 'f', value: 6, status: false},
    ].sort(() => .5 - Math.random())

    console.log("tilesArray", tilesArray);
    const calcColor = (id) => {
        if(id === 1 ){
            return 'red'
        } else if (id === 2 ){
            return 'orange'
        } else if (id === 3 ){
            return 'green'
        } else if (id === 4 ){
            return 'blue'
        } else if (id === 5 ){
            return 'yellow'
        } else if (id === 6 ){
            return 'pink'
        }
    }

    useEffect(() => {
        setFilteredArr(tilesArray)
    },[])
    
    const flipCardHandler = (data, indx) => {
        // console.log("data",data, indx);
        if(indexing.val1 == null){
            setIndexing({val1:indx})
            setSelectedCard({card1: data.value})
        }
        else if (indexing.val1 !== null && indexing.val2 == null && indx !== indexing.val1){
            setIndexing({...indexing, val2:indx})
            setSelectedCard({...selectedCard, card2: data.value})
        }
        else if (indexing.val1 !== null && indexing.val2 !== null){
            setIndexing({val1: null, val2: null})
            setSelectedCard({card1: null, card2: null})
        }
        console.log("selectedCard", selectedCard, indexing)
    }

    useEffect(() => {
        if(selectedCard.card1 !== null && selectedCard.card2 !== null){
            if(selectedCard.card1 === selectedCard.card2 ){
                
                const filtered = filteredArr.map(name => {
                    if(name.value === selectedCard.card1 ){
                        return {...name, status:true}
                    } else {
                        return name
                    }
                    })
                setFilteredArr(filtered)
            } else {
                console.log("result", false, selectedCard);
            }
        }
        
    },[indexing])


  return (
    <div className='game_board'>
        <div className="container">
            {
                filteredArr?.map((name, indx) => <div key={indx} onClick={() => flipCardHandler(name, indx)} style={{backgroundColor: ((indexing.val1 === indx || indexing.val2 === indx) || name.status) ? calcColor(name.value) : 'gray'}}>
                {((indexing.val1 === indx || indexing.val2 === indx) || name.status) && <p>{name.text}</p>}</div>)
            }
        </div>
    </div>
  )
}

export default Board