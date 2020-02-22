handlers.helloWorld = function (args, context) {
    var message = "Hello " + currentPlayerId + "!";

    log.info(message);
    var inputValue = null;
    if (args && args.inputValue)
        inputValue = args.inputValue;
    log.debug("helloWorld:", { input: args.inputValue });

    return { messageValue: message };
};


// This is a simple example of making a PlayFab server API call
handlers.getTableCall = function (args, context) {
    var request = {
        CatalogVersion: "Character",
        TableId: "CharacterGacha"
    };

    var result = server.EvaluateRandomResultTable(request);
    return result;
};

// This is a simple example of making a PlayFab server API call
handlers.itemToUser = function (args, context) {
    var request = {
        // Annotation: "GachaPresent",
        // CatalogVersion: "Character",
        ItemIds: args.itemIds,
        PlayFabId: currentPlayerId,
    };

    var result = server.GrantItemsToUser(request);
    return result;
};

handlers.gachaOneCall = function (args, context){
    var evaluateRequest = {
        CatalogVersion: "Character",
        TableId: "CharacterGacha"
    };

    var evaluateResult = server.EvaluateRandomResultTable(evaluateRequest);

    var grantRequest = {
        // Annotation: "GachaPresent",
        // CatalogVersion: "Character",
        ItemIds: evaluateResult.ResultItemId,
        PlayFabId: currentPlayerId,
    };

    var grantResult = server.GrantItemsToUser(grantRequest);
    return grantResult;
}