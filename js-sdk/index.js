const dotenv = require("dotenv");
dotenv.config();

const { AppConfigurationClient } = require("@azure/app-configuration");

async function run() {
    console.log("Azure App Configuration - JavaScript example");
    const connection_string = process.env.AZURE_APPCONFIG_CONNECTION_STRING;
    const client = new AppConfigurationClient(connection_string);

    // get
    const retrievedConfigSetting = await client.getConfigurationSetting({
        key: "TestApp:Settings:Message"
    });
    console.log("\nRetrieved configuration setting:");
    console.log(`Key: ${retrievedConfigSetting.key}, Value: ${retrievedConfigSetting.value}`);

    // add
    const configSetting = {
        key: "TestApp:Settings:NewSetting",
        value: "New setting value"
    };
    const addedConfigSetting = await client.addConfigurationSetting(configSetting);
    console.log("\nAdded configuration setting:");
    console.log(`Key: ${addedConfigSetting.key}, Value: ${addedConfigSetting.value}`);

    // list
    const filteredSettingsList = client.listConfigurationSettings({
        keyFilter: "TestApp*"
    });
    console.log("\nRetrieved list of configuration settings:");
    for await (const filteredSetting of filteredSettingsList) {
        console.log(`Key: ${filteredSetting.key}, Value: ${filteredSetting.value}`);
    }

    // lock
    const lockedConfigSetting = await client.setReadOnly(addedConfigSetting, true /** readOnly */);
    console.log(`\nRead-only status for ${lockedConfigSetting.key}: ${lockedConfigSetting.isReadOnly}`);

    // unlock
    const unlockedConfigSetting = await client.setReadOnly(lockedConfigSetting, false /** readOnly */);
    console.log(`\nRead-only status for ${unlockedConfigSetting.key}: ${unlockedConfigSetting.isReadOnly}`);

    // update
    addedConfigSetting.value = "Value has been updated!";
    const updatedConfigSetting = await client.setConfigurationSetting(addedConfigSetting);
    console.log("\nUpdated configuration setting:");
    console.log(`Key: ${updatedConfigSetting.key}, Value: ${updatedConfigSetting.value}`);

    // delete
    const deletedConfigSetting = await client.deleteConfigurationSetting({
        key: "TestApp:Settings:NewSetting"
    });
    console.log("\nDeleted configuration setting:");
    console.log(`Key: ${deletedConfigSetting.key}, Value: ${deletedConfigSetting.value}`);
}

run().catch(console.error);