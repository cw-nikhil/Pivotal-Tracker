export const storyStates = [
  {
    stateId: 0,
    state: "unstarted",
    buttonText: "Start",
  },
  {
    stateId: 1,
    state: "started",
    buttonText: "Finish"
  },
  {
    stateId: 2,
    state: "finished",
    buttonText: "Deliver"
  },
  {
    stateId: 3,
    state: "deliverd",
    buttonText: "Accept"
  },
]

export const storyType = {
    none: 0,
    feature: 1,
    chore: 2,
    bug: 3
};