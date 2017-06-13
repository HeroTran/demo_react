import * as React from 'react';
import { Link } from 'react-router';
import Magazine from '../components/Magazine/Magazine';
interface HomeContainerProps {
    
}
const HomeContainer: React.StatelessComponent<HomeContainerProps> = ({ children }) =>
    <div>
        <Magazine />
       <h2>Hello world</h2>
    </div>



export default HomeContainer;
