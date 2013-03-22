var client = function()
{
	
}

client._instance = null;
client.getInstance = function()
{
	if (client._instance === null) client._instance = new client();
	return client._instance();
}