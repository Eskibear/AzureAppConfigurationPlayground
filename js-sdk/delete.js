const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    const deletedConfigSetting = await client.deleteConfigurationSetting({
        key: "TestApp:Settings:NewSetting"
    });
    console.log("\nDeleted configuration setting:");
    console.log(`Key: ${deletedConfigSetting.key}, Value: ${deletedConfigSetting.value}`);
}

run().catch(console.error);