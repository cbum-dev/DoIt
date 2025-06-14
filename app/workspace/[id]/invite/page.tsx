"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function InvitePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user,access_token } = useAuthStore();
  const [error, setError] = useState("");

  useEffect(() => {
    const joinWorkspace = async () => {
      if (!user) {
        setError("You must be logged in to join a workspace.");
        return;
      }

      const response = await fetch(`https://json-schema-lint.vercel.app/api/workspace/${id}/add-member`, {
        method: "PUT",
        body: JSON.stringify({ workspaceId: id, memberId: user.id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        router.push(`/workspace/${id}`);
      } else {
        setError("Error joining workspace. Try again.");
      }
    };

    joinWorkspace();
  }, [id, user, router, access_token]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {error ? <p className="text-red-500">{error}</p> : <p>Joining workspace...</p>}
    </div>
  );
}
