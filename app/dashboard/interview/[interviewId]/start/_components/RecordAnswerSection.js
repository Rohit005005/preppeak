"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import Link from "next/link";

function RecordAnswerSection({
  mockQuestions,
  activeQuestionIndex,
  interviewData,
  setActiveQuestionIndex,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((results) =>
      setUserAnswer((prevAns) => prevAns + results?.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockQuestions[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      " Depending on the question and user answer for given interview question " +
      " please give us rating(from 5) for answer and provide feedback as area of improvement if any " +
      "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

    const result = await chatSession.sendMessage(feedbackPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(MockJsonResp);
    const JosnFeedbackResp = JSON.parse(MockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockQuestions[activeQuestionIndex]?.question,
      correctAns: mockQuestions[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JosnFeedbackResp?.feedback,
      rating: JosnFeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyy"),
    });

    if (resp) {
      toast("Answer recorded successfully !!!");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="md:my-10 lg:my-10">
      <div className="shadow-md flex flex-col justify-center items-center rounded-lg p-5 bg-gray-800 ">
        <Image src={"/cam.svg"} width={150} height={50} className="absolute" />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Button
          disabled={loading}
          className="shadow-md mt-5 mb-5 hover:bg-primary hover:text-white"
          variant="outline"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className="flex items-center justify-center gap-2 text-red-600">
              <StopCircle />
              Stop Recording
            </h2>
          ) : (
            "Record Answer"
          )}
        </Button>
        <div className="flex gap-5 justify-end mb-5 md:mb-0 lg:mb-0">
          {activeQuestionIndex > 0 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            >
              Previous Question
            </Button>
          )}
          {activeQuestionIndex != mockQuestions?.length - 1 && (
            <Button
              onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
            >
              Next Question
            </Button>
          )}
          {activeQuestionIndex == mockQuestions?.length - 1 && (
            <Link
              href={
                "/dashboard/interview/" + interviewData?.mockId + "/feedback"
              }
            >
              <Button>End Interview</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordAnswerSection;
