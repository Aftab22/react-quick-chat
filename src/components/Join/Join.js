import React,{useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join =()=>{
    const [name,setName]=useState('');
    const [group,setGroup]=useState('');

    return(
      <div className='joinOuterContainer'>
          <div className='joinInnerContainer'>
              <h1 className="heading">Join</h1>
              <div><input placeholder="" className="joinInput" type="text" onChange={(e)=>setName(e.target.value)} /></div>
              <div><input placeholder="" className="joinInput mt-20" type="text" onChange={(e)=>setGroup(e.target.value)} /></div>
             
              <Link onClick={e=>(!name||!group)?e.preventDefault():null} to={`/chat?name=${name}&group=${group}`}>
              <button className="button mt-20" type="submit">Sign in</button>
              </Link> 

          </div>

      </div>
    )
}

export default Join;