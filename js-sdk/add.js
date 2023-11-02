const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    const configSetting = {
        key: "TestApp:Settings:NewSetting",
        value: "New setting value"
    };
    const addedConfigSetting = await client.addConfigurationSetting(configSetting);
    console.log("\nAdded configuration setting:");
    console.log(`Key: ${addedConfigSetting.key}, Value: ${addedConfigSetting.value}`);
}

run().catch(console.error);