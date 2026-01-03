export const NODE_TYPES = {
  QPS: {
    label: "Quarter Pressure Station",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "qps",
    dataSchema: {
      pressure: "number"
    }
  },

  PRS: {
    label: "Pressure Regulating Station",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "prs",
    dataSchema: {
      pressure_in: "number",
      pressure_out: "number"
    }
  },

  VALVE: {
    label: "Valve",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "valve",
    dataSchema: {
      state: ["OPEN", "CLOSED"]
    }
  },

  ESDV: {
    label: "Emergency Shut Down Valve",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "esdv",
    dataSchema: {
      state: ["OPEN", "CLOSED"]
    }
  },

  BRANCH: {
    label: "Branch",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "branch",
    dataSchema: {}
  },

  SENSOR: {
    label: "Sensor",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "sensor",
    dataSchema: {
      value: "number",
      unit: "string"
    }
  },

  ODORIZATION: {
    label: "Odorization Unit",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "odor",
    dataSchema: {
      chemical: "string"
    }
  },

  PIG: {
    label: "PIG Launcher / Receiver",
    ports: {
        in: { max: 1 },
        out: { max: 1 }
    },
    icon: "pig",
    dataSchema: {}
  },

  CONSUMER: {
    label: "Consumer",
    ports: {
        in: { max: 1 },
        // out: { max: 1 }
    },
    icon: "consumer",
    dataSchema: {
      demand: "number"
    }
  }
};
