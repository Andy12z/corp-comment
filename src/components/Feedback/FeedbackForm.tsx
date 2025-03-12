import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constant";
type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};
export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState(" ");
  const [showValidIndicator,setShowValidIndicator]=useState(false);
  const [showInvalidIndicator,setShowInvalidIndicator]=useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) {
      return;
    }
    setText(newText);
  };
  const charCount = MAX_CHARACTERS - text.length;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic valid Indicator
    if(text.includes("#")&&text.length>=5){
      setShowValidIndicator(true);
      setTimeout(()=>setShowValidIndicator(false),2000);
    }
    else{
      setShowInvalidIndicator(true);
      setTimeout(()=>setShowInvalidIndicator(false),2000);
      return;
    }
    onAddToList(text);200
    setText(" ");
  };
  return (
    <form onSubmit={handleSubmit} className={`form ${showValidIndicator ? 'form--valid':''} ${showInvalidIndicator ? 'form--invalid':''}`}>
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blahblah"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here,remember to #hashtag the company.
      </label>
      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>submit</span>
        </button>
      </div>
    </form>
  );
}
