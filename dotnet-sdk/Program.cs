using dotenv.net;
using Azure.Data.AppConfiguration;

DotEnv.Load(); // Doesn't work as C# program launched by F5 doesn't have correct cwd.

Console.WriteLine("Azure App Configuration - .NET example");
var connectionString = Environment.GetEnvironmentVariable("AZURE_APPCONFIG_CONNECTION_STRING");
var client = new ConfigurationClient(connectionString);

// get a configuration setting
ConfigurationSetting configSetting = client.GetConfigurationSetting("TestApp:Settings:Message");
Console.WriteLine($"Key: {configSetting.Key}, Value: {configSetting.Value}");
