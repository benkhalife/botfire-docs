# BotFire : sendAudio Methods Documation

the `sendAudio` the **BotFire** library is designed to send audio via a Telegram Bot.
It offers a flexible interface to send audios either by passing a URL or file_id as a string or useing the `Audio` class for advanced control over the message.

# Method signature

```PHP
use Botfire\Bot;
Bot::sendAudio(Audio|string $audio);
```

- Parameter: `$audio` Accepts either a string (URL or Telegram file_id of the audio) or an instance of the Audio class

### Supported Audio Formats
- Formats: MP3, M4A
- Maximum file size: 50 MB for bots(as Telegram API limits)

> [!NOTE]
> [See Telegram's sendAudio documentation](https://core.telegram.org/bots/api#sendAudio)

### Simple Usage

For basic audio sendig, you can pass a string containing either the URL of the audio or its Telegram `file_id`. if the `chat_id` is not specified, the Botfire automatically assigns the current client's `chat_id`

```PHP
use Botfire\Bot;

// Send a audio using a URL
Bot::sendAudio('https://example.com/sample-audio.mp4');

Bot::sendAudio('AgACAgIAAxkBAAIB...');
```

## Audio Class Methods
The `Audio` class provides a chainable interface the audio message.

### Basic Useing Audio Class
```PHP
use Botfire\Bot;
use Botfire\Models\Audio;

$audio = Audio::create('URL Or file_id');
$audio->chatId(123456789);
$audio->caption('This is audio');
```

### Below is a detailed list of available methods:

- **businessConnectionId(string $business_connection_id)**
Sets the business connection id for the message.  
`Example: $audio->businessConnectionId('biz_123');`


- **`chatId(string|int $chat_id)`**  
Sets the `chat_id` for the message.  
`Example: $audio->chatId(123456789)`

- **messageThreadId(int $message_thread_id)**  
Specifies the message thread ID for sending in a thread.  
*Example*: `$audio->messageThreadId(456);`

- **duration(int $duration)**  
Sets Duration of sent audio in seconds  
*Example*: `$audio->duration(10)`


- **parseMode(string $parse_mode)**  
  Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).  
  *Example*: `$audio->parseMode(ParseMode::MarkdownV2);`

- **caption(string|MarkdownBuilder $caption)**  
  Adds a caption to the audio. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`.  
  *Example*: `$audio->caption('This is a *bold* caption.');`

- **captionEntities($caption_entities)**  
  Specifies entities for the caption (e.g., for custom formatting).  
  *Example*: `$audio->captionEntities([['type' => 'bold', 'offset' => 0, 'length' => 4]]);`

- **entities($entities)**  
  Sets entities for the message content.  
  *Example*: `$audio->entities([['type' => 'text_link', 'offset' => 0, 'length' => 4, 'url' => 'https://example.com']]);`

- **disableNotification(bool $disable_notification)**  
  Disables notifications for the message if set to `true`.  
  *Example*: `$audio->disableNotification(true);`

- **protectContent(bool $protect_content)**  
  Protects the content from being forwarded or saved if set to `true`.  
  *Example*: `$audio->protectContent(true);`

- **allowPaidBroadcast(bool $allow_paid_broadcast)**  
  Allows the message to be sent as a paid broadcast if set to `true`.  
  *Example*: `$audio->allowPaidBroadcast(true);`

- **messageEffectId(string $message_effect_id)**  
  Sets a message effect ID for visual effects.  
  *Example*: `$audio->messageEffectId('effect_789');`

- **replyParameters($reply_parameters)**  
  Configures reply parameters for the message.  
  *Example*: `$audio->replyParameters(['message_id' => 123]);`

- **replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)**  
  Adds a custom keyboard or inline buttons to the message.  
[See the keyboard documentation](/keyboards.md)


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

$audio = Audio::create('https://example.com/sample-audio.mp3');
$audio->chatId(123456789)
      ->caption('Check out this *audio*')
      ->parseMode(ParseMode::MarkdownV2)
      ->disableNotification(true)
      ->replyMarkup($keyboard);

Bot::sendAudio($audio);
```