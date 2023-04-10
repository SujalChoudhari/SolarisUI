# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


# [1.0.1-alpha.5] - 10-04-2023
## [Unreleased]
This alpha has Bug fixes and minor changes.

### Changed
- File Manager now by default, points to cwd.
- Templates was moved outside of the `src` folder.
- Builds are located in cwd by default.

# [1.0.1-alpha.4] - 09-04-2023
## [Unreleased]
The project is going under various changes. 
The code is not stable and may break at any time.
### Added
- `Atomizer.buildComponentTreeFromAtom` added.
- `ScriptManager` and `StyleManager` classes.
- Templates
- Can select multiple templates from different styles.
### Changed
- Logger saves log files under `./logs` folder.
- Template files(js and css) are included in the build.
- Renamed `[name].component.html` to `[name].html`
- Atomizer can have multiple folders to load from.


# [1.0.1-alpha.3] - 30-03-2023
## [Unreleased]
The project is going under various changes. 
The code is not stable and may break at any time.
### Added
- Atom Class.
- Atomizer Class.
- AtomizerTemplate Class.
- templates as `[name].component.html` files in `src/templates/` folder.

### Changed
- The entire `solaris.ts` got overhauled.
- `Logger` class saves logs under `./logs` folder.
- `basic` folder is renamed to `components`
- `logger`,`filemanager`, `solaris` moved into `./src/utils` folder.
### Removed 
- Almost all `.ts` files that Inherited from `Component` class.
- Init method from `SolarisUI` class.

# [1.0.1-alpha.2] - 25-03-2023
### Added
- Logger Class, detailed output will be provided in future versions

### Changed
- FileManager now uses Logger.warn instead of `throw Error`.

# [1.0.1-alpha.1] - 24-03-2023
## [Unreleased]
### Added
- `copyTree` function added in `FileManager`.
- `SolarisUI.build` now copies the contents of public folder and dumps it into Build folder.
- NPM Link into sidebar of Docs page.

### Changed
- renamed `addDefaultCss` to `useGlobalStyles`
- renamed `defaultCss` to `globalCss`
- Builds folder is no longer generated under `./public`. 

### Fixed
- Errors generated when building the project with `defaultCss:true`


# [1.0.1-alpha.0] - 24-03-2023
This is the first release. Mostly the code added, no deletion are made.
### Added
- Basic classes for low level components
- Filemanager and SolarisUI classes to manage components
- Containers, an Intermediate collection of containers.