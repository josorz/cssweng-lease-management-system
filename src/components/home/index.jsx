import React from 'react'
import { useAuth } from '../../contexts/authContext'
import Header from '../header'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <>
            <Header />
            <div>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
        </>
    )
}

export default Home