const mongoose = require("mongoose");

const FormDataNSchema = new mongoose.Schema({
  // ================= User Info =================
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // ================= Forecast Section =================
  salesForecast: { type: Number, required: true },
  strategicRxForecast: { type: Number, required: true },
  focusRxForecast: { type: Number, required: true },
  emergingRxForecast: { type: Number, required: true },
  newProductRxForecast: { type: Number, required: true },
  opdRxForecast: { type: Number, required: true },
  gpRxForecast: { type: Number, required: true },
  dischargeRxForecast: { type: Number, required: true },
  totalRxForecast: { type: Number, required: true },

  // ================= Rx Section =================
  totalStrategicBasketRx: { type: Number, required: true },
  totalFocusBasketRx: { type: Number, required: true },
  totalEmergingBasketRx: { type: Number, required: true },
  totalNewProductRx: { type: Number, required: true },
  totalBasketAndNewProductRx: { type: Number, required: true },

  opdRx: { type: Number, required: true },
  dischargeRx: { type: Number, required: true },
  gpRx: { type: Number, required: true },
  sbunRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },


  // ================= Order Section =================
  sbunOrderRouteName: { type: String, required: true },
  noOfPartySbunOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbun: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  entacydPlusOrder: { type: Number, required: true },
  probioOrder: { type: Number, required: true },
  flemoOrder: { type: Number, required: true },
  resQOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  ceevitOrder: { type: Number, required: true },
  alatrolOrder: { type: Number, required: true },
  adovasOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  gilobaOrder: { type: Number, required: true },
  trumegaOrder: { type: Number, required: true },
  maximilkOrder: { type: Number, required: true },
  biopremOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataN", FormDataNSchema);
