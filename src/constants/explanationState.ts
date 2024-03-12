import GameState from "../models/gameState";

export const explanationData = {
  [GameState.Config]: {
    title: 'Update Settings',
    steps: [
      "- Get more control by changing propreties down bellow",
      "- After any changes, rebuild the terrain with the 'Build Terrain' button",
      "- Ignite green tiles by clicking on them, click again to remove or use the 'Ignite' button",
      "- Perfect ! Let's run the simulation now by clicking the 'Start' button"
    ]
  },
  [GameState.Running]: {
    title: 'Simulation is Running...',
    steps: [
      "- The simulation is now running",
      "- Keep clicking to run the next step"
    ]
  },
  [GameState.End]: {
    title: 'Simulation Completed',
    steps: [
      "- The simulation has ended",
      "- Get more detail by checking the simulation stats down the terrain",
      "- To reset the simulation, just rebuild it with the 'Build Terrain' button"
    ]
  }
}

export default explanationData
