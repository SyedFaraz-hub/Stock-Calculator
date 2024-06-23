// Budget Buying Power

const buyingPower = 50000;
const buyPrice = 4.13;

const unit = parseInt(`1${"0".repeat(buyingPower.toString().length - 1)}`);

// Results

const purchasableShares = Math.floor(buyingPower / buyPrice);
const finalTotalAmountToBuy = purchasableShares * buyPrice;

//calculation
const calculate = () => {
  const buyingPower = parseFloat(document.getElementById("BuyingPower").value);
  const buyPrice = parseFloat(document.getElementById("BuyPrice").value);

  const error = document.getElementById("error");

  if (buyingPower && buyPrice) {
    error.innerHTML = "";

    // Results
    const unit = parseInt(`1${"0".repeat(buyingPower.toString().length - 1)}`);
    const purchasableShares = Math.floor(buyingPower / buyPrice);
    const finalTotalAmountToBuy = purchasableShares * buyPrice;

    const unitDoc = document.getElementById("unit");
    const purchasableSharesDoc = document.getElementById("purchasableShares");
    const finalTotalAmountToBuyDoc = document.getElementById(
      "finalTotalAmountToBuy"
    );

    // unitDoc.innerText = `${unit.toFixed(2)}`;
    purchasableSharesDoc.innerText = `${purchasableShares.toFixed(0)}`;
    finalTotalAmountToBuyDoc.innerText = `$${finalTotalAmountToBuy.toFixed(2)}`;

    //chart

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: ["Purchasable Shares", "Total Amount To Buy"],
        datasets: [
          {
            backgroundColor: "#3051a0",
            data: [purchasableShares, finalTotalAmountToBuy],
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
