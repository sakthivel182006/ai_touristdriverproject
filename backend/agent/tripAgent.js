import { getState, setState } from "./state.js";

export function updateTrip(input) {
  const prev = getState();

  const changes = detectChanges(prev, input);

  const currentState = {
    ...(prev || {}),
    ...input
  };

  const plans = generatePlans(currentState);
  const bestPlan = chooseBestPlan(plans, currentState.budget);

  currentState.stay = bestPlan.stay;
  currentState.activities = bestPlan.activities;

  setState(currentState);

  return {
    prev,
    current: currentState,
    decision: {
      changesDetected: changes,
      selectedPlan: bestPlan
    }
  };
}

/* ---------- helper functions ---------- */

function detectChanges(prev, input) {
  if (!prev) return ["initial"];

  const changes = [];
  if (input.budget && input.budget !== prev.budget) changes.push("budget");
  if (input.days && input.days !== prev.days) changes.push("days");
  return changes;
}

function generatePlans(state) {
  return [
    {
      stay: "Hotel",
      activities: ["Beach", "Sightseeing"],
      cost: 15000,
      experience: 8
    },
    {
      stay: "Hostel",
      activities: ["Beach"],
      cost: 12000,
      experience: 6
    }
  ];
}

function scorePlan(plan, budget) {
  let score = 0;
  if (plan.cost <= budget) score += 5;
  score += plan.experience;
  return score;
}

function chooseBestPlan(plans, budget) {
  return plans.reduce((best, plan) =>
    scorePlan(plan, budget) > scorePlan(best, budget) ? plan : best
  );
}
