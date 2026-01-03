const mongoose = require("mongoose");

const FormDataBSchema = new mongoose.Schema({
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
  sbubRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },


  // ================= Order Section =================
  sbubOrderRouteName: { type: String, required: true },
  noOfPartySbubOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbub: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  nexumOrder: { type: Number, required: true },
  bactrocinOrder: { type: Number, required: true },
  voriOrder: { type: Number, required: true },
  lansoDOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  secloOrder: { type: Number, required: true },
  famotackOrder: { type: Number, required: true },
  motigutOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  dermasolNOrder: { type: Number, required: true },
  intimateOrder: { type: Number, required: true },
  vigorexOrder: { type: Number, required: true },
  aliceOrder: { type: Number, required: true },
  lulitopOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataB", FormDataBSchema);
