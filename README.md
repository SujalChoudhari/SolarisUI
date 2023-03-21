# SolarisUI
A UI framework to create HTML pages with just JavaScript.

## Development Roadmap
- [x] Basic Entity, Attributes, Children System
- [x] Building The Layout
- [x] Save and Load System for Intermidiate Files (Json files) 
- [x] Integraged CSS (inline) 
- [ ] Layout System (works with only pixels) (WIP)
- [ ] Dynamic Layout System (can change as per the display size)
- [ ] Collection of Containers (Hbox,Vbox and Grid)
- [ ] Integrated Javascript (for animations and event listners)

`The details of the list are available below.`
### Entity, Attributes, Children System
A collection of SubClasses of Entity that can create/represent the the entire Html page structure.

This collection can be used to create UI components quickly and hook them into their respective backend. These components will have functionality like `onCreate`, `onClick`, `onScroll` and so forth.

### Layout System
A rather complex system of functions that can be used to align or resize the children elements of a parent element. A dynamic layout system which can resize the parent as well as the child elements to fit the specified size. Functions such as `verticalAlign` and `horizontalAlign`.

### Save and Load System
A simpler Json Loader and Save System to save intermidiate data generated during the creation process. This can be expanded to build the entire project with. 
This is implemented under `FileManager` class.

### Building The Layout
Finally, The source code for each component and each page will be generated.
`toString` functios for each part of the code will chain together to create the final html file along with the css and javascript components.

### Integrated Css
The css is automatically generated as per the `fill` and `align` functions of `Component` and `Container` respectively. This css allows user to 
customize individual elements. Later global css might be available for all components.

### Collection of Components
Subclasses that would be ideal under `Container` class would depend on the specific requirements of your website. However, some commonly used subclasses of `Container` include:

- `GridContainer`: A subclass of `Container` that uses CSS grid layout to arrange its child elements in a grid-like structure.
- `FormContainer`: A subclass of `Container` that specializes in displaying and managing form elements, such as text inputs, checkboxes, and radio buttons.
- `CardContainer`: A subclass of `Container` that specializes in displaying content in a card-like layout, with features such as rounded corners, shadows, and background colors.
- `ImageContainer`: A subclass of `Container` that specializes in displaying and managing images, with features such as cropping, resizing, and lazy loading.
- `NavbarContainer`: A subclass of `Container` that specializes in displaying a navigation bar, with features such as dropdown menus, search bars, and responsive design.

These are just a few examples, and there are many other possible subclasses of Container that could be useful depending on the specific needs of your website.

### Integrated Javascript
JavaScript is necessary even for static pages for animations and navigation purposes. This feature might be optional only for internal use or may be developed for external use as well.