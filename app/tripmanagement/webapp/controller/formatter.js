// webapp/controller/formatter.js
sap.ui.define([], function () {
  "use strict";

  // internal helpers
  const _percent = (c, t) => {
    const C = Number(c) || 0;
    const T = Number(t) || 0;
    return T > 0 ? Math.round((C / T) * 100) : 0;
  };

  const _countBy = (items, want) => {
    const W = String(want).toUpperCase();
    return (Array.isArray(items) ? items : [])
      .filter(it => String(it.status).toUpperCase() === W).length;
  };

  return {
    // your original mapping (kept)
    statusStateFromText: function (sText) {
      switch (sText) {
        case "Created":                 return "None";
        case "Approved":                return "Success";
        case "Settled":                 return "Success";
        case "Sales Order Updated":     return "Information";
        case "Purchase Order Updated":  return "Information";
        case "Completed":               return "Success";
        case "Cancelled":               return "None";
        case "Draft":                   return "Warning";
        case "Settle Error":            return "Error";
        default:                        return "None";
      }
    },

    // Settle dialog: progress bar
    settlePercent: function (completed, total) {
      return _percent(completed, total);
    },
    settleDisplayValue: function (completed, total) {
      return `${completed || 0}/${total || 0} (${_percent(completed, total)}%)`;
    },
    settleProgressText: function (completed, total) {
      return `${completed || 0} of ${total || 0} • ${_percent(completed, total)}%`;
    },
    settleProgressState: function (completed, total, items) {
      const C = Number(completed) || 0;
      const T = Number(total) || 0;
      if (T === 0) return "None";
      if (C < T)   return "Information";
      const hasErr = (Array.isArray(items) ? items : [])
        .some(it => String(it.status).toUpperCase() === "ERROR");
      return hasErr ? "Error" : "Success";
    },

    // Settle dialog: row status
    statusState: function (s) {
      switch (String(s || "").toUpperCase()) {
        case "SUCCESS": return "Success";
        case "ERROR":   return "Error";
        default:        return "Information"; // PENDING / other
      }
    },
    statusIcon: function (s) {
      switch (String(s || "").toUpperCase()) {
        case "SUCCESS": return "sap-icon://accept";
        case "ERROR":   return "sap-icon://message-error";
        default:        return "sap-icon://pending";
      }
    },
    isError: function (s) {
      return String(s || "").toUpperCase() === "ERROR";
    },

    // Settle dialog: counters
    countPendingText: function (items) {
      return `${_countBy(items, "PENDING")} pending`;
    },
    countSuccessText: function (items) {
      return `${_countBy(items, "SUCCESS")} success`;
    },
    countErrorText: function (items) {
      return `${_countBy(items, "ERROR")} error`;
    }
  };
});
