import './Lemon.css';
import lemon from '../../assets/Lemon.svg'

const Lemon = ({ user, setUser }) => {

    return (
        <img src={lemon} alt="" className='lemon'/>
    );
};

export default Lemon;
