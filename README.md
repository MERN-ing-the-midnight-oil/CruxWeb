# CRUX 2.0 - Game Development

Welcome to the GitHub repository for CRUX 2.0, an evolution of the original [CRUX](https://mern-ing-the-midnight-oil.github.io/crux/) crossword puzzle game. This version introduces improvements to the game level structure, display, and UX.

## Evolution of Level Design

### Original Grid Design

In the original CRUX, I defined levels with a more complex system of word start and end coordinates alongside intersection coordinates. While this method worked, it led to a difficult level initialization process.

### Simplifying to Array-Based Levels

The development of CRUX 2.0 brought an "ah-ha" moment—the realization that levels could be more simply and effectively represented as an array of three cell types:

- **Empty Cells (`"##"`)**: Represent areas with no interaction.
- **Clue Cells (`"01"`, `"02"`, etc.)**: Contain identifiers linking to clues.
- **Letter Cells (`"A_"`, `"B_"`, etc.)**: Represent letters filled in by players.

This transition is encapsulated in the transition from the old to the new grid definition, dramatically simplifying the level design process.

![New Grid Definition](public/images/readme%20images/newGridDefinition.png "Illustration of the New Grid Definition")

### Development of the Visual Grid

The simplification led to the development of the visual grid system—a straightforward method that allows easy creation and coding of new puzzle levels using a visually intuitive layout.

![Visual Grid Example](public/images/readme%20images/visualGrid.png "Example of Visual Grid")

## Benefits of the New Design

- **Streamlined Level Creation**: Level designers can now use simple array formats to create and modify levels quickly.
- **Enhanced Scalability**: New levels can be added more efficiently, and existing levels can be modified without complex recalculations.
- **Accessibility for Designers**: The visual grid format allows level designers to visually map out the game, making the design process more accessible to those with or without deep technical skills.

## Getting Started with CRUX 2.0

To get started with developing or playing CRUX 2.0, clone this repository and follow the setup instructions below:

```bash
git clone https://github.com/your-repository-url
cd crux-2.0
npm install
npm start
```

## Scan to Play on Mobile

If you want to jump right into the game on your mobile device, just scan this QR code. It's a direct link to the live CRUX 2.0 app, and it'll get you playing in no time!

![QR Code](public/images/readme%20images/QRcode.png "Scan to Play")

## Contributing

I'm always looking for feedback and contributions to make CRUX 2.0 even better. If you have ideas or improvements, please contact me directly to discuss any potential collaboration.

## License

This project and all its content are proprietary and protected under intellectual property laws. Use of the game or its code without explicit permission is strictly prohibited.

For any inquiries regarding licensing or use rights, please contact me directly.

Feel free to reach out if you have any questions or just want to chat about the project. Happy puzzling!
