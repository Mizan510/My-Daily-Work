const mongoose = require("mongoose");

const FormDataCSchema = new mongoose.Schema({
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
  sbucRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },

  // ================= Order Section =================
  sbucOrderRouteName: { type: String, required: true },
  noOfPartySbucOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbuc: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  neuroBOrder: { type: Number, required: true },
  calboralDDXOrder: { type: Number, required: true },
  toraxOrder: { type: Number, required: true },
  aceAceplusOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  zimaxOrder: { type: Number, required: true },
  calboDOrder: { type: Number, required: true },
  anadolAnadolplusOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  safyronOrder: { type: Number, required: true },
  dBalanceOrder: { type: Number, required: true },
  tezoOrder: { type: Number, required: true },
  contilexContilexTSOrder: { type: Number, required: true },
  maxrinMaxrinDOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataC", FormDataCSchema);
