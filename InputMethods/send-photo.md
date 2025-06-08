# BotFire : sendPhoto Method Documentation

The `sendPhoto` method in the **BotFire** PHP library is designed to send photos via a Telegram bot. It offers a  flexible interface to send images either by passing a URL or file ID as a string or by using the `Photo` class for advanced control over the message.
## Overview

The `sendPhoto` method enables developers to send photos to Telegram users or chats. It supports both simple and advanced use cases, allowing you to send a photo with minimal code or customize the message with additional parameters like captions, formatting, and reply markups.

### Method Signature

```php
use Botfire\Bot;

Bot::sendPhoto(Photo|string $photo);
```

- **Parameter**: `$photo` - Accepts either a string (URL or Telegram file ID of the photo) or an instance of the `Photo` class.
- **Return**: Sends the photo to the specified chat and returns the result.

### Simple Usage

For basic photo sending, you can pass a string containing either the URL of the photo or its Telegram `file_id`. If the `chat_id` is not specified, the library automatically assigns the current client's `chat_id`.

```php
use Botfire\Bot;

// Send a photo using a URL
Bot::sendPhoto('https://your-site.com/test.png');

// Send a photo using a file ID
Bot::sendPhoto('AgACAgIAAxkBAAIB...');
```

### Advanced Usage with Photo Class

For more control, use the `Photo` class to create a photo message with additional parameters such as captions, chat IDs, or custom formatting.

```php
use Botfire\Bot;
use Botfire\Models\Photo;

// Create a photo message
$photo = Photo::create('https://your-site.com/test.png');
$photo->chatId(123456789); // Specify the chat ID

// Send the photo
Bot::sendPhoto($photo);
```

You can also send a local file from the server using the `Bot::inputFile` method:

```php
use Botfire\Bot;
use Botfire\Models\Photo;

// Load a local file
$file = Bot::inputFile('image-photo.jpg');

// Create a photo message with a caption
$photo = Photo::create($file);
$photo->chatId(123456789);
$photo->caption('This is a test photo with a caption.');

// Send the photo
Bot::sendPhoto($photo);
```

### Using Markdown for Captions

The `Photo` class supports caption formatting using `Markdown`, `MarkdownV2`, or `HTML`. The `ParseMode` helper class provides constants for these formats.

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Models\Photo;

$photo = Photo::create('https://your-site.com/test.png');
$photo->chatId(123456789);
$photo->caption('This is a *bold* test photo with a caption.');
$photo->parseMode(ParseMode::MarkdownV2);

Bot::sendPhoto($photo);
```

**Available Parse Modes** (defined in `ParseMode` class):
- `ParseMode::Markdown`
- `ParseMode::HTML`
- `ParseMode::MarkdownV2`

### Photo Class Methods

The `Photo` class provides a chainable interface to customize the photo message. Below is a detailed list of available methods, organized for clarity:

- **businessConnectionId(string $business_connection_id)**  
  Sets the business connection ID for the message.  
  *Example*: `$photo->businessConnectionId('biz_123');`

- **`chatId(string|int $chat_id)`**  
Sets the `chat_id` for the message.  
`Example: $video->chatId(123456789)`

- **messageThreadId(int $message_thread_id)**  
  Specifies the message thread ID for sending in a thread.  
  *Example*: `$photo->messageThreadId(456);`

- **parseMode(string $parse_mode)**  
  Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).  
  *Example*: `$photo->parseMode(ParseMode::MarkdownV2);`

- **caption(string|MarkdownBuilder $caption)**  
  Adds a caption to the photo. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`.  
  *Example*: `$photo->caption('This is a *bold* caption.');`

- **captionEntities($caption_entities)**  
  Specifies entities for the caption (e.g., for custom formatting).  
  *Example*: `$photo->captionEntities([['type' => 'bold', 'offset' => 0, 'length' => 4]]);`

- **entities($entities)**  
  Sets entities for the message content.  
  *Example*: `$photo->entities([['type' => 'text_link', 'offset' => 0, 'length' => 4, 'url' => 'https://example.com']]);`

- **linkPreviewOptions($link_preview_options)**  
  Configures link preview options for the message, such as enabling or disabling link previews.  
  *Example*: `$photo->linkPreviewOptions(['is_disabled' => true]);`

- **disableNotification(bool $disable_notification)**  
  Disables notifications for the message if set to `true`.  
  *Example*: `$photo->disableNotification(true);`

- **protectContent(bool $protect_content)**  
  Protects the content from being forwarded or saved if set to `true`.  
  *Example*: `$photo->protectContent(true);`

- **allowPaidBroadcast(bool $allow_paid_broadcast)**  
  Allows the message to be sent as a paid broadcast if set to `true`.  
  *Example*: `$photo->allowPaidBroadcast(true);`

- **messageEffectId(string $message_effect_id)**  
  Sets a message effect ID for visual effects.  
  *Example*: `$photo->messageEffectId('effect_789');`

- **hasSpoiler(bool $has_spoiler)**  
  Marks the photo as a spoiler, blurring it until viewed if set to `true`.  
  *Example*: `$photo->hasSpoiler(true);`

- **showCaptionAboveMedia(bool $show_caption_above_media)**  
  Displays the caption above the photo if set to `true`.  
  *Example*: `$photo->showCaptionAboveMedia(true);`

- **replyParameters($reply_parameters)**  
  Configures reply parameters for the message.  
  *Example*: `$photo->replyParameters(['message_id' => 123]);`

- **replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)**  
  Adds a custom keyboard or inline buttons to the message.  
[See the keyboard documentation](/keyboards.md)

### Example with Advanced Options

```php
use Botfire\Bot;
use Botfire\Models\Photo;
use Botfire\Helper\ParseMode;
use Botfire\Keyboards\InlineKeyboard;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'action_click'),
    InlineButton::link('Visit Website', 'https://example.com'),
]);

$photo = Photo::create('https://your-site.com/test.png');
$photo->chatId(123456789)
      ->caption('Check out this *photo*')
      ->parseMode(ParseMode::MarkdownV2)
      ->disableNotification(true)
      ->hasSpoiler(true)
      ->linkPreviewOptions(['is_disabled' => true])
      ->replyMarkup($keyboard);

Bot::sendPhoto($photo);
```

### Notes
- If the `chat_id` is not set, the library automatically uses the `chat_id` of the current client.
- The `Photo` class methods are chainable, allowing for concise and readable code.
- For local files, ensure the file path provided to `Bot::inputFile` is accessible on the server.