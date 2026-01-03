const mongoose = require("mongoose");

const FormDataESchema = new mongoose.Schema({
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
  sbueRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },


  // ================= Order Section =================
  sbueOrderRouteName: { type: String, required: true },
  noOfPartySbueOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbue: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  rosuvaOrder: { type: Number, required: true },
  camlosartOrder: { type: Number, required: true },
  iracetOrder: { type: Number, required: true },
  neumigOrder: { type: Number, required: true },
  methomolOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  angilockOrder: { type: Number, required: true },
  angilockPlusOrder: { type: Number, required: true },
  neurolinOrder: { type: Number, required: true },
  epitraOrder: { type: Number, required: true },
  anclogOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  nebitaOrder: { type: Number, required: true },
  telmilokOrder: { type: Number, required: true },
  camlotelOrder: { type: Number, required: true },
  minibetOrder: { type: Number, required: true },
  qtpOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataE", FormDataESchema);
