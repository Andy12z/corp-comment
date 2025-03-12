import { useFeedbackItemsStore } from "../../Store/FeedbackItemStore";
import FeedbackForm from "../Feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";
export default function Header() {
  const addItemToList=useFeedbackItemsStore(state=>state.addItemToList);
  return (
    <header>
      <Logo />
      <PageHeading />
      <FeedbackForm onAddToList={addItemToList} />
      <Pattern />
    </header>
  );
}
