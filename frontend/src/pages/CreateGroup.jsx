import { useState } from "react";
import { createGroup } from "../services/api";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [members, setMembers] = useState("");

  const handleSubmit = async () => {
    const memberList = members.split(",").map(m => m.trim());

    await createGroup({
      name,
      members: memberList
    });

    alert("Group Created!");
  };

  return (
    <div className="create-group">
      <h2>Create Group</h2>

      <input
        placeholder="Group Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Members (comma separated)"
        onChange={(e) => setMembers(e.target.value)}
      />

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}