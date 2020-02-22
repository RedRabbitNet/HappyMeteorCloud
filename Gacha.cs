public void Grant(string playFabId, string tableId) {
    // First, roll a random number and evaluate the drop table
    PlayFabServerAPI.EvaluateRandomResultTable(new EvaluateRandomResultTableRequest()
    {
        TableId = tableId
    }, result => OnRandomResultTableResponse(result, playFabId), OnError);
}

public void OnRandomResultTableResponse(EvaluateRandomResultTableResult tableResult, string playFabId) {
    // Second, take the result and grant it to the player
    PlayFabServerAPI.GrantItemsToUser(new GrantItemsToUserRequest {
        PlayFabId = playFabId,
        ItemIds = new List<string> { tableResult.ResultItemId }
    }, result =>
    {
        // Handle Result
    }, OnError);
}

public void OnError(PlayFabError error) {
    Debug.LogError(error.GenerateErrorReport());
}