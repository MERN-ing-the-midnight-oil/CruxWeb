# CRUX 2.0 - Game Development

Welcome to the GitHub repository for CRUX 2.0, an evolution of the original [CRUX](https://mern-ing-the-midnight-oil.github.io/crux/) crossword puzzle game. This version introduces improvements to the game level structure, display, and UX.

## Evolution of Level Design

### Original Grid Design

In the original CRUX, I defined levels with a somewhat needlessly complex system of word start and word end coordinates combined with word intersection (clue) coordinates. While this method worked, it made it time consuming to create levels.
![Old Grid Example](public/images/readme%20images/oldGridDefinition.png "Example of Old Grid")

### Simplifying to Array-Based Levels

The development of CRUX 2.0 brought an "ah-ha" moment when I realized that my entire cell array could just be... well... an array.

This transition is encapsulated in the transition from the old to the new grid definition, dramatically simplifying the level design process.

![New Grid Definition](public/images/readme%20images/newGridDefinition.png "Illustration of the New Grid Definition")

### Development of the Visual Grid

But it was still hard to code a game level! I was really hoping that ChatGPT4 or one of the AI chatbots explicitly claiming to be good at crossword puzzles could help. But they were able only to produce gibberish when I would ask them to, for example, make a simple grid with two words intersecting at their common letter. So here is what I came up with- the uncreatively named "Visual Grid"!

![Visual Grid Example](public/images/readme%20images/visualGrid.png "Example of Visual Grid")

- **Empty Cells (`"##"`)**: Represent areas with no interaction.
- **Clue Cells (`"01"`, `"02"`, etc.)**: Contain identifiers linking to clues.
- **Letter Cells (`"A_"`, `"B_"`, etc.)**: Represent letters filled in by players.
- **Check out my regex magic in the .vscode setting.json!**

## Understanding GameBoard.js

The `GameBoard` component uses several React hooks to manage the game's dynamic aspects.

### React Hooks Utilized in GameBoard

#### useState

`useState` is a hook that lets you add React state to function components. In `GameBoard`, I use `useState` to manage:

- `currentLevel`: Tracks the currently active game level.
- `guesses`: Stores the players' input for each cell.
- `showClueModal`: Controls the visibility of the modal that displays clues.
- `currentClueUrl`: Holds the URL for the currently displayed clue image.

These states allow the game to remember specific aspects of the game's progress and UI state across re-renders.

#### useRef

`useRef` is used to directly create a reference to DOM elements and persist values across renders without causing additional renders when the data changes. In the component:

- `modalRef`: Provides a direct way to manipulate the DOM for the clue modal, particularly useful for focus management and accessibility.
- `inputRefs`: Maps input elements for each cell, enabling direct manipulation for focus management, particularly during navigation across the crossword puzzle.

#### useEffect

`useEffect` lets you perform side effects in function components. It's used in `GameBoard` for:

- **Loading and Saving Guesses**: Automatically load guesses from local storage when the level changes and save them whenever guesses are updated. This ensures that player progress is preserved.
- **Persistence**: The use of local storage allows the game state to persist between sessions, improving user experience by allowing players to pick up where they left off.

## License

This project and all its content are proprietary and protected under intellectual property laws. Use of the game or its code without explicit permission is strictly prohibited.

For any inquiries regarding licensing or use rights, please contact me directly.

Feel free to reach out if you have any questions or just want to chat about the project. Happy puzzling!
