'use strict';

const cleanStack = require('clean-stack');
const VError = require('verror');

function wrapInQuotesOrEmpty(key, value) {
    if (!value) {
        return '';
    }

    return `,"${key}":"${value}"`;
}

function createMessage(level, message, error, data, moduleName, file, topLevelApp) { // eslint-disable-line max-params
    const messageIsError = message instanceof Error;
    const localError = messageIsError ? message : error;
    let localData = messageIsError ? error : data;
    const localErrorIsError = localError instanceof Error;
    const messageString = JSON.stringify(messageIsError ? message.toString() : message);
    const errorIsData = localError != null && !localErrorIsError;
    localData = errorIsData ? error : (localData || {});

    const stacktrace = localErrorIsError ? JSON.stringify(cleanStack(VError.fullStack(localError))) : null;

    const throwable = stacktrace ? `,"throwable":${stacktrace}` : '';
    const logger = wrapInQuotesOrEmpty('logger', localData.logger);
    const clientIp = wrapInQuotesOrEmpty('client_ip', localData.clientIp);
    const userId = wrapInQuotesOrEmpty('user_id', localData.userId);
    const requestId = wrapInQuotesOrEmpty('request_id', localData.requestId);
    const extras = localData.extras == null ? '' : `,"extras":${JSON.stringify(localData.extras)}`;

    return `{"@version": 1,"@timestamp":"${new Date().toISOString()}"${logger},"level":"${level}","message":${messageString}${throwable},"app":"${localData.appName || topLevelApp}"${clientIp}${userId}${requestId},"LocationInfo":{"file":"${file}","module":"${moduleName}"}${extras}}`; // eslint-disable-line max-len
}

module.exports = createMessage;
