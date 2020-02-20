import React, { Fragment } from "react";
import Header from "Components/Header";
import Flex from "styled-flex-component";
import Notification from "Components/Notification";
import Store from "store";

const AppPresenter = () => (
  <Fragment>
    <Header />
    <Flex alignCenter full column>
      <Store.Consumer>
        {store => {
          //Array가 아닌거를 map하는 방법. Object.keys 
          return Object.keys(store.notifications).map(key => (
            <Notification
              key={store.notifications[key].id}
              id={store.notifications[key].id}
              text={store.notifications[key].text}
              seen={store.notifications[key].seen}
            />
          ));
        }}

      </Store.Consumer>
    </Flex>
  </Fragment>
);

export default AppPresenter;