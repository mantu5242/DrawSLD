export const EDGE_TYPES = {
  PIPE: {
    directional: true,
    connects: [
      "QPS",
      "PRS",
      "VALVE",
      "ESDV",
      "BRANCH",
      "SENSOR",
      "ODORIZATION",
      "PIG",
      "CONSUMER"
    ],
    dataSchema: {
      diameter_mm: "number",
      material: "string",
      pressure_rating: "number"
    }
  }
};
