function settlementCalculator(expenses) {

  const balances = {};

  expenses.forEach((expense) => {

    const share =
      expense.amount /
      expense.members;

    if (!balances[expense.paidBy]) {
      balances[expense.paidBy] = 0;
    }

    balances[expense.paidBy] += expense.amount;

    balances[expense.paidBy] -= share;
  });

  return balances;
}

export default settlementCalculator;