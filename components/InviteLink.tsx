"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InviteLinkProps {
  workspaceId: string;
}

export default function InviteLink({ workspaceId }: InviteLinkProps) {
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    setInviteLink(`${window.location.origin}/workspace/${workspaceId}/invite`);
  }, [workspaceId]);

  return (
    <div className="flex space-x-2">
      <Input readOnly value={inviteLink} />
      <Button onClick={() => navigator.clipboard.writeText(inviteLink)}>Copy</Button>
    </div>
  );
}
