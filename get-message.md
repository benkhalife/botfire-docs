# Botfire : `getMessage` Method Documentation

## Overview

The `getMessage` method is a key component of the Botfire for creating Telegram bots. It provides access to the details of a message received via Telegram webhooks, enabling developers to extract and process various aspects of the message, such as its content type, sender information, and metadata.

## Usage
To access the `getMessage` method, use the `Bot` class as follows:

```php
use Botfire\Bot;

$message = Bot::getMessage();
```

## Methods
The `getMessage` method returns an object with the following methods to extract specific information about the message:

### 1. `getContentType()`
Returns the type of content contained in the message.

#### Example
```php
$type = Bot::getMessage()->getContentType();
```

#### Possible Content Types
The content type can be one of the following constants defined in the `GetMessage` class:
- `GetMessage::TYPE_TEXT` (`'text'`) - A text message.
- `GetMessage::TYPE_PHOTO` (`'photo'`) - A photo message.
- `GetMessage::TYPE_VIDEO` (`'video'`) - A video message.
- `GetMessage::TYPE_AUDIO` (`'audio'`) - An audio message.
- `GetMessage::TYPE_DOCUMENT` (`'document'`) - A document/file message.
- `GetMessage::TYPE_STICKER` (`'sticker'`) - A sticker message.
- `GetMessage::TYPE_ANIMATION` (`'animation'`) - An animation (GIF) message.
- `GetMessage::TYPE_LOCATION` (`'location'`) - A location message.
- `GetMessage::TYPE_CONTACT` (`'contact'`) - A contact message.
- `GetMessage::TYPE_VOICE` (`'voice'`) - A voice message.
- `GetMessage::TYPE_POLL` (`'poll'`) - A poll message.

#### Example Usage
To check if the message is a text message:
```php
use Botfire\Bot;
use Botfire\GetMessage;

if (Bot::getMessage()->getContentType() === GetMessage::TYPE_TEXT) {
    // Handle text message
}
```

### 2. `getMessageId()`
Returns the unique identifier of the message.

#### Example
```php
$message_id = Bot::getMessage()->getMessageId();
```

### 3. `getDate()`
Returns the timestamp of when the message was sent.

#### Example
```php
$date = Bot::getMessage()->getDate();
```

### 4. `getText()`
Returns the text content of the message (applicable for text messages).

#### Example
```php
$text = Bot::getMessage()->getText();
```

### 5. `getCaption()`
Returns the caption of the message, if available (applicable for messages with media content such as photos, videos, or documents).

#### Example
```php
$caption = Bot::getMessage()->getCaption();
```

### 6. `getFrom()`
Returns an object representing the user or bot that sent the message. This object is an instance of the `User` class, as defined in the Telegram API (see [Telegram API: User](https://core.telegram.org/bots/api#user)).

#### Available Methods for `getFrom()`
- `getId(): ?int` - Returns the unique identifier for the user or bot (up to 52 significant bits, safe for 64-bit integers or double-precision floats).
- `isBot(): bool` - Returns `true` if the sender is a bot.
- `getFirstName(): ?string` - Returns the sender's first name.
- `getLastName(): ?string` - Returns the sender's last name, if available.
- `getFullName(): ?string` - Returns the sender's full name (combines first and last names, if available).
- `getUsername(): ?string` - Returns the sender's username, if available.
- `getLanguageCode(): ?string` - Returns the IETF language tag of the sender's language, if available.
- `isPremium(): bool` - Returns `true` if the sender is a Telegram Premium user.
- `addedToAttachmentMenu(): bool` - Returns `true` if the sender added the bot to their attachment menu.

#### Example
To retrieve the sender's username:
```php
$username = Bot::getMessage()->getFrom()->getUsername();
```

### 7. `getChat()`
Returns an object representing the chat where the message was sent, as described by the Telegram API: "Chat the message belongs to."

#### Available Methods for `getChat()`
- `getId(): ?int` - Returns the unique identifier for the chat.
- `getType(): ?string` - Returns the type of the chat (`'private'`, `'group'`, `'supergroup'`, or `'channel'`).
- `getTitle(): ?string` - Returns the title of the chat (for supergroups, channels, or group chats).
- `getUsername(): ?string` - Returns the chat's username, if available (for private chats, supergroups, or channels).
- `getFirstName(): ?string` - Returns the first name of the other party in a private chat, if available.
- `getLastName(): ?string` - Returns the last name of the other party in a private chat, if available.
- `getFullName(): ?string` - Returns the full name of the other party in a private chat (combines first and last names, if available).
- `isForum(): bool` - Returns `true` if the supergroup chat has topics enabled.

#### Example
To retrieve the chat ID:
```php
$chat_id = Bot::getMessage()->getChat()->getId();
```


### 8. `isReply(): bool`
Returns `true` if the message is a reply to another message.

#### Example
```php
if (Bot::getMessage()->isReply()) {
    // Handle reply message
}
```

### 9. `hasQuote(): bool`
Returns `true` if the message contains a quoted text.

#### Example
```php
if (Bot::getMessage()->hasQuote()) {
    // Handle message with quote
}
```

### 10. `getQuote(): ?TextQuote`
Returns an instance of the `TextQuote` class representing the quoted text in the message, or `null` if no quote exists.

#### Example
```php
$quote = Bot::getMessage()->getQuote();
if ($quote) {
    // Process the quoted text
}
```

### 11. `getReplyToMessage(): ?GetMessage`
Returns the message that the current message is replying to, if it exists. If the message is not a reply, this method returns `null`. The returned object is an instance of the `GetMessage` class, allowing access to the same methods as the original message.

#### Example
```php
$reply_message = Bot::getMessage()->getReplyToMessage();

if ($reply_message) {
    // Process the replied-to message
    $reply_text = $reply_message->getText();
    $content_type = $reply_message->getContentType();
}
```

### 12. `deleteThisMessage(): bool`
Deletes the current message from the chat. This method uses the message's ID and the chat's ID to perform the deletion via the `Bot::deleteMessage()` method.

#### Example
```php
Bot::getMessage()->deleteThisMessage();
```

## Notes
- The `getMessage` method is designed to handle messages received via Telegram webhooks, providing a structured way to access message details.
- Use `getContentType()` to determine the type of message content and handle it appropriately in your bot logic.
- The `getFrom()` and `getChat()` methods provide detailed information about the sender and the chat context, respectively, aligning with Telegram's API specifications.
- The event type check methods (e.g., `isCallbackQuery()`, `isEditedMessage()`) rely on the `GetEvent` class and are useful for filtering specific event types.
- The `getMessageId()` and `getDate()` methods are useful for tracking and logging messages.
- The `getText()` and `getCaption()` methods provide access to textual content, while `getQuote()` and `hasQuote()` allow handling of quoted messages.
- For more details on the `User` and `Chat` objects, refer to the Telegram API documentation: [User](https://core.telegram.org/bots/api#user) and [Chat](https://core.telegram.org/bots/api#chat).