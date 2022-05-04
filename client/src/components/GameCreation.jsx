import React, { useState } from 'react'
import axios from "axios";
import { useSelector} from 'react-redux';
export default function GameCreation() {
    const [form, setForm] = useState({
        difficulty: '',
        player: '',
        timer: '',
        lives: 1,
    })
    const [alert, setAlert] = useState('');

    const token = useSelector(state => state.user.token)

    const handleFormChange = (e) => {
        let updatedForm = {...form};
        updatedForm[e.name] = e.value;
        setForm(updatedForm)
    };
    const handleSubmit = async() => {
        if(!token) {
            return setAlert('MUST BE LOGGED IN TO CREATE GAME')
        }
        let { data } = await axios.post(`${process.env.REACT_APP_API}/games`, {form}, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
    };


  return (
    <div className=''>
        {alert ? 
        <div className="p-4 text-red-700 border rounded border-red-900/10 bg-red-50" role="alert">
            <strong className="text-sm font-medium"> {alert} </strong>
        </div>
        :
        <></>
        }
        <div className='p-2'>
        <label>Choose Difficulty</label>
            <select  className="m-2 border-black hover:cursor-pointer" name= 'difficulty' value={form.difficulty} onChange={(e) => handleFormChange(e.target)} >
              <option  value="" >Set Difficulty</option>
              <option  value="easy" >Easy</option>
              <option  value="medium" >Medium</option>
              <option  value="Hard" >Hard</option>
              <option  value="expert" >Software Developer</option>
            </select>
        </div>
        <div className='p-2'>
        <label>Choose Number of Players</label>
            <select  className="m-2 border-black hover:cursor-pointer" name= 'player' value={form.player} onChange={(e) => handleFormChange(e.target)} >
              <option  value="" >Set Number Of Player</option>
              <option  value="1" >Solo(1)</option>
              <option  value="2" >Date(2)</option>
              <option  value="3" >Third Wheel(3)</option>
              <option  value="4" >Party(4)</option>
            </select>
        </div>
        <div className='p-2 flex'>
            <div className='p-2'>
                <label>Set Timer in Seconds Per Turn</label>
                <select  className="m-2 border-black hover:cursor-pointer" name= 'timer' value={form.timer} onChange={(e) => handleFormChange(e.target)} >
                    <option  value="" >Set Timer</option>
                    <option  value="00:01:00" >Give me Speed(1 min)</option>
                    <option  value="00:05:00" >Had my morning coffee(5 min)</option>
                    <option  value="00:10:00" >Third Wheel(10 min)</option>
                    <option  value="00:15:00" >Party(15 min)</option>
                </select>
            </div>
            <div className='p-2'>
                <label>Timer</label>
                <input type="tel" name='timer' className="m-2 border-black hover:cursor-pointer" value={form.timer} pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}" onChange={(e) => handleFormChange(e.target)}/>
            </div>
        </div>
        <div className='p-2'>
            <label>Lives (MAX 10)</label>
            <input type="number" name='lives' className="m-2 border-black hover:cursor-pointer" value={form.lives}  min='1' max='10' onChange={(e) => handleFormChange(e.target)}/>
        </div>
        <div>
        <button
            className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
            onClick={(e) => handleSubmit(e)}
          >
            Create Board
          </button>
        </div>
    </div>
  )
}
