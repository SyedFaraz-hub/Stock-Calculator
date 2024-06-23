// Average Stock Calculator
const noOfStockTableData = () => {
  const newTableData = document.createElement("td");
  const newLabel = document.createElement("label");
  newLabel.innerHTML = "Shares";

  const inputDiv = document.createElement("div");
  inputDiv.className = "input-div";

  const newInput = document.createElement("input");
  newInput.type = "number";
  newInput.className = "newSharesCount";
  newInput.classList.add("pressEnter");

  const icon = document.createElement("img");
  icon.src = "../assets/images/stock-dark-grey.png";
  icon.className = "icon";

  inputDiv.appendChild(icon);
  inputDiv.appendChild(newInput);
  newTableData.appendChild(newLabel);
  newTableData.appendChild(inputDiv);

  return newTableData;
};

const costOfStockTableData = () => {
  const newTableData = document.createElement("td");
  const newLabel = document.createElement("label");
  newLabel.innerHTML = "Price";

  const inputDiv = document.createElement("div");
  inputDiv.className = "input-div";

  const newInput = document.createElement("input");
  newInput.type = "number";
  newInput.className = "newSharesCost";
  newInput.classList.add("pressEnter");

  const icon = document.createElement("img");
  icon.src = "../assets/images/dollar-filled-grey.png";
  icon.className = "icon";
  icon.classList.add("dollar");

  inputDiv.appendChild(icon);
  inputDiv.appendChild(newInput);
  newTableData.appendChild(newLabel);
  newTableData.appendChild(inputDiv);

  return newTableData;
};

let count = 0;

const addField = () => {
  // const table = document.getElementsByTagName("tbody")[0];
  const table = document.getElementById("input-table-body");
  let newRow = document.createElement("tr");
  table.appendChild(newRow);
  newRow.style.borderTop = "none";

  newRow.appendChild(noOfStockTableData());
  newRow.appendChild(costOfStockTableData());

  newRow.style.position = "relative";
  const crossButton = document.createElement("img");
  crossButton.src = "../assets/images/cross.png";
  crossButton.style.height = "18px";
  crossButton.style.width = "18px";
  crossButton.style.position = "absolute";
  crossButton.style.right = "0";
  crossButton.style.top = "5px";
  crossButton.style.cursor = "pointer";
  crossButton.addEventListener("click", () => {
    console.log("Clicked");
    table.removeChild(newRow);
  });

  newRow.appendChild(crossButton);
  table.scrollTop = table.scrollHeight;

  count++;
};

const createNewShares = (shares, cost) => {
  return {
    noOfSharesPurchased: shares,
    costOfEachSharePurchased: cost,
  };
};

const calculate = () => {
  const oldTotalPurchasedShares = parseFloat(
    document.getElementById("oldShares").value
  );
  const oldEachShareCost = parseFloat(
    document.getElementById("oldSharesCost").value
  );
  let newPurchasedShares = [];
  const sharesCostInputs = Array.prototype.slice.call(
    document.getElementsByClassName("newSharesCost")
  );
  const noOfSharesInputs = Array.prototype.slice.call(
    document.getElementsByClassName("newSharesCount")
  );
  let countOfNewPurchasedShares = 0;
  const averagePriceh4 = document.getElementById("averagePrice");
  const totalStocksh4 = document.getElementById("totalStocks");
  const totalAmounth4 = document.getElementById("totalAmount");
  const error = document.getElementById("error");

  sharesCostInputs.forEach((item, idx) => {
    let noOfShares = Boolean(noOfSharesInputs[idx].value.length)
      ? parseFloat(noOfSharesInputs[idx].value)
      : 0;
    let costOfShares = Boolean(item.value.length) ? parseFloat(item.value) : 0;
    newPurchasedShares.push(createNewShares(noOfShares, costOfShares));
  });

  newPurchasedShares.forEach((data) => {
    if (data.noOfSharesPurchased <= 0.0) {
      error.innerHTML = "Please fill all the fields first!";
      console.log("Passing throw");
      return;
    } else if (data.costOfEachSharePurchased <= 0.0) {
      error.innerHTML = "Please fill all the fields first!";
      console.log("Passing throw");
      return;
    } else {
      error.innerHTML = "";
      countOfNewPurchasedShares++;

      const existingPurchaseTotal = oldTotalPurchasedShares * oldEachShareCost;

      const newPurchaseTotal = newPurchasedShares
        .map((item) => item.noOfSharesPurchased * item.costOfEachSharePurchased)
        .reduce((partialSum, newValue) => partialSum + newValue, 0);

      const totalNoOfShares =
        oldTotalPurchasedShares +
        newPurchasedShares
          .map((item) => item.noOfSharesPurchased)
          .reduce((partialSum, newValue) => partialSum + newValue, 0);

      const totalCostOfShares =
        oldEachShareCost +
        newPurchasedShares
          .map((item) => item.costOfEachSharePurchased)
          .reduce((partialSum, newValue) => partialSum + newValue, 0);

      const averageCostPerShare =
        (oldEachShareCost +
          newPurchasedShares
            .map((item) => item.costOfEachSharePurchased)
            .reduce((partialSum, newValue) => partialSum + newValue, 0)) /
        (countOfNewPurchasedShares + 1);

      const differenceinOldAndNewPrice =
        oldEachShareCost -
        newPurchasedShares
          .map((item) => item.costOfEachSharePurchased)
          .reduce((partialSum, newValue) => partialSum + newValue, 0);

      const differenceinOldAndAveragePrice =
        oldEachShareCost - averageCostPerShare;

      const differenceinPercent =
        (differenceinOldAndAveragePrice / oldEachShareCost) * 100 - 100;

      const costOfAllShares =
        existingPurchaseTotal +
        newPurchasedShares
          .map(
            (item) => item.noOfSharesPurchased * item.costOfEachSharePurchased
          )
          .reduce((partialSum, newValue) => partialSum + newValue, 0);

      averagePriceh4.innerHTML = `\$${averageCostPerShare.toFixed(2)}`;
      totalStocksh4.innerHTML = totalNoOfShares.toFixed(2);
      totalAmounth4.innerHTML = `\$${costOfAllShares.toFixed(2)}`;

      var xValues = [];
      var yValues = [
        existingPurchaseTotal,
        ...newPurchasedShares
          .map(
            (item) => item.costOfEachSharePurchased * item.noOfSharesPurchased
          )
          .filter((value) => value !== 0),
      ];
      var barColors = [];

      for (var i = 1; i <= countOfNewPurchasedShares + 1; i++) {
        xValues.push(`Purchase ${i}`);
        barColors.push("#3051a0");
      }

      new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              backgroundColor: barColors,
              data: yValues,
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
    }
  });
  console.log(error);
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
