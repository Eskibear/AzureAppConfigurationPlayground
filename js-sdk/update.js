const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    const configSetting = {
        key: "TestApp:Settings:Message"
    };
    configSetting.value = "Value has been updated!";

    const updatedConfigSetting = await client.setConfigurationSetting(configSetting);
    console.log("\nUpdated configuration setting:");
    console.log(`Key: ${updatedConfigSetting.key}, Value: ${updatedConfigSetting.value}`);
}

run().catch(console.error);