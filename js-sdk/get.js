const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    const retrievedConfigSetting = await client.getConfigurationSetting({
        key: "TestApp:Settings:Message"
    });
    console.log("\nRetrieved configuration setting:");
    console.log(`Key: ${retrievedConfigSetting.key}, Value: ${retrievedConfigSetting.value}`);
}

run().catch(console.error);