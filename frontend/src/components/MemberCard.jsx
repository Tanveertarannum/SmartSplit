function MemberCard({ member }) {
  return (
    <div className="expense-card">

      <h3>👤 {member.name}</h3>

      <p>
        Paid: ₹{member.paid}
      </p>

      <p>
        Owes: ₹{member.owes}
      </p>

      <p>
        Balance: ₹{member.balance}
      </p>

    </div>
  );
}

export default MemberCard;