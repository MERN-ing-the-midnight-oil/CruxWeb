# Crux

Welcome to "Crux", designed and created by me, Rhys Smoker. It’s a twist on the traditional crossword puzzle- instead of textual clues, you get visual clues that pertain to more than one word (this might remind you a bit of the game "Dixit"). Colored areas around the word cells are clickable links to the clues that pertain to the words they are touching.

## Design

### State Management

The game leverages several key pieces of state:

- **Guesses**: This state tracks user inputs across the grid. Each cell's content is managed via a state object, where the keys correspond to cell positions and the values to what the user has typed in.
- **Current Level**: I use a state to switch between different puzzles (`level1`, `level2`, etc.), with each level defined in separate files. This state influences the grid's dynamic rendering based on the selected level.
- **Selected Clues**: When a user interacts with the magnifying glass icon, this state updates to reflect the clues associated with that particular intersection, which are then displayed in a clue area.

### Design Patterns

The app is structured around modern React functional components using hooks for state and effect management, ensuring components are both reusable and modular. Here’s how some key design patterns are employed:

- **Componentization**: The game board, each grid cell, and the clue display area are separate components, which simplifies the state management and makes the code more maintainable.
- **Conditional Rendering**: This is used extensively to show or hide elements based on the game's state, such as displaying clues or indicating correct guesses.
- **Effect Hook**: React's `useEffect` is crucial for initializing the game based on the level data and responding to level changes, ensuring that all components reflect the current game state.

This architecture not only supports easy maintenance but also facilitates scaling, whether adding new features or more complex levels.

Hope you have as much fun playing "Crux & Clues" as I had building it!
