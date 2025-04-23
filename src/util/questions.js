// List of questions to be used in rendering question components

export const questionsList = [
    {
      id: 0,
      prompt: "1. Which campus would you like to study at? ", 
      choices: ["central", "north", "doesn't matter"], 
      description: ["", ""], 
      key: "region"
    }, 

    {
      id: 1,
      prompt: "2. How quiet would you like the study space to be? ", 
      choices: [1, 2, 3], 
      description: ["collaborative", "quiet"],
      key: "quietness"
    }, 

    {
      id: 2,
      prompt: "3. How much lighting would you like the study space to be? ", 
      choices: [1, 2, 3], 
      description: ["dim", "bright"], 
      key: "lighting"
    }, 
  ]