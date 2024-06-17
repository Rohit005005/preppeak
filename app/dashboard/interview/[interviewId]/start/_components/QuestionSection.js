import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({ mockQuestions, activeQuestionIndex }) {
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support speech synthesis.");
    }
  };
  return (
    mockQuestions && (
      <div className="shadow-md p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockQuestions &&
            mockQuestions?.map((item, index) => (
              <h2
                className={`shadow-sm p-2 border rounded-full text-center text-xs md:text-sm whitespace-nowrap cursor-pointer
            ${activeQuestionIndex == index && "bg-primary text-white"}`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockQuestions[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeach(mockQuestions[activeQuestionIndex]?.question)
          }
        />
        <div className="border rounded-lg p-5 bg-blue-100 mt-14">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="mt-2 text-sm text-primary">
            Click on Record Answer when you want to answer the question. At the
            end of the Interview we will give you the feedback along with
            correct answer for each question and your answer to compare it.
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionSection;
