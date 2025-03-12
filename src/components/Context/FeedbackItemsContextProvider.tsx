import { createContext, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { useFeedbackItems } from "../lib/hook";
type TFeedbackItemsContext={
  isLoading:boolean;
  errorMessage:string;
  companyList:string[];
  handleAddToList:(text:string)=>void;
  handleSelectCompany:(company:string)=>void;
  filteredFeedbackItems:TFeedbackItem[];
};
 export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(null);
type FeedbackItemsContextProviderProps={
  children:React.ReactNode;
};
export default function FeedbackItemsContextProvider({
  children
}: FeedbackItemsContextProviderProps) {
  const{
    feedbackItems,
    isLoading,
    errorMessage,
    setFeedbackItems,
  }=useFeedbackItems();
   const [selectedCompany, setSelectedCompany] = useState("");
  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );
   const filteredFeedbackItems = useMemo(
     () =>
       selectedCompany
         ? feedbackItems.filter(
             (feedbackItems) => feedbackItems.company === selectedCompany
           )
         : feedbackItems,
     [feedbackItems, selectedCompany]
   );
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split("")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };
    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  };
  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };
 
  return (
    <FeedbackItemsContext.Provider
      value={{
        handleSelectCompany,
        filteredFeedbackItems,
        errorMessage,
        isLoading,
        companyList,
        handleAddToList,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
 