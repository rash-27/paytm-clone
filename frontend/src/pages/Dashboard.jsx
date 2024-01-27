import React from 'react'
import Balance from '../components/Balance';
import AppBar from '../components/AppBar';
import Users from '../components/Users';
const Dashboard = () => {
    
  return (
    <>
    <AppBar />
    <div className='px-10 pt-8'>
        <Balance />
        <Users />
    </div>
    </>
  )
}
export default Dashboard
