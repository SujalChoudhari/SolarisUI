# SolarisUI
Imagine you're tasked with building a website for your company or personal project, but you're not exactly a pro at HTML or JavaScript. You know the basic layout and functionality you want, but actually writing out the code seems like an insurmountable task.

Enter SolarisUI - a magical tool that takes care of all the heavy lifting for you. You don't need to write any HTML or JavaScript code - instead, you can use pre-written templates for each component of your website. These templates are organized in a neat, intuitive way, so you can easily find what you need.


## How Solaris Works?
- SolarisUI is a TypeScript library that lets you create webpages without writing HTML or JavaScript code.
- It is a build tool, not a framework.
- Templates for each component can be found in the `src/templates` folder as `[name].component.html` files.
- An Atom and Atomizer system is used to load the templates and create components.
- Components are arranged hierarchically in a tree structure.
- Components provide a set of methods for manipulating data.
- To use SolarisUI, you need to work with the `Component` class and its subclasses.
- The `toString()` method of Components and the `build` method of the `SolarisUI` class are used to generate the final HTML, CSS, and JS code.

## Installation

[Clone the repository](https://github.com/SujalChoudhari/SolarisUI)

```bash
git clone https://github.com/SujalChoudhari/SolarisUI.git
```

OR `NPM`
```bash
npm i @sujalchoudhari/solaris-ui
```

OR `YARN`
```bash
yarn add @sujalchoudhari/solaris-ui
```
OR `download the code from the repository.`

[Note: NPM might not work for alpha builds. Use the repository instead.]

## Usage

To create a new project, you can use the following code:

```ts
const page = sui.SolarisUI.createPage("Test Page", "index.html", {
    "name": "Sujal Choudhari",
    "description": "This is a test page",
    "keywords": "test,page,solarisui"
});

```
This code creates a new webpage using the createPage method of the SolarisUI object. The first parameter is the title of the page, the second parameter is the path to the HTML file, and the third parameter is an object that contains metadata about the page, such as the name, description, and keywords. 

```ts
const dropdown = new sui.Atom(sui.Atomizer.templates.dropdown, {
    text: "Dropdown",
    links: [{
        href: "index.html",
        text: "Home"
    }, {
        href: "about.html",
        text: "About"
    }, {
        href: "contact.html",
        text: "Contact"
    }]
});

```
This code creates a dropdown menu using the dropdown template from the Atomizer object. The dropdown menu is created by instantiating a new Atom object and passing it the dropdown template as well as an object that contains the text to display on the menu button and an array of links to display in the menu.


```ts
page.getChildren()[1].addChildren(sui.Atomizer.buildComponentTree(navbar.toString()));

```
This code adds the navbar component to the second child of the page using the addChildren method. The buildComponentTree method is called on the navbar object to create a tree of components that can be added to the page.

```ts
sui.SolarisUI.buildProject("Test", [page]);

```
This code calls the buildProject method of the SolarisUI object to build the entire project, which includes the Test Page and all of its components. The first parameter is the name of the project, and the second parameter is an array of pages to include in the project.

## Development Roadmap

- [x] Basic Entity, Attributes, Children System: This refers to the foundation of the system and includes the definition of entities (objects), their attributes (properties), and their relationships with other entities (children). This is a crucial step in the development of any application or system.

- [x] Building The Layout: This involves creating the visual layout of the application or system. This includes the placement of various elements on the screen, such as buttons, text fields, images, and so on.

- [x] Save and Load System for Intermediate Files (JSON files): This refers to the capability of the system to save and load data in an intermediate format such as JSON. This is useful for debugging, testing, and sharing data between different systems.

- [x] Integrated CSS (inline): This involves the integration of CSS directly into the HTML code of the application or system. This helps to simplify the code and makes it easier to maintain.

- [x] Collection of Containers (Hbox, Vbox, and Grid): This refers to the various containers available in the system to hold different elements, such as horizontal boxes, vertical boxes, and grids. These containers can be used to organize the layout of the application or system.

- [x] Integrated Javascript (for animations and event listeners): This involves the integration of Javascript code into the HTML code of the application or system. This helps to add dynamic functionality to the system, such as animations and event listeners.

- [x] An Encapsulated Template loading and saving system (Atomizer): This refers to a system that enables the creation and management of templates for different elements of the application or system. This can help to simplify the development process and improve the maintainability of the code.

- [x] Templates (basic templates) [Page, Head, Link, etc.]: This includes the creation of basic templates for various elements of the system, such as the page, head, link, and so on. These templates can be used as a starting point for the development of more complex elements.

- [ ] More Templates (Navbar, Footer, Carousel, etc.): This includes the creation of additional templates for more complex elements of the system, such as the navbar, footer, carousel, and so on.

- [ ] Higher Level Layout System (Navbars, Carousel, Footer, etc.) [WIP]: This involves the creation of a higher level layout system for the application or system. This can help to simplify the development process and improve the maintainability of the code.

- [x] Sophisticated Ways to Integrate Javascript and CSS files: This refers to the various techniques available for integrating Javascript and CSS files into the application or system. This can help to improve the performance of the system and make it more efficient.



## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
Please make sure to update tests as appropriate.
To add new features, it is suggested to create a new branch `feature-[name]`.

## License
[MIT](https://github.com/SujalChoudhari/SolarisUI/blob/main/LICENSE)
