# SolarisUI
A UI framework to create HTML pages with just JavaScript.

## Development Roadmap

- [ ] Basic Entity, Attributes, Children System
- [ ] Layout System (works with only pixels)
- [ ] Dynamic Layout System (can change as per the display size)
- [ ] Save and Load System for Intermidiate Files (Json files)
- [ ] Building The Layout


### Entity, Attributes, Children System
A collection of SubClasses of Entity that can create/represent the the entire Html page structure.

This collection can be used to create UI components quickly and hook them into their respective backend. These components will have functionality like `onCreate`, `onClick`, `onScroll` and so forth.

### Layout System
A rather complex system of functions that can be used to align or resize the children elements of a parent element. A dynamic layout system which can resize the parent as well as the child elements to fit the specified size. Functions such as `verticalAlign` and `horizontalAlign`.

### Save and Load System
A simpler Json Loader and Save System to save intermidiate data generated during the creation process. This can be expanded to build the entire project with. 

### Building The Layout
Finally, The source code for each component and each page will be generated.
`toString` functios for each part of the code will chain together to create the final html file along with the css and javascript components.