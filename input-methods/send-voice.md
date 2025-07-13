# BotFire : sendVoice Methods Documation

the `sendVoice` the **BotFire** library is designed to send voice via a Telegram Bot.
It offers a flexible interface to send voices either by passing a URL or file_id as a string or useing the `Voice` class for advanced control over the message.

# Method signature

```PHP
use Botfire\Bot;
Bot::sendVoice(Voice|string $voice);
```

- Parameter: `$voice` Accepts either a string (URL or Telegram file_id of the voice) or an instance of the `Voice` class

### Supported Voice Formats
- Formats: OGG file encoded with OPUS, MP3, M4A
- Maximum file size: 50 MB for bots(as Telegram API limits)

> [!NOTE]
> [See Telegram's sendVoice documentation](https://core.telegram.org/bots/api#sendVoice)

### Simple Usage

For basic voice sendig, you can pass a string containing either the URL of the voice or its Telegram `file_id`. if the `chat_id` is not specified, the Botfire automatically assigns the current client's `chat_id`

```PHP
use Botfire\Bot;

// Send a voice using a URL
Bot::sendVoice('https://example.com/sample-voice.mp3');

// Send a voice using a file_id
Bot::sendVoice('AgACAgIAAxkBAAIB...');
```

## Voice Class Methods
The `Voice` class provides a chainable interface the voice message.

### Basic Useing Voice Class
```PHP
use Botfire\Bot;
use Botfire\Models\Voice;

$voice = Voice::create('URL Or file_id');
$voice->chatId(123456789);
$voice->caption('This is voice');
```

### Below is a detailed list of available methods:

- **businessConnectionId(string $business_connection_id)**
Sets the business connection id for the message.  
`Example: $voice->businessConnectionId('biz_123');`


- **`chatId(string|int $chat_id)`**  
Sets the `chat_id` for the message.  
`Example: $voice->chatId(123456789)`

- **messageThreadId(int $message_thread_id)**  
Specifies the message thread ID for sending in a thread.  
*Example*: `$voice->messageThreadId(456);`

- **duration(int $duration)**  
Sets Duration of sent voice in seconds  
*Example*: `$voice->duration(10)`


- **parseMode(string $parse_mode)**  
  Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).  
  *Example*: `$voice->parseMode(ParseMode::MarkdownV2);`

- **caption(string|MarkdownBuilder $caption)**  
  Adds a caption to the voice. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`.  
  *Example*: `$voice->caption('This is a *bold* caption.');`

- **captionEntities($caption_entities)**  
  Specifies entities for the caption (e.g., for custom formatting).  
  *Example*: `$voice->captionEntities([['type' => 'bold', 'offset' => 0, 'length' => 4]]);`

- **entities($entities)**  
  Sets entities for the message content.  
  *Example*: `$voice->entities([['type' => 'text_link', 'offset' => 0, 'length' => 4, 'url' => 'https://example.com']]);`

- **disableNotification(bool $disable_notification)**  
  Disables notifications for the message if set to `true`.  
  *Example*: `$voice->disableNotification(true);`

- **protectContent(bool $protect_content)**  
  Protects the content from being forwarded or saved if set to `true`.  
  *Example*: `$voice->protectContent(true);`

- **allowPaidBroadcast(bool $allow_paid_broadcast)**  
  Allows the message to be sent as a paid broadcast if set to `true`.  
  *Example*: `$voice->allowPaidBroadcast(true);`

- **messageEffectId(string $message_effect_id)**  
  Sets a message effect ID for visual effects.  
  *Example*: `$voice->messageEffectId('effect_789');`

- **replyParameters($reply_parameters)**  
  Configures reply parameters for the message.  
  *Example*: `$voice->replyParameters(['message_id' => 123]);`

- **replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)**  
  Adds a custom keyboard or inline buttons to the message.  
[See the keyboard documentation](/keyboards.md)


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
      ->replyMarkup($keyboard);

Bot::sendVoice($voice);
```