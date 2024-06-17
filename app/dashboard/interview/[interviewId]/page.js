"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [permit, setPermit] = useState(false);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col mt-5 ">
          <div className="shadow-md flex flex-col border p-5 rounded-lg gap-5">
            <h2 className="text-lg">
              <strong>Job Position/Role: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="shadow-md mt-4 border p-4 rounded-lg bg-yellow-100">
            <h2 className="flex gap-2 mb-2 text-yellow-400">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="text-sm text-yellow-500">
              Enable Web Cam and Microphone to start Interview, it will have
              some questions that u have to answer and at last you will get the
              report on the basis of your answers. NOTE: We never record your
              video, you can disable Web Cam if u want.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="my-5 h-72 w-full p-20 bg-secondary rounded-lg border shadow-md" />
              <Button
                variant="outline"
                className="shadow-md w-full border-primary hover:text-white hover:bg-primary"
                onClick={() => {
                  setWebCamEnabled(true);
                  setPermit(true);
                }}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
          <div className="flex justify-start ">
        <Link href={"/dashboard/interview/"+params.interviewId+"/start"}>
          <Button
            disabled={permit ? false : true}
            className="mt-4 md:mt-4 lg:mt-4"
          >
            Start Interview
          </Button>
        </Link>
      </div>
        </div>
      </div>
      
    </div>
  );
}

export default Interview;
