# BotFire PHP Library: sendChatAction Method

The `sendChatAction` method in the **BotFire** PHP library allows Telegram bots to send chat actions, indicating to users that the bot is performing a specific task, such as typing or uploading a file. This document provides a detailed guide on how to use the `sendChatAction` method, including its usage, supported parameters, and examples.

## Overview

The `sendChatAction` method is a static method of the `Bot` class that sends a chat action to a Telegram chat. It accepts either a string (representing the action type) or a `ChatAction` object for additional configuration. This method is useful for improving user experience by showing an action indicator (e.g., "typing...") in the chat while the bot processes a request.

### Method Signature

```php
use Botfire\Bot;

Bot::sendChatAction(ChatAction|string $action);
```

- **Parameter**: `$action` - Can be a string (one of the predefined action types) or a `ChatAction` object.
- **Returns**: The result of the Telegram API call.

## Basic Usage

For simple use cases, you can pass a string representing one of the predefined action types directly to the `sendChatAction` method. If no `chat_id` is specified, the library automatically sets it to the current client's chat ID.

### Example: Sending a Typing Action

```php
use Botfire\Bot;
use Botfire\Models\ChatAction;

Bot::sendChatAction(ChatAction::TYPEING);
```

This sends a "typing" indicator to the current chat.

## Advanced Usage with ChatAction Class

For more control, use the `ChatAction` class to configure parameters like `chat_id` or `message_thread_id`. The `ChatAction` class provides a fluent interface to customize the action.

### Example: Sending a Chat Action with Custom Parameters

```php
use Botfire\Bot;
use Botfire\Models\ChatAction;

$action = ChatAction::create(ChatAction::UPLOAD_DOCUMENT);
$action->chatId(123456789);

Bot::sendChatAction($action);
```

## Supported Action Types

The `ChatAction` class includes predefined constants for the supported action types. These constants simplify usage and ensure correct values are passed to the Telegram API. The available action types are:

- `ChatAction::TYPEING`: Displays "typing..." in the chat.
- `ChatAction::UPLOAD_PHOTO`: Indicates the bot is uploading a photo.
- `ChatAction::RECORD_VIDEO`: Shows the bot is recording a video.
- `ChatAction::UPLOAD_VIDEO`: Indicates the bot is uploading a video.
- `ChatAction::RECORD_VOICE`: Shows the bot is recording a voice message.
- `ChatAction::UPLOAD_VOICE`: Indicates the bot is uploading a voice message.
- `ChatAction::UPLOAD_DOCUMENT`: Shows the bot is uploading a document.
- `ChatAction::CHOOSE_STICKER`: Indicates the bot is choosing a sticker.
- `ChatAction::FIND_LOCATION`: Shows the bot is finding a location.
- `ChatAction::RECORD_VIDEO_NOTE`: Indicates the bot is recording a video note.
- `ChatAction::UPLOAD_VIDEO_NOTE`: Shows the bot is uploading a video note.

### Example: Using a Different Action Type

```php
use Botfire\Bot;
use Botfire\Models\ChatAction;

$action = ChatAction::create(ChatAction::RECORD_VIDEO);
$action->chatId(123456789);

Bot::sendChatAction($action);
```

## ChatAction Class Methods

The `ChatAction` class provides the following methods to customize the chat action:

- `businessConnectionId(string $business_connection_id)`: Sets the business connection ID for the action.
- `messageThreadId(int $message_thread_id)`: Specifies the message thread ID for sending the action in a specific thread.

### Example: Sending a Chat Action in a Message Thread

```php
use Botfire\Bot;
use Botfire\Models\ChatAction;

$action = ChatAction::create(ChatAction::UPLOAD_PHOTO);
$action->chatId(123456789);
$action->messageThreadId(456);

Bot::sendChatAction($action);
```

## Notes

- The library automatically handles the `chat_id` if not explicitly set, using the current client's chat ID.
- Use the predefined constants in the `ChatAction` class to avoid errors with action types.
- Chat actions are temporary indicators and do not persist in the chat history.
- This method is particularly useful for providing real-time feedback to users during long-running tasks, such as file uploads or message processing.

This documentation provides a comprehensive guide to using the `sendChatAction` method in the BotFire library, covering both basic and advanced use cases for sending chat actions in Telegram bots.