# SolarisUI

Solaris is a UI framework written in Typescript. 
Solaris enables you to make websites without actually writing any html or javascript code.

## Installation

[Clone the repository](https://github.com/SujalChoudhari/SolarisUI)
```bash
git clone https://github.com/SujalChoudhari/SolarisUI.git
````

Or download the code from the repository.

## Usage

```typescript
// Create a new Project
var project = new SolarisUI("Test");
// New Page
var page = new Page("index.html");
var head = new Head("Test Page");
var body = new Body();
var container = new Container();
var text = new Heading(3, "Test Page");
text.fill("vertical");
text.align("center","middle");
container.addChild(text);
container.fill("vertical");
body.addChild(container);
page.addChildren(head, body);
//Build the project.
project.build(page);
```

## Development Roadmap
- [x] Basic Entity, Attributes, Children System
- [x] Building The Layout
- [x] Save and Load System for Intermidiate Files (Json files) 
- [x] Integraged CSS (inline) 
- [x] Collection of Containers (Hbox,Vbox and Grid)
- [ ] Layout System (works with only pixels) (WIP)
- [ ] Dynamic Layout System (can change as per the display size)
- [ ] Integrated Javascript (for animations and event listners)
- [ ] Higher Level Layout System (Navbars, Carousel, Footer,etc)


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
Please make sure to update tests as appropriate.
To add new features, it is suggested to create a new branch `feature-[name]`.
## License

[MIT](https://github.com/SujalChoudhari/SolarisUI/blob/main/LICENSE)