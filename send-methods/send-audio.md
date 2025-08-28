# Send Audio In Telegram Bot

Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the **.MP3** or **.M4A** format. On success, the sent Message is returned. Bots can currently send audio files of up to **50 MB** in size

The `Audio` class is used to send audio files and provides a chainable interface the audio message.


## Basic Useing Audio Class
```PHP
use Botfire\Models\Audio;

$audio = Audio::create('URL Or file_id');
$audio->chatId(123456789);
$audio->caption('This is audio caption');**
$audio->send();
```

To send an image that is located on our server:

```php
$audio_file = Bot::inputFile(realpath('public/files/audios/test-audio.mp3'))

Audio::create($audio_file)
    ->chatId(12345678)
    ->send();
```

## available methods:
| Method Name                        | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `businessConnectionId(string $business_connection_id)` | Sets the business connection id for the message.                                                     |
| `chatId(string\|int $chat_id)`      | Sets the `chat_id` for the message.                                                                     |
| `messageThreadId(int $message_thread_id)` | Specifies the message thread ID for sending in a thread.                                                |
| `duration(int $duration)`           | Sets Duration of sent audio in seconds                                                                  |
| `parseMode(string $parse_mode)`      | Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).                               |
| `caption(string\|MarkdownBuilder $caption)` | Adds a caption to the audio. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`. |
| `captionEntities($caption_entities)` | Specifies entities for the caption (e.g., for custom formatting).                                         |
| `entities($entities)`              | Sets entities for the message content.                                                                   |
| `disableNotification(bool $disable_notification)` | Disables notifications for the message if set to `true`.                                                   |
| `protectContent(bool $protect_content)` | Protects the content from being forwarded or saved if set to `true`.                                       |
| `allowPaidBroadcast(bool $allow_paid_broadcast)` | Allows the message to be sent as a paid broadcast if set to `true`.                                         |
| `messageEffectId(string $message_effect_id)` | Sets a message effect ID for visual effects.                                                            |
| `replyParameters($reply_parameters)` | Configures reply parameters for the message.                                                             |
| `replyMarkup(InlineKeyboard\|ReplyKeyboard $reply_markup)` | Adds a custom keyboard or inline buttons to the message.  [See the keyboard documentation](/keyboards.md) |
## Example with Advanced Options

```php
use Botfire\Bot;
use Botfire\Models\Audio;
use Botfire\Helper\ParseMode;
use Botfire\Keyboards\InlineKeyboard;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'action_click'),
    InlineButton::link('Visit Website', 'https://example.com'),
]);

Audio::create('https://example.com/sample-audio.mp3')
      ->chatId(123456789)
      ->caption('Check out this **audio**')
      ->parseMode(ParseMode::MarkdownV2)
      ->disableNotification(true)
      ->replyMarkup($keyboard)
      ->send();
```