export const itineraryJsonSchema = {
  type: "object",
  required: ["destination", "duration_days", "days", "map_pins"],
  properties: {
    destination: { type: "string" },
    duration_days: { type: "integer", minimum: 1, maximum: 30 },
    budget_tier: { enum: ["budget", "moderate", "luxury"] },
    days: {
      type: "array",
      items: {
        type: "object",
        required: ["day_number", "date", "activities"],
        properties: {
          day_number: { type: "integer" },
          date: { type: "string", format: "date" },
          title: { type: "string" },
          area: { type: "string" },
          activities: {
            type: "array",
            minItems: 3,
            maxItems: 3,
            items: {
              type: "object",
              required: ["period", "title", "description", "transit_minutes"],
              properties: {
                period: { enum: ["morning", "afternoon", "evening"] },
                title: { type: "string" },
                description: { type: "string" },
                category: { type: "string" },
                transit_minutes: { type: "integer", minimum: 0 },
                latitude: { type: "number" },
                longitude: { type: "number" },
              },
            },
          },
        },
      },
    },
    map_pins: {
      type: "array",
      items: { type: "object", required: ["label", "latitude", "longitude"] },
    },
  },
} as const;

export const agentStages = [
  "Analyzing travel vibe",
  "Optimizing geographical route clusters",
  "Selecting cuisine gems",
  "Formatting itinerary",
] as const;
