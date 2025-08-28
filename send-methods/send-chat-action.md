
# Send Chat Action

The `ChatAction` class in the **BotFire** PHP library allows Telegram bots to send chat actions, indicating to users that the bot is performing a specific task, such as typing or uploading a file.  

## Basic Usage

```php
use Botfire\Models\ChatAction;

ChatAction::create(ChatAction::TYPEING)
    ->chatId(123456789);
    ->send();
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
use Botfire\Models\ChatAction;

ChatAction::create(ChatAction::RECORD_VIDEO)->chatId(123456789)->send();

```

## ChatAction Class Methods

| Method Name                        | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `businessConnectionId(string $business_connection_id)` | Sets the business connection ID for the action.                                                      |
| `messageThreadId(int $message_thread_id)` | Specifies the message thread ID for sending the action in a specific thread.                               |

