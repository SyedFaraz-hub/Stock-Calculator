//Stock Trading Calculator

const calculate = () => {
  const oldTotalPurchasedShares = parseFloat(
    document.getElementById("oldShares").value
  );
  const oldEachShareCost = parseFloat(
    document.getElementById("oldSharesCost").value
  );
  const oldSharesNewSellingPrice = parseFloat(
    document.getElementById("newSharesCost").value
  );
  const error = document.getElementById("error");

  if (oldTotalPurchasedShares && oldEachShareCost && oldSharesNewSellingPrice) {
    error.innerHTML = "";

    const oldSharesTotalCost = oldTotalPurchasedShares * oldEachShareCost;
    const costOfSharesAtNewPrice =
      oldTotalPurchasedShares * oldSharesNewSellingPrice;

    //profit calculation
    const Profit = costOfSharesAtNewPrice - oldSharesTotalCost;

    //returnOnInvesment calculation
    const returnOnInvesment =
      (costOfSharesAtNewPrice / oldSharesTotalCost) * 100 - 100;

    const netBuyPrice = document.getElementById("netBuyPrice");
    const netSellPrice = document.getElementById("netSellPrice");
    const profitDoc = document.getElementById("Profit");
    const returnOnInvestmentDoc = document.getElementById("returnOnInvestment");

    netBuyPrice.innerText = `$${oldSharesTotalCost.toFixed(2)}`;
    netSellPrice.innerText = `$${costOfSharesAtNewPrice.toFixed(2)}`;
    profitDoc.innerText = `$${Profit.toFixed(2)}`;
    returnOnInvestmentDoc.innerText = `${returnOnInvesment.toFixed(2)}%`;

    //chart

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: ["Buy", "Sell", "Profit"],
        datasets: [
          {
            backgroundColor: "#3051a0",
            data: [oldSharesTotalCost, costOfSharesAtNewPrice, Profit],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Stats of your purchase",
        },
        events: ["click"],
      },
    });
  } else {
    error.innerHTML = "Please fill all the fields first!";
  }
};

//scroll page down
function scrollWin(x, y) {
  window.scrollBy(x, y);
}

//run on page load
window.onload = function () {
  calculate();
};

//Press Enter
document.querySelectorAll(".pressEnter").forEach((item) => {
  item.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      //checks whether the pressed key is "Enter"
      calculate();
      scrollWin(0, 350);
    }
  });
});
