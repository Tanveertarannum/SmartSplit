import { useState } from "react";

function CreateGroupModal({
  closeModal,
  addGroup,
}) {

  const [name, setName] =
    useState("");

  const [budget, setBudget] =
    useState("");

  const [member, setMember] =
    useState("");

  const [members, setMembers] =
    useState([]);

  const addMember = () => {

    if (
      member.trim() !== ""
    ) {

      setMembers([
        ...members,
        member,
      ]);

      setMember("");
    }
  };

  const handleSubmit = () => {

    if (
      !name ||
      !budget ||
      members.length === 0
    ) {
      alert(
        "Fill all fields"
      );
      return;
    }

    addGroup({
      name,
      budget:
        Number(budget),
      members,
    });

    closeModal();
  };

  return (

    <div className="modal-overlay">

      <div className="modal glass">

        <h2>
          ✨ Create Group
        </h2>

        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) =>
            setBudget(
              e.target.value
            )
          }
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <input
            type="text"
            placeholder="Member Name"
            value={member}
            onChange={(e) =>
              setMember(
                e.target.value
              )
            }
          />

          <button
            className="btn"
            onClick={
              addMember
            }
          >
            Add
          </button>

        </div>

        <div
          style={{
            marginTop: "15px",
          }}
        >

          {members.map(
            (
              member,
              index
            ) => (

              <span
                key={index}
                className="member-chip"
              >
                {member}
              </span>

            )
          )}

        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >

          <button
            className="btn"
            onClick={
              handleSubmit
            }
          >
            Create
          </button>

          <button
            className="btn"
            onClick={
              closeModal
            }
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default CreateGroupModal;