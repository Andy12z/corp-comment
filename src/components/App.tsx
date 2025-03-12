import Container from "./layout/Container";
import Footer from "./layout/Footer";
import HashtagList from "./Hashtag/HashtagList";
import { useEffect } from "react";
import { useFeedbackItemsStore } from "../Store/FeedbackItemStore";
function App() {
  const fetchFeedbackItems=useFeedbackItemsStore((state)=>state.fetchFeedbackItems);
  useEffect(()=>{
  fetchFeedbackItems();
  },[fetchFeedbackItems]);
  return (
    <div className="app">
      <Footer />
        <Container />
        <HashtagList />
    </div>
  );
}
export default App;
