const mongoose = require("mongoose");

const FormDataDSchema = new mongoose.Schema({
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
  sbudRxWithoutBasketAndNewProductRx: { type: Number, required: true },
  totalRxs: { type: Number, required: true },


  // ================= Order Section =================
  sbudOrderRouteName: { type: String, required: true },
  noOfPartySbudOrderRoute: { type: Number, required: true },
  noOfCollectedOrderSbud: { type: Number, required: true },
  noOfNotGivingOrderParty: { type: Number, required: true },
  causeOfNotGivingOrder: { type: String, required: true },
  marketTotalOrder: { type: Number, required: true },

  // ================= Strategic Basket Orders =================
  fexoOrder: { type: Number, required: true },
  moxaclavOrder: { type: Number, required: true },
  monteneOrder: { type: Number, required: true },
  deflacortOrder: { type: Number, required: true },
  glympaOrder: { type: Number, required: true },

  // ================= Focus Basket Orders =================
  cometOrder: { type: Number, required: true },
  compridOrder: { type: Number, required: true },
  secrinOrder: { type: Number, required: true },
  ticametOrder: { type: Number, required: true },
  viglimetOrder: { type: Number, required: true },

  // ================= Emerging Basket Orders =================
  emjardOrder: { type: Number, required: true },
  emjardMOrder: { type: Number, required: true },
  bilistaOrder: { type: Number, required: true },
  liglimetOrder: { type: Number, required: true },
  zolivoxOrder: { type: Number, required: true },

  // ================= New Product Orders =================
  newProductOrder: { type: Number, required: true },

  // ================= Survey Section =================
  rxSendInDIDS: { type: Number, required: true },
  writtenRxInSurveyPad: { type: Number, required: true },
  indoorSurvey: { type: String, required: true },
});

module.exports = mongoose.model("FormDataD", FormDataDSchema);
