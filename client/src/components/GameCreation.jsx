import React, { useEffect, useState , useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {updateUsername} from '../store/reducer/userReducer'
import {SocketContext} from '../middleware/socket';
export default function GameCreation() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gamename:'',
    difficulty: "",
    player: "",
    timer: "",
    lives: 1,
  });
  const [alert, setAlert] = useState('');
  const [username,setUsername] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);

  const handleFormChange = (e) => {
    let updatedForm = { ...form };
    updatedForm[e.name] = e.value;
    setForm(updatedForm);
  };
  const handleSubmit = async () => {
    if (!user.token) {
      return setAlert("MUST BE LOGGED IN TO CREATE GAME");
    }

    let { status, data } = await axios.post(
      `${process.env.REACT_APP_API}/games`,
      { form, user },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (status === 200) {
      socket.emit('create-room');
      return navigate(`/room/${data.room}`);
    }
  };

  const handleChangeUsername = async() => {
    dispatch(updateUsername(`Guest ${username}-${user.user_id.slice(user.user_id.length - 6, user.user_id.length)}`))
  };
  useEffect(() => {

  })
  return (
    <div className="w-full h-full bg-blue-100">
      {alert ? (
        <div
          className="p-4 text-red-700 border rounded border-red-900/10 bg-red-50"
          role="alert"
        >
          <strong className="text-sm font-medium"> {alert} </strong>
        </div>
      ) : (
        <></>
      )}
      <div>
      {/* || user.name !== user.user_id */}
        {user.token ? 
        <div>
        </div>
          :
        <div>
          <div className="flex flex-col items-center">
            <div className="p-1 w-full flex justify-center h-[50px]">
              <input className="w-full border-[1px] border-black text-center rounded-lg" value={username} placeholder='Change UserName' onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <button className="w-[50%] px-2 py-3 text-sm font-medium rounded-lg text-white bg-indigo-600" onClick={() => handleChangeUsername()}>Change User Name</button>
          </div>
        </div>
        }
      </div>
      <div className="p-2 flex flex-col">
          <label className="text-center">Game Name</label>
          <input
            type="String"
            name="gamename"
            className="m-2 border-black hover:cursor-pointer p-3"
            value={form.gamename}
            placeholder='Name Your Game Buddy'
            onChange={(e) => handleFormChange(e.target)}
          />
      </div>
      <div className="p-2 flex flex-col">
        <label className="text-center">Choose Difficulty</label>
        <select
          className="m-2 border-black hover:cursor-pointer"
          name="difficulty"
          value={form.difficulty}
          onChange={(e) => handleFormChange(e.target)}
        >
          <option value="">Set Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="expert">Software Developer</option>
        </select>
      </div>
      <div className="p-2 flex flex-col">
        <label className="text-center">Choose Number of Players</label>
        <select
          className="m-2 border-black hover:cursor-pointer"
          name="player"
          value={form.player}
          onChange={(e) => handleFormChange(e.target)}
        >
          <option value="">Set Number Of Player</option>
          <option value="1">Solo(1)</option>
          <option value="2">Date(2)</option>
          <option value="3">Third Wheel(3)</option>
          <option value="4">Party(4)</option>
        </select>
      </div>
      <div className="p-2 flex flex-col">
        <div className="p-2 flex flex-col">
          <label className="text-center">Set Timer in Seconds Per Turn</label>
          <select
            className="m-2 border-black hover:cursor-pointer"
            name="timer"
            value={form.timer}
            onChange={(e) => handleFormChange(e.target)}
          >
            <option value="">Set Timer</option>
            <option value="00:01:00">Give me Speed(1 min)</option>
            <option value="00:05:00">Had my morning coffee(5 min)</option>
            <option value="00:10:00">Third Wheel(10 min)</option>
            <option value="00:15:00">Party(15 min)</option>
          </select>
        </div>
        <div className="p-2 flex flex-col">
          <label className="text-center">Custom Timer</label>
          <input
            type="tel"
            name="timer"
            className="m-2 border-black hover:cursor-pointer"
            value={form.timer}
            placeholder='00:00:00'
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            onChange={(e) => handleFormChange(e.target)}
          />
        </div>
      </div>
      <div className="p-2 flex flex-col">
        <label className="text-center">Lives (MAX 10)</label>
        <input
          type="number"
          name="lives"
          className="m-2 border-black hover:cursor-pointer"
          value={form.lives}
          min="1"
          max="10"
          onChange={(e) => handleFormChange(e.target)}
        />
      </div>
      <div>
        <button
          className="block w-full px-5 py-3 text-sm font-medium rounded-lg text-white bg-indigo-600"
          onClick={(e) => handleSubmit(e)}
        >
          Create Board
        </button>
      </div>
    </div>
  );
}
