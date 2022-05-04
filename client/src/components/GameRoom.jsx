import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import CountDown from './CountDown';


export default function GameRoom(props) {
    const [board, setBoard] = useState({owner:'',solution:'',})
    const {id} = useParams();
    console.table(board.solution)

    const createMaxrix = (str) => {
        const arr = str.split('');
        const board = []
        let row = []
        for (let i = 1; i<= arr.length; i++) {
            row.push(arr[i-1])
            if (i % 9 === 0 && i !== 0) {
                board.push(row)
                row = [];
            }
        }
        return board
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
              const {data} = await axios.get(`${process.env.REACT_APP_API}/games/${id}`);
                setBoard(data)
            }
            catch (err) {
              console.log(err);
            }
          };
          if(!board.owner) {
            fetchData();
          }
          //eslint-disable-next-line react-hooks/exhaustive-deps
    })

  return (
    <div>
        <div id='board' className='flex'>
        {createMaxrix(board.solution).map((row, i) => {
        return(
            <div key={i}>
                {row.map((num,j) => 
                    <div className={`p-10 py-5 border-2 ${j % 3 === 0 ?'border-t-black' : 'border-t-blue-300'} ${j  === row.length-1?'border-b-black' : 'border-t-white'}
                    ${i % 3 === 0 ?'border-l-black' : 'border-l-blue-300'} ${i  === row.length-1?'border-r-black' : 'border-t-white'}
                    `}>
                        <div >{num}</div>
                    </div>
                )}
            </div> 
        )})}
        </div>
        <CountDown timerEnd = {board.timerEnd}/>
    </div>
  )
}
