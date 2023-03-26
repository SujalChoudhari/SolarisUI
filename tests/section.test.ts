import * as sui from '../src/index';
describe('Section', () => {

    it("should create a new Section",() =>{
        sui.Logger.logLevel = sui.LogLevel.WARNING;
        const project = new sui.SolarisUI("HLTest");
        const page = new sui.Page("index");
        const section = new sui.TwoPartSection();


        page.addChildren(new sui.Head("index"),new sui.Body());
        page.body.addChildren(section);

        project.build(page);
    });
});