import { Provider } from "react-redux";
import Body from "./components/Body";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <Body />
    </Provider>
  );
}
