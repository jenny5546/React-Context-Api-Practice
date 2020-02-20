## Props로 value들을  pass 하지말고 context api를 써보자! 

> props로 value를 넘겨주고 그걸 받아서 back에다가 정보를 보내는 방법은 리액트에서 좋은 습관이 아니라고 해서 context api를 써서 폼 전달 방식을 바꾸라는 요청을 받았다. 어제 Redux를 써보는 연습을 그냥 혼자 해봤는데 리덕스를 대체할 수 있을 만한 리액트의 context api를 써보는 것을 연습해보았다. 이 연습 레포에서 빠르게 연습한 후 on demand 에다가 곧바로 적용해볼 것이다. 


### Context Api 사용 방법. 

1. 일단, store.js를 생성해서 

'''
import React from "react";
const Store = React.createContext(null);
export default Store;

'''
이렇게 React.createContext(null)로 설정. 그리고 export default Store를 한다. 

2.  그 다음, AppContainer.js 에서 
'''
import Store from "store"; //얘는 .env에 NODE_PATH = src라고 해줬기에 
파일 경로를 귀찮게 다 명시할 필요가 없다. 
'''
를 해준 다음에, 
'''
render() {
    return (
      <Store.Provider value={this.state}>
        <AppPresenter />
      </Store.Provider>
    );
  }
'''
라는 Store.Provider를 사용하기.