import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../components/Helpers/Header/Header';
import '../app.scss';

const App = ({ children }) =>
    <div>
        <Header />
        <footer>
            <Link to="/">Home</Link>
            <Link to="/issue">Issue</Link>
            <Link to="/site/121">Site</Link>
        </footer>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
