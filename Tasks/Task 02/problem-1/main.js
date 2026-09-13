// Project 1: Online Store Order Processing System
function processOrders(orders) {
  let totalRevenue = 0;
  let successfulOrders = 0;
  let skippedInRow = 0;
  let stockFailures = 0;
  let stopMessage = null;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const isSkipped =
      order.status === "cancelled" ||
      order.status === "invalid" ||
      order.stockAvailable === false;

    if (isSkipped) {
      skippedInRow += 1;

      if (order.stockAvailable === false) {
        stockFailures += 1;
      }

      if (skippedInRow >= 3 || stockFailures >= 3) {
        stopMessage = "System stopped due to critical failure";
        return {
          totalRevenue: totalRevenue,
          successfulOrders: successfulOrders,
          processedOrdersCount: successfulOrders,
          stopMessage: stopMessage,
        };
      }

      continue;
    }

    if (order.status === "valid" && order.stockAvailable === true) {
      totalRevenue += order.amount;
      successfulOrders += 1;
      skippedInRow = 0;
    }
  }

  return {
    totalRevenue: totalRevenue,
    successfulOrders: successfulOrders,
    processedOrdersCount: successfulOrders,
    stopMessage: stopMessage,
  };
}

const orders = [
  { id: 1, status: "valid", stockAvailable: true, amount: 200 },
  { id: 2, status: "valid", stockAvailable: true, amount: 150 },
  { id: 3, status: "cancelled", stockAvailable: true, amount: 100 },
  { id: 4, status: "valid", stockAvailable: false, amount: 300 },
  { id: 5, status: "valid", stockAvailable: true, amount: 250 },
  { id: 6, status: "invalid", stockAvailable: true, amount: 120 },
  { id: 7, status: "valid", stockAvailable: true, amount: 180 },
];

console.log("Order processing result:");
console.log(processOrders(orders));
