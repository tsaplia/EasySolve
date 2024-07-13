# EasySolve Instruction

Visit the [EasySolve](https://easy-solve.netlify.app/) site

## Adding a Formula

1. **Press "Add formula"**: Enter a formula using LaTeX or ASCII math commands.
2. **View Formula**: The entered formula will appear on the canvas.
3. **Select Parts**: Click on parts of the formula to select them (selected parts are colored in blue).
4. **Deselect Parts**: Press `Ctrl` to deselect parts.
5. **Add Text**: Press "Add text" to enter any text using LaTeX.

## Managing Formula Elements

- **Copy, Edit, Delete, or Move**: Use the buttons to the right of the formula to perform these actions.

## Solving and Transforming Formulas

1. **Press "Interaction" Button**: This opens a tab with possible formula transformations.
2. **Types of Transformations**:
   - **For Equations**: Select the entire formula.
   - **For Expressions**: Select the part of the formula to modify.
3. **Selecting Formula Parts**: The selected element will appear in the field at the upper part of the tab. If the selection is impossible, the field will be empty.
4. **Apply Transformation**:
   - Click the button to the right of the desired transformation.
   - A transformation preview will appear.

## Insertion Modes

1. **Add to End**:
   - Adds the modified formula part to the end of the formula after the "=" sign.
2. **To the New Line**:
   - Adds a new formula line where the selected part is replaced with its transformation.
3. **Replace**:
   - Replaces the selected formula part with its transformation.

**Note**: For "For Equations" transformations, the only possible mode is "to the new line."

## Transformation Overview

### Simplification

- **Collect Like Terms**:
  - Select two or more terms.
  - Example: Applying to `2x + 3y - x` results in `x + 3y`.

- **Simplify Fraction**:
  - Removes fractions inside other fractions.
  - To apply, select the inner fraction.

- **Simplify Term**:
  - If there is a fraction, divides the numerator and denominator by their GCD.
  - To apply, select the term.

**Note**: Ensure you select the sign with the term. Correct selections include `+2x`, `-5xyz`.

### Substitution

- **Example**: Substitute `x = y + 5` into `x + y = 12` to get `y + 5 + y = 12`.
- To apply:
  1. Select the entire formula from which you want to substitute.
  2. Use "substitute from" transformation.
  3. Select the expression equal to the left part and use "substitute to".

### Moving & Grouping

- **Group**:
  - Add extra brackets around selected multipliers or terms.
  - Example: To transform `x^2 * y^2 * z^2` into `x^2 * (y^2 * z^2)`, use "group" or press `Alt+G`.

- **Move Left/Move Right**:
  - Change the position of a multiplier or term in an expression.
  - Select the term/expression and use the transformation or press left/right arrows.

- **To Another Part**:
  - Move selected terms to another part of the equation.
  - Example: `x + y = 5` with `5` selected becomes `x + y - 5 = 0`.
  - Alternatively, use `Shift+Enter`.

## Save Your Project

Press on the Three Dots located at the upper left corner of the solution.

1. **Save As**:
   - **LaTeX**: Saves your solution in LaTeX format.
   - **Picture**: Makes a picture/screenshot of the solution.
   - **JSON File**: Saves the solution in a JSON file. You can open it using the "Open From" button. `Ctrl+S`

2. **Open From**
   - **Folder**: Open previously saved project from a JSON file. `Ctrl+O`
