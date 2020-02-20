import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import Store from "store";


// PROVIDER, STATE관리하는 파일 

class AppContainer extends Component {
  constructor(props) {
    super(props);
    
    // STATE 바꾸는 함수 
    this._deleteNotification = id => {
      this.setState(currentState => {
        const newState = delete currentState.notifications[id];
        return newState;
      });
    };

    // STATE 바꾸는 함수 
    this._seeNotification = id => {
      this.setState(currentState => {
        return {
          ...currentState,
          notifications: {
            ...currentState.notifications,
            [id]: {
              ...currentState.notifications[id],
              seen: true
            }
          }
        };
      });
    };

    //STATE
    this.state = {
      notifications: {
        "1": {
          id: 1,
          text: "Something",
          seen: false
        },
        "2": {
          id: 2,
          text: "Something else",
          seen: false
        },
        "3": {
          id: 3,
          text: "Something else but different",
          seen: false
        }
      },

      deleteNotification: this._deleteNotification,
      seeNotification: this._seeNotification

    };
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
}

export default AppContainer;