import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  return (
    <div className="border p-3 rounded-lg shadow-md">
      <h2 className="text-primary font-bold capitalize">
        {interview?.jobPosition}
      </h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-500">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between mt-3 gap-20">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() =>
            router.push(
              "/dashboard/interview/" + interview?.mockId + "/feedback"
            )
          }
        >
          Feedback
        </Button>

        <Button
          size="sm"
          className="w-full"
          onClick={() =>
            router.push("/dashboard/interview/" + interview?.mockId)
          }
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
