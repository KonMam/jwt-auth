import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css' 
import Nav from './components/Nav'

export default function App() {
    
    return (
        <div className="App">
            <Nav/>
            <div id="detail">
                <Outlet/>
            </div>
        </div>
        )
}