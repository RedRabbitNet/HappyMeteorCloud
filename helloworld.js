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
    var ids = new Array(args.ResultItemId);
    var request = {
        // Annotation: "GachaPresent",
        // CatalogVersion: "Character",
        ItemIds: ids,
        PlayFabId: currentPlayerId,
    };

    var result = server.GrantItemsToUser(request);
    return result;
};