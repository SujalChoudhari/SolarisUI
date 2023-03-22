import SolarisUI from './src'
import { Page, Head, String, Link, Body } from './src/basic'
import Style from './src/basic/styles';

var project = new SolarisUI("test");
var head = new Head("Test", "Solaris", "This is a test", "test, solaris");

head.addStylesheet(new Style("external", "./a.css"));


var page = new Page("index.html");
page.addChildren(head);
var newBody = new Body();

page.addChildren(newBody);

project.build(page);