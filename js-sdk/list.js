const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    const filteredSettingsList = client.listConfigurationSettings({
        keyFilter: "TestApp*"
    });
    console.log("\nRetrieved list of configuration settings:");
    for await (const filteredSetting of filteredSettingsList) {
        console.log(`Key: ${filteredSetting.key}, Value: ${filteredSetting.value}`);
    }
}

run().catch(console.error);