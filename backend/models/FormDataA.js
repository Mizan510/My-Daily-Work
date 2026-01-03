const mongoose = require("mongoose");

const FormDataASchema = new mongoose.Schema({
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
  sbuaRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },


  // ================= Order Section =================
  sbuaOrderRouteName: { type: String, required: true },
  noOfPartySbuaOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbua: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  cefotilPlusOrder: { type: Number, required: true },
  toryOrder: { type: Number, required: true },
  asyntaMaxOrder: { type: Number, required: true },
  filwelGoldOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  cef3Order: { type: Number, required: true },
  ceftronOrder: { type: Number, required: true },
  ambroxOrder: { type: Number, required: true },
  clofenacOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  flexiOrder: { type: Number, required: true },
  avasprayOrder: { type: Number, required: true },
  revocitOrder: { type: Number, required: true },
  norvisOrder: { type: Number, required: true },
  lornoOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataA", FormDataASchema);
