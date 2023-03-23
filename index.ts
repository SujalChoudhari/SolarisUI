import {SolarisUI} from './src'
import { Page, Head, String, Link, Body } from './src/basic'
import Script from './src/basic/scripts';
import Style from './src/basic/styles';

var project = new SolarisUI("test", "en", "utf-8", {bootstrapSupport: false, tailwindSupport: false});
var head = new Head("Test", "Solaris", "This is a test", "test, solaris");

head.addStylesheet(new Style("external", "./a.css"));




var page = new Page("index.html");
page.addChildren(head);
var newBody = new Body();

// newBody.addScript(new Script("external", "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js", `${
//     function test() {
//         console.log("test");
//     }
// }\n test();`, {type: "module", integrity: "sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN", crossorigin: "anonymous"}));

page.addChildren(newBody);

project.build(page);