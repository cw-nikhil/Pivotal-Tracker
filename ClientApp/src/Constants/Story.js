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
  {
    stateId: 4,
    state: "accepted",
  }
]

export const storyStateOb = {
  unstarted: 0,
  started: 1,
  finished: 2,
  deliverd: 3,
  accepted: 4,
};

export const storyType = {
    none: 0,
    feature: 1,
    chore: 2,
    bug: 3
};