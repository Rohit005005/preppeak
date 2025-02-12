"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { Loader2 } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onsubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    const InputPrompt =
      "Job Position: " +
      jobPosition +
      ", Job Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ", Depending on Job Position, Job Description & Years of Experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      ` interview questions along with Answer in JSON format,Give us question and answer field on JSON and no extra field or info.
      ---EXAMPLE---
      [  {    "question": "Describe your experience with HTML and how you use it to structure web pages.",    "answer": "I have experience with HTML for a year and I utilize it to create the fundamental structure of web pages by using elements like headings, paragraphs, lists, and tables. I understand the importance of semantic HTML for accessibility and search engine optimization."  },  {    "question": "How do you use Tailwind CSS to style web pages? Can you provide an example of a common Tailwind utility class and its purpose?",    "answer": "I utilize Tailwind CSS for its utility-first approach, allowing me to quickly apply styles using classes like 'bg-blue-500' for a blue background. I'm familiar with its responsive design features and the customization options for creating unique styles."  },  {    "question": "Explain your understanding of JavaScript and how it interacts with HTML and CSS.",    "answer": "JavaScript enables dynamic behavior and user interaction on web pages. I use it to add event listeners, manipulate the DOM (Document Object Model) to change HTML content or styles, and interact with the browser's API."  },  {    "question": "Describe a project where you had to solve a challenging web development problem. What steps did you take to overcome it?",    "answer": "In a recent project, I encountered an issue with responsive image loading. I researched different solutions, including using the 'srcset' attribute with various image sizes and utilizing JavaScript to dynamically adjust images based on screen size. I learned about the importance of optimizing images for different devices."  },  {    "question": "What are some current trends or technologies in web development that you are interested in learning more about?",    "answer": "I am interested in exploring frameworks like React or Vue.js to build more complex and interactive web applications. I am also keen on learning about progressive web apps (PWAs) and their potential for creating engaging and accessible experiences."  }]
      `;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted id:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("Error while inserting !!!!");
    }

    setLoading(false);
  };
  return (
    <div>
      <div
        className="p-10 border rounded-lg shadow-sm bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        <h2 className="text-lg  text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-black">
              Tell us more about the Job you are interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onsubmit}>
                <div>
                  <h3>
                    Add details about job position, your skills and year of
                    experience
                  </h3>
                  <div className="mt-7 my-5">
                    <label>Job position</label>
                    <Input
                      placeholder="Ex: Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label>Job description/ Tech Stack</label>
                    <Textarea
                      placeholder="Ex: React, Next, Node, MongoDB etc"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-5">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex: 5"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-5">
                  <Button
                    type="button"
                    className="border"
                    variant="ghost"
                    onClick={() => {
                      setOpenDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" /> Generating
                        Questions
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
