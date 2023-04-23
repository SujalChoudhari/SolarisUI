import getLatestVersion from "get-latest-version";
import Logger from "./logger";

export default async function CheckForUpdate(version?: any) {
    const latest = await getLatestVersion("@sujalchoudhari/solaris-ui")

    if (version !== latest) {
        // console log the message inside a box
        Logger.warn("Check For Updates", `
            A new version of SolarisUI is available.
            Current version: ${version}
            Latest version: ${latest}
            
            ----------------------------------------

            Run the following command to update:
                \x1b[40m\x1b[38;5;10m npm install @sujalchoudhari/solaris-ui@${latest} \x1b[0m
            `);
        Logger.info("Get More Information", "https://www.npmjs.com/package/@sujalchoudhari/solaris-ui");
    }

}