import GameState from "../models/gameState";

export const explanationData = {
  [GameState.Config]: {
    title: 'Update Settings',
    steps: [
      '- Get more control by changing the propreties down bellow',
      '- Rebuild the terrain if you did change something',
      '- Follow your needs, no need to be shy !',
      '- Click the button to continue'
    ],
    delay: 2
  },
  [GameState.Fire]: {
    title: 'Add Fire on Tiles',
    steps: [
      "- Now it's time to add fire in the scene",
      '- Hover a tile to preview the fire',
      '- Click on it to apply the fire on it',
      '- Click the button to continue'
    ],
    delay: 1.7
  },
  [GameState.BeforeStart]: {
    title: 'Ready ?',
    steps: [
      '- Once all is done, click the start simulation button'
    ],
    delay: .4
  },
  [GameState.End]: {
    title: 'Simulation Completed',
    steps: [
      '- The simulation has ended',
      '- Get more detail by checking the simulation stats'
    ],
    delay: .8
  }
}

export default explanationData
