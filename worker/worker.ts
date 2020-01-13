import { expose } from 'comlink';

class API {
  sayHello() {
    return 'Hello!';
  }
}

expose(API);
