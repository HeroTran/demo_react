import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { footer } from '../styles/footer.scss';

const App = ({ children }) =>
    <div>
        <h1>Magazine</h1>
        { children }
        <footer className={footer}>
            <Link to="/">Home</Link>
            <Link to="/issue">Issue</Link>
            <Link to="/site">Site</Link>
        </footer>
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
