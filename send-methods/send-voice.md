# Send Voice Message in Telegram Bot

Use the `Voice` class to send audio files, if you want Telegram clients to display the file as a playable voice message.  

 For this to work, your audio must be in an **.OGG** file encoded with OPUS, or in **.MP3** format, or in **.M4A** format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to **50 MB** in size.



## Basic Useing Voice Class

The `Voice` class provides a chainable interface the voice message.

```PHP
use Botfire\Models\Voice;

Voice::create('URL Or file_id')
    ->chatId(123456789)
    ->caption('This is voice')
    ->send();
```   
## available Method Documentation
 Below is a detailed list of available methods:

| Method Name                   | Description                                                                                             |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| `businessConnectionId(string $business_connection_id)` | Sets the business connection id for the message. |
| `chatId(string\|int $chat_id)`     | Sets the `chat_id` for the message.                             |
| `messageThreadId(int $message_thread_id)` | Specifies the message thread ID for sending in a thread.     |
| `duration(int $duration)`        | Sets Duration of sent voice in seconds  |
| `parseMode(string $parse_mode)`   | Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).|
| `caption(string\|MarkdownBuilder $caption)` | Adds a caption to the voice. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`. |
| `captionEntities($caption_entities)` | Specifies entities for the caption (e.g., for custom formatting).|
| `entities($entities)`           | Sets entities for the message content.|
| `disableNotification(bool $disable_notification)` | Disables notifications for the message if set to `true`. |
| `protectContent(bool $protect_content)` | Protects the content from being forwarded or saved if set to `true`. |
| `allowPaidBroadcast(bool $allow_paid_broadcast)` | Allows the message to be sent as a paid broadcast if set to `true`.|
| `messageEffectId(string $message_effect_id)` | Sets a message effect ID for visual effects. |
| `replyParameters($reply_parameters)` | Configures reply parameters for the message.|
| `replyMarkup(InlineKeyboard\|ReplyKeyboard $reply_markup)` | Adds a custom keyboard or inline buttons to the message. [See the keyboard documentation](/keyboards.md) |


## Example with Advanced Options

```php
use Botfire\Bot;
use Botfire\Models\Voice;
use Botfire\Helper\ParseMode;
use Botfire\Keyboards\InlineKeyboard;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'action_click'),
    InlineButton::link('Visit Website', 'https://example.com'),
]);

$voice = Voice::create('https://example.com/sample-voice.mp3');
$voice->chatId(123456789)
      ->caption('Check out this *voice*')
      ->parseMode(ParseMode::MarkdownV2)
      ->disableNotification(true)
      ->replyMarkup($keyboard)
      ->send();
```