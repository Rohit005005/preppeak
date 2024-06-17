"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetFeedback();
  }, []);
  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer?.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  const getOverallRating = () => {
    const totalRating = feedbackList.reduce(
      (acc, item) => acc + parseFloat(item.rating || "0"),
      0
    );
    const overallRating = (totalRating / 5).toFixed(1); // assuming there are always 5 questions
    return overallRating;
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="text-xl font-bold text-gray-500">
          No interview feedback record found !(atleast answer 1 question to get
          feedback)
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-400">
            Congratulation !!!
          </h2>
          <h2 className="text-2xl font-bold">
            Here is your interview feedback
          </h2>
          <h2 className="text-lg text-primary my-4">
            Your overall interview rating:{" "}
            <strong>
              {feedbackList.length > 0 ? `${getOverallRating()}/5` : "N/A"}
            </strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with correct answer, your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger className="shadow-md flex justify-between items-center gap-3 p-2 bg-secondary rounded-lg mt-8 mb-3 text-md text-left w-full">
                  {item?.question}
                  <Image
                    src={"/down.svg"}
                    height={15}
                    width={15}
                    className="mr-3"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-primary p-2 border rounded-lg shadow-md">
                      <strong>Rating: </strong>
                      {item?.rating}
                    </h2>
                    <h2 className="shadow-md text-sm bg-red-100 p-2 border rounded-lg text-red-700">
                      <strong>Your Answer: </strong>
                      {item?.userAns}
                    </h2>
                    <h2 className="shadow-md text-sm bg-yellow-100 p-2 border rounded-lg text-yellow">
                      <strong>Feedback: </strong>
                      {item?.feedback}
                    </h2>
                    <h2 className="shadow-md text-sm bg-green-100 p-2 border rounded-lg text-green-700">
                      <strong>Correct Answer: </strong>
                      {item?.correctAns}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button className="mt-5" onClick={() => router.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}

export default Feedback;
