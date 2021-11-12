import React from 'react';
import reportWebVitals from '../reportWebVitals';
import './seats.css'

class SeatGrid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            seats:[],
            buttonActive:false,
            buttonData: ''
        }
    }

    componentDidMount(){
        fetch('./seats.json')
        .then(response => response.json())
        .then(data => this.setState({ seats: data }));
    }

    handle = (value)=>{
        const {seats} = this.state
            const row = seats.map(e=>{
                if(e.isSelected ===true){
                    e.isSelected = false
                }
                return e
            })
            this.setState({seats:[...row]})

        for(let i=0;i<this.props.seat;i++){
            let [res,flag] = this.handleClick(value+i, seats)
            if(flag==true){
                break;
            }
            this.setState({seats:[...res]})
        }

        this.verification(this.state.seats)
    }

    handleClick = (value,seats)=>{
        console.log(value)
        let flag = true
        let rowdata = seats.map((e)=>{
            if (e.id === value && e.isReserved===false && e.disable!==true) {
                e.isSelected = true
                flag = false
            }
            return e
            })
        return [rowdata, flag]
    }

    verification = (seats) =>{
        let counter = seats.filter(e=>{
            if(e.isSelected === true){
                return e
            }
        })
        if(counter.length==this.props.seat){
            let price;
            if(counter[0]["id"]<80){
                console.log("club")
                price = this.props.seat*250
                this.setState({...this.state, buttonActive: true, buttonData:price})
            }else if(counter[0]["id"]>80 && counter[0]["id"]<160){
                console.log("Exceutive")
                price = this.props.seat*180
                this.setState({...this.state, buttonActive: true, buttonData:price})
            }else{
                console.log("Normal")
                price = this.props.seat*100
                this.setState({...this.state, buttonActive: true, buttonData:price})
            }
        }else{
            this.setState({...this.state, buttonActive:false, buttonData:''})
        }
    }
    
    render(){
        const {seats} = this.state
        let seatArr = [...seats]
        const Classes = ["A", "B", "C", "D","E","F","G","H","I","J","K","L"];
        const category = ["CLUB-Rs. 250", "Executive-Rs. 180", "Normal-Rs. 100"]
        return(
        <div>
           {/* <h1> {this.props.seat} </h1> */}
           {seatArr===[]
           ?<h1>Loading...</h1>:<div>
               {this.state.buttonActive?<button className="btn btn-danger">Please Pay Rs. {this.state.buttonData} to Proceed</button>:null}
               { category.map(cat=>
                    <div key={cat}>
                        <br/>
                        <div><h5 style={{textAlign:"left"}}>{cat}</h5></div>
                        <table className="seatingModal__seatContainer_can">
                        {/* <div > */}
                        <thead><tr style={{ display: "grid" }}>
                            {Classes.splice(0,4).map((myClass) => (
                                <td style={{ margin: 10, color: "gray", font: 5 }} key={myClass}>
                                {myClass}
                                </td>
                            ))}
                            </tr>
                            </thead>
                            <tbody className="seatingModal__seatContainer_seats"> 
                            {seatArr.splice(0,80).map(element=>
                            <tr onClick={()=>this.handle(element.id)} className={element.disable?"disable":element.isReserved?"reserved": element.isSelected?"select": "seats"} key={element.id}>
                            <td>{element.number}</td>
                            </tr>
                            )}
                            </tbody>
                        
                        {/* </div> */}
                        </table>
                        </div>
               )}
                <div className="Screen">
            <img src="https://i.imgur.com/XhsTL5Y.png" alt="screen" />
          </div>
           </div>}
           
        </div>
        )
    }
}
export default SeatGrid