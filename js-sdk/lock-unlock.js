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
    // lock
    const lockedConfigSetting = await client.setReadOnly(configSetting, true /** readOnly */);
    console.log(`\nRead-only status for ${lockedConfigSetting.key}: ${lockedConfigSetting.isReadOnly}`);

    // unlock
    const unlockedConfigSetting = await client.setReadOnly(lockedConfigSetting, false /** readOnly */);
    console.log(`\nRead-only status for ${unlockedConfigSetting.key}: ${unlockedConfigSetting.isReadOnly}`);
}

run().catch(console.error);