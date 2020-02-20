## Props로 value들을  pass 하지말고 context api를 써보자! 

> props로 value를 넘겨주고 그걸 받아서 back에다가 정보를 보내는 방법은 리액트에서 좋은 습관이 아니라고 해서 context api를 써서 폼 전달 방식을 바꾸라는 요청을 받았다. 어제 Redux를 써보는 연습을 그냥 혼자 해봤는데 리덕스를 대체할 수 있을 만한 리액트의 context api를 써보는 것을 연습해보았다. 이 연습 레포에서 빠르게 연습한 후 on demand 에다가 곧바로 적용해볼 것이다. 


### Context Api 사용 방법. 

#### Creating the Store 

1. 일단, store.js를 생성해서 

```
import React from "react";
const Store = React.createContext(null);
export default Store;

```
이렇게 React.createContext(null)로 설정. 그리고 export default Store를 한다. 

2.  그 다음, AppContainer.js 에서 

```
import Store from "store"; //얘는 .env에 NODE_PATH = src라고 해줬기에 
파일 경로를 귀찮게 다 명시할 필요가 없다. 
```
를 해준 다음에, 

```
render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
```
라는 Store.Provider를 사용하기.


#### Consuming the Store

Store.Consumer 라는 것을 사용해야하는데, 어떻게 사용할까? 

<Store.Provider> 에서는 그런 state 들을 제공해주고, 
<Store.Consumer> 에서는 그런 state를 말 그대로 consume 하는데, 

```
// NotificationPresenter.js

<Store.Consumer>
    //Consumer 한테 함수가 아닌 다른 child를 사용하면 안된다!!!!! 하고 싶다고 할 수 있는 것도 아님. *****
    //ex) <span> 이런거 사용할 수가 없다는 것.*****
</Store.Consumer>

```

> 결국에는, Provider를 생성하고, `<Store.Provider value={this.state}>` 이렇게 넣어주고, `import Store from "store"`를 통해서 그 store가 필요한 부분에 당겨오고, 그리고 그 필요한 부분은 consumer를 생성해서 store를 변수로 가지고 있는 함수를 가져서 이용하면 된다는 것이다. 


```
<Store.Consumer>
            {store => ( 이런식으로 그 store를 이용해주면 된다.
</Store.Consumer>           
```

Redux에서 action, dispatch action creator 어쩌고저쩌고 했던 것을 state를 쓰면서 간단하게 store 할 수 있다. !!! 훨씬 편해짐.

*You always have to put a function as a child of consumer 함수를 넣어야한다!!!!! *

> 그니까 flow 를 다시 짚어보면 : consumer에서 'store' 전체를 불러올 수 있고, 그 store는 말만 store지 결국엔 그 'provider'에서 선언한 state라는 것이다.

#### Updating the Store

> State를 바꾸는 함수를 만들고 싶고, 그걸 provider 안에 넣고 싶으면? 이거를 다른데다가 넣으면 안 돌아가고, Constructor안에 다 넣어야한다!!!!!

*원칙: 너의 provider 안에 포함 시키고 싶은 함수(나중에 consume하고 싶은 함수들은)는 constructor 안에 있어야한다.*

참고) State 안에 함수를 별로 안썼었던 거 같은데, state가 함수를 부를 수도 있다는 사실을 유념하자. 

```
this.state = {
    deleteNotification: this._deleteNotification,
    seeNotification: this._seeNotification
};
```
이런식으로 constructor 안에 있는 어떠한 함수 _deleteNotification, _seeNotification을 부를 수 있고 그 함수 안에서는 

```
this._deleteNotification = id => {
    this.setState(currentState => {
    const newState = delete currentState.notifications[id];
    return newState;
    });
};
```

이런식으로 다른 state를 바꿔주는 함수가 state가 될 수 있다는 것...(쫌 복잡한듯)

