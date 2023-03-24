# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [1.0.1-alpha.1] - 24-03-2023
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


## [1.0.1-alpha.0] - 24-03-2023
This is the first release. Mostly the code added, no deletion are made.
### Added
- Basic classes for low level components
- Filemanager and SolarisUI classes to manage components
- Containers, an Intermediate collection of containers.