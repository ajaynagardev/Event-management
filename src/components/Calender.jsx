import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
class Calender extends React.Component {
  constructor(props) {
    super(props);
    const storedData = JSON.parse(localStorage.getItem("calendarData")) || {};   //get data from localstorage
    this.state = {
      value: new Date(),                                                         //for date
      cardData: false,                                                           //for showing popup
      inputData: "",                                                             //input values
      data: storedData,                                                        //data from localstorage
      buttonD:true,
      
    };
  }

    /*--------- for add data from localstorage and also setState ----------*/
  currentTime = (id, status) => {
    let a = new Date();
    var datestring = a.getHours() +":" +a.getMinutes() +":" +a.getSeconds() +" " +(a.getHours() < 12 ? "AM" : "PM");
    this.setState({buttonD:true})
    const updatedUserData = {...this.state.data,
      [this.state.value.toDateString()]: {
        ...(this.state.data[this.state.value.toDateString()] || {}),
        [id]: { event: status, time: datestring,btnDisable: this.state.buttonD,inputActive:this.state.readonly},
      },
    };
    this.setState({ data: updatedUserData }, () => {
      localStorage.setItem("calendarData", JSON.stringify(updatedUserData));
    });    
  };

  editButton = (id, status) => {
    let a = new Date();
    var datestring = a.getHours() +":" +a.getMinutes() +":" +a.getSeconds() +" " +(a.getHours() < 12 ? "AM" : "PM");
    this.setState({buttonD:false})
    const updatedUserData = {...this.state.data,
      [this.state.value.toDateString()]: {
        ...(this.state.data[this.state.value.toDateString()] || {}),
        [id]: { event: status, time: datestring,btnDisable: this.state.buttonD},
      },
    };
    this.setState({ data: updatedUserData }, () => {
      localStorage.setItem("calendarData", JSON.stringify(updatedUserData));
    });   
  };

  clearFun = (id) => {
    let status  =''
    this.editButton(id,status)
  };
 
    /*--------- for change value from input fileds ----------*/
  changehandler = (e, id) => {
    const newData = {...this.state.data,
      [this.state.value.toDateString()]: {...(this.state.data[this.state.value.toDateString()] || {}),
        [id]: {event: e.target.value,time:this.state.data[this.state.value.toDateString()]?.[id]?.time || ""},
      },
    };
    this.setState({ data: newData });
  };

  /*--------- for show popup ----------*/
  addTask = (id) => {
    this.setState({ cardData: true });
  };
  render() {
    return (
      <>
        <div className="help-container">
          <div className="help-heading">Calendar (India)</div>
          <div className="help-wrapper">
            {/*--------- for show calendar ----------*/}
            <Calendar
              onChange={(value) => this.setState({ value, cardData: true })}
              value={this.state.value}
              className="calendar-card"
            />

            {/*--------- for show popup ----------*/}
            {this.state.cardData && (
              <div className="popup">
                <div className="popup-wrapper">

                      {/*--------- for close popup ----------*/}
                      <div className="closeBtn">

                  <button onClick={() => this.setState({ cardData: false })} className="btnClose">X</button>
                      </div>
                  
                  {["8-9","9-10","10-11","11-12","12-1", "1-2", "2-3","3-4","4-5","5-6","6-7","7-8",].map((id) => (
                    <div className="popup-map" key={id}>

                      {/*--------- for show time from array ----------*/}
                      <p className="popup-time">{id}</p>

                      {/*--------- for show input filds ----------*/}
                      {/* <input type="text" placeholder="Enter Event" className="popup-input"
                        value={this.state.data[this.state.value.toDateString()]?.[id]?.event || ""}
                        // value={this.state.data?.[id]?.event || ""}
                        onChange={(e) => this.changehandler(e, id)}
                      /> */}

                      {/*--------- for show button for add data ----------*/}
                      {/* <button
                        onClick={() =>this.currentTime( id,this.state.data[this.state.value.toDateString()]?.[id]?.event || "")}
                        className="btn">Add
                      </button> */}

                      {
                        this.state.data[this.state.value.toDateString()]?.[id]?.btnDisable===true? <><input type="text" placeholder="Enter Event" readOnly className="popup-input"
                        value={this.state.data[this.state.value.toDateString()]?.[id]?.event || ""}
                        onChange={(e) => this.changehandler(e, id)}
                      /><button className="btn clear-btn" onClick={() =>this.clearFun( id,this.state.data[this.state.value.toDateString()]?.[id]?.event || "")}>Clear</button></>: <input type="text" placeholder="Enter Event" className="popup-input"
                      value={this.state.data[this.state.value.toDateString()]?.[id]?.event || ""}
                      onChange={(e) => this.changehandler(e, id)}
                    />
                      }

                      {                        
                        this.state.data[this.state.value.toDateString()]?.[id]?.btnDisable===true?<button
                        className="btn edit-btn" onClick={() =>this.editButton( id,this.state.data[this.state.value.toDateString()]?.[id]?.event || "")}>Edit
                      </button>:<button
                        onClick={() =>this.currentTime( id,this.state.data[this.state.value.toDateString()]?.[id]?.event || "")}
                        className="btn">Add
                      </button>
                      }                   
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Calender;