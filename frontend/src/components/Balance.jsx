import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
const Balance = () => {
    const [balance,setBalance]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                "x-auth-token": localStorage.getItem("x-auth-token"),
            }
        }).then((res)=>{
            setBalance(res.data.balance);
        });
    },[balance])
  return (
    <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
  )
}

export default Balance
