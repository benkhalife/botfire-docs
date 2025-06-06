# BotFire : `getCallback` Method Documentation

## Overview
It is designed to handle `callback_query` events, which occur when a user interacts with an inline button (a button attached to a message, typically used in inline keyboards). This method provides access to the details of the callback query, such as the sender, associated data, and the originating message, if available.

## Usage
To access the `getCallback` method, use the `Bot` class as follows:

```php
use Botfire\Bot;

$callback = Bot::getCallback();
```

This method should be used when the event type is confirmed to be a `callback_query`. You can verify this using the `GetEvent` class or the `isCallbackQuery` method:

```php
use Botfire\GetEvent;

if (Bot::getEvent()->getName() === GetEvent::TYPE_CALLBACK_QUERY) {
    $from = Bot::getCallback()->getFrom()->getId();
    $data = Bot::getCallback()->getData();
}
```

Alternatively:

```php
if (Bot::getEvent()->isCallbackQuery()) {
    $from = Bot::getCallback()->getFrom()->getId();
    $data = Bot::getCallback()->getData();
}
```

## Methods
The `getCallback` method returns an object with the following methods to extract specific information about the callback query:

### 1. `getId(): string`
Returns the unique identifier for the callback query.

#### Example
```php
$query_id = Bot::getCallback()->getId();
```

### 2. `getFrom(): User`
Returns an instance of the `User` class representing the sender of the callback query (the user who clicked the inline button). The `User` object provides access to methods such as `getId()`, `getUserName()`, `getFirstName()`, etc., as defined in the Telegram API (see [Telegram API: User](https://core.telegram.org/bots/api#user)).

#### Example
```php
$user_id = Bot::getCallback()->getFrom()->getId();
$username = Bot::getCallback()->getFrom()->getUserName();
```

### 3. `getInlineMessageId(): ?string`
Returns the identifier of the message sent via the bot in inline mode that originated the query, if applicable. Returns `null` if the callback query did not originate from an inline message.

#### Example
```php
$inline_message_id = Bot::getCallback()->getInlineMessageId();
```

### 4. `getData(): string`
Returns the data associated with the callback button, if any. This data is defined when the inline button is created and can be used to determine the action triggered by the button click. Returns an empty string if no data is present.

#### Example
```php
$data = Bot::getCallback()->getData();
```

### 5. `hasMessage(): bool`
Checks if the callback query is associated with a message (e.g., a message containing the inline button). Returns `true` if a message is present, otherwise `false`.

#### Example
```php
if (Bot::getCallback()->hasMessage()) {
    // Process the associated message
}
```

### 6. `getMessage(): ?GetMessage`
If it exists, it returns an instance of the GetMessage class that represents the message that contains the call button.

#### Example
```php

if (Bot::getCallback()->hasMessage()) {
    $message = Bot::getCallback()->getMessage();

    $message_text = $message->getText();
    $message_type = $message->getContentType();
}

```

### 7. `getChatInstance(): ?string`
Returns the global identifier uniquely corresponding to the chat where the message with the callback button was sent. This is particularly useful for high-score tracking in games.

#### Example
```php
$chat_instance = Bot::getCallback()->getChatInstance();
```


## Notes
- The `getCallback` method is specifically designed for handling `callback_query` events, which are triggered when a user clicks an inline button in a message or inline mode.
- Always verify that the event is a `callback_query` before calling `getCallback`, using either `Bot::getEvent()->getName() === GetEvent::TYPE_CALLBACK_QUERY` or `Bot::getMessage()->isCallbackQuery()`.
- The `getFrom()` method is always available, as the Telegram API guarantees the presence of the `from` field in `callback_query` updates.
- The `getMessage()` method may return `null` for callback queries originating from inline mode, so use `hasMessage()` to check before accessing the message.
- The `getChatInstance()` and `getInlineMessageId()` methods are useful for specific use cases, such as tracking game scores or handling inline mode queries.
- For more details on the `User` and `Chat` objects, refer to the Telegram API documentation: [User](https://core.telegram.org/bots/api#user) and [Chat](https://core.telegram.org/bots/api#chat).