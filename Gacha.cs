public static class PlayFabServerAPI
{
    public static void Grant(string playFabId, string tableId) {
        // First, roll a random number and evaluate the drop table
        PlayFabServerAPI.EvaluateRandomResultTable(new EvaluateRandomResultTableRequest()
        {
            TableId = tableId
        }, result => OnRandomResultTableResponse(result, playFabId), OnError);
    }

    public static void OnRandomResultTableResponse(EvaluateRandomResultTableResult tableResult, string playFabId) {
        // Second, take the result and grant it to the player
        PlayFabServerAPI.GrantItemsToUser(new GrantItemsToUserRequest {
            PlayFabId = playFabId,
            ItemIds = new List<string> { tableResult.ResultItemId }
        }, result =>
        {
            // Handle Result
        }, OnError);
    }

    public static void OnError(PlayFabError error) {
        Debug.LogError(error.GenerateErrorReport());
    }
}