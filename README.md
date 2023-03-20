
# SolarisUI Framework

SolarisUI is a front-end framework based on a component system, which provides a simple and flexible way to create user interfaces for web applications. The framework consists of a set of reusable components for different parts of the HTML document, including the page, head, body, links, and more. So no need to use html or css anymore!

The framework allows developers to build UIs in a more organized and maintainable way, by breaking down the UI into smaller, self-contained components. These components can then be combined to create more complex UIs, allowing for easier development and maintenance of web applications.

## WIP
The framework is still work in progress. You can contribute to the framework.


## Abstract Systems 
All the systems implimeted or will be implimenting.

### Component, Attributes, Children System
A collection of SubClasses of Entity that can create/represent the the entire Html page structure.

This collection can be used to create UI components quickly and hook them into their respective backend. These components will have functionality like `onCreate`, `onClick`, `onScroll` and so forth.

### Layout System
A rather complex system of functions that can be used to align or resize the children elements of a parent element. A dynamic layout system which can resize the parent as well as the child elements to fit the specified size. Functions such as `verticalAlign` and `horizontalAlign`.

### Save and Load System
A simpler Json Loader and Save System to save intermidiate data generated during the creation process. This can be expanded to build the entire project with. 

### Building The Layout
Finally, The source code for each component and each page will be generated.
`toString` functios for each part of the code will chain together to create the final html file along with the css and javascript components.