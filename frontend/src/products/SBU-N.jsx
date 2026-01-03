// SBUN.jsx
import React from "react";

const SBUN = ({ FormDataN, handleChange, disabled }) => {
  const inputClasses =
    "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500";

  // Helper functions to restrict input
  const allowOnlyNumbers = (e) => {
    if (!/^[0-9]+$/.test(e.data)) e.preventDefault();
  };

  const allowOnlyText = (e) => {
    if (/[0-9]/.test(e.data)) e.preventDefault();
  };

  // Handle Enter key to move to next input
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Don't move to next field if current field is empty
      if (!e.target.value.trim()) {
        return;
      }
      const form = e.target.form;
      const inputs = Array.from(form.querySelectorAll("input"));
      const currentIndex = inputs.indexOf(e.target);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    }
  };

  const sections = [
    // ================= Forecast Section =================
    {
      title: "Forecast Section",
      subtitle: "(Send Today's Forecast)",
      colorClass: "border-blue-500 bg-blue-50",
      fields: [
        { name: "salesForecast", label: "Sales Forecast" },
        { name: "strategicRxForecast", label: "Strategic Rx Forecast" },
        { name: "focusRxForecast", label: "Focus Rx Forecast" },
        { name: "emergingRxForecast", label: "Emerging Rx Forecast" },
        { name: "newProductRxForecast", label: "New Product Rx Forecast" },
        { name: "opdRxForecast", label: "OPD Rx Forecast" },
        { name: "gpRxForecast", label: "GP Rx Forecast" },
        { name: "dischargeRxForecast", label: "Discharge Rx Forecast" },
        { name: "totalRxForecast", label: "Total Rx Forecast", readOnly: true },
      ],
    },

    // ================= Rx Section =================
    {
      title: "Rx Section",
      subtitle: "(Send actual Rx of Yesterday)",
      colorClass: "border-green-500 bg-green-50",
      fields: [
        { name: "totalStrategicBasketRx", label: "Total Strategic Basket Rx" },
        { name: "totalFocusBasketRx", label: "Total Focus Basket Rx" },
        { name: "totalEmergingBasketRx", label: "Total Emerging Basket Rx" },
        { name: "totalNewProductRx", label: "Total New Product Rx" },
        {
          name: "totalBasketAndNewProductRx",
          label: "Total Basket And New Product Rx",
          readOnly: true,
        },
        { name: "opdRx", label: "OPD Rx" },
        { name: "dischargeRx", label: "Discharge Rx" },
        { name: "gpRx", label: "GP Rx" },
        {
          name: "sbunRxWithoutBasketAndNewProductRx",
          label: "SBU-N Rx Without Basket And New Product Rx",
          readOnly: true,
        },
        { name: "totalRxs", label: "Total Rxs", readOnly: true },
      ],
    },

    // ================= Order Section =================
    {
      title: "Order Section",
      subtitle: "(Send Collected Order Information)",
      colorClass: "border-yellow-500 bg-yellow-50",
      fields: [
        {
          name: "sbunOrderRouteName",
          label: "SBU N Order Route Name",
          type: "text",
        },
        {
          name: "noOfPartySbunOrderRoute",
          label: "No Of Party SBU N Order Route",
        },
        {
          name: "noOfCollectedOrderSbun",
          label: "No Of Collected Order SBU N",
        },
        {
          name: "noOfNotGivingOrderParty",
          label: "No Of Not Giving Order Party",
          readOnly: true,
        },
        {
          name: "causeOfNotGivingOrder",
          label: "Cause Of Not Giving Order",
          type: "text",
        },
        { name: "marketTotalOrder", label: "Market Total Order" },
      ],
    },

    // ================= Strategic Basket Orders =================
    {
      title: "Strategic Basket Orders",
      subtitle: "",
      colorClass: "border-indigo-500 bg-indigo-50",
      fields: [
        { name: "entacydPlusOrder", label: "Entacyd Plus Order" },
        { name: "probioOrder", label: "Probio Order" },
        { name: "flemoOrder", label: "Flemo Order" },
        { name: "resQOrder", label: "ResQ Order" },
      ],
    },

    // ================= Focus Basket Orders =================
    {
      title: "Focus Basket Orders",
      subtitle: "",
      colorClass: "border-pink-500 bg-pink-50",
      fields: [
        { name: "ceevitOrder", label: "Ceevit Order" },
        { name: "alatrolOrder", label: "Alatrol Order" },
        { name: "adovasOrder", label: "Adovas Order" },
      ],
    },

    // ================= Emerging Basket Orders =================
    {
      title: "Emerging Basket Orders",
      subtitle: "",
      colorClass: "border-teal-500 bg-teal-50",
      fields: [
        { name: "gilobaOrder", label: "Giloba Order" },
        { name: "trumegaOrder", label: "Trumega Order" },
        { name: "maximilkOrder", label: "Maximilk Order" },
        { name: "biopremOrder", label: "Bioprem Order" },
      ],
    },

    // ================= New Product Orders =================
    {
      title: "New Product Orders",
      subtitle: "",
      colorClass: "border-orange-500 bg-orange-50",
      fields: [{ name: "newProductOrder", label: "New Product Order" }],
    },

    // ================= Survey Section =================
    {
      title: "Survey Section",
      subtitle: "(Send your Survey Status)",
      colorClass: "border-purple-500 bg-purple-50",
      fields: [
        { name: "rxSendInDIDS", label: "Rx Send In DIDS" },
        { name: "writtenRxInSurveyPad", label: "Written Rx In Survey Pad" },
        { name: "indoorSurvey", label: "Indoor Survey", type: "text" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div
          key={section.title}
          className={`p-4 border-l-4 rounded ${section.colorClass}`}
        >
          <h2 className="text-lg font-bold">{section.title}</h2>
          {section.subtitle && (
            <p className="text-base font-semibold text-red-600">
              {section.subtitle}
            </p>
          )}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.name}>
                <label className="block mb-1 text-sm font-semibold">
                  {field.label}:
                </label>
                <input
                  type={field.type || "number"}
                  name={field.name}
                  value={FormDataN[field.name] ?? ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  className={`${inputClasses} ${
                    field.readOnly ? "bg-gray-100" : ""
                  }`}
                  disabled={disabled}
                  readOnly={field.readOnly}
                  onBeforeInput={
                    field.type === "text" ? allowOnlyText : allowOnlyNumbers
                  }
                  onKeyDown={handleEnterKey}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SBUN;
