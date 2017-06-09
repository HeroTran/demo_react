import React from 'react';
import { Link } from 'react-router';
import '../app.scss';
import Header from '../components/Helpers/Header/Header';
import Home from '../components/Home/Home';

const App = ({ children }) =>
    <div>
        <Header />
        <Home />
    </div>;



export default App;
