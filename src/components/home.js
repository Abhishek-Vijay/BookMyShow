import React,{ useState } from 'react';
import SeatGrid from './SeatGrid';

const Home = ()=>{
    const [seat, setSeat] = useState(0);
    const [show, setShow] = useState(false);
    let seatArray = [1,2,3,4,5,6,7,8,9,10]
    const seatNum =(e)=>{
        let number = e.target.value
        setSeat(number)
    }
    const handleClick =()=>{
        setShow(true)
    }
    return (
        <div>
            {show ?
            <div>
                <SeatGrid seat={seat}/>
            </div>
                :
            <div>
                <select required onChange={(e)=>seatNum(e)}>
                    <option selected disabled>--Please Choose Number of Tickets--</option>
                    {seatArray.map((num,i)=>{
                        return <option key={i} value={num}>{num}</option>
                    })}
                </select>
                <div>
                    <button className="btn btn-primary" disabled={seat===0} onClick={()=>handleClick()}>Show Seats</button>
                </div>
            </div>}
        </div>
    )
}

export default Home