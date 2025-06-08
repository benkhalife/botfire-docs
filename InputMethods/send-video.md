# BotFire : sendVideo Methods Documation

the `sendMethod` the **BotFire** library is designed to send videos via a Telegram Bot.
It offers a flexible interface to send images either by passing a URL or file_id as a string or useing the `Video` class for advanced control over the message.


## Method signature

```php
use Botfire\Bot;
Bot::sendVideo(Video|string $video);
```

 - **Parameter**: `$video` - Accepts either a string (URL or Telegram file_id of the video) or an instance of the `Video` class.

 #### Supported Video Formats

- Formats: MP4, MOV, or other Telegram-supported formats.
- Maximum file size: 50 MB for bots (as per Telegram API limits, subject to change).

> [!NOTE]
> [See Telegram's sendVideo documentation](https://core.telegram.org/bots/api#sendvideo)
 
 ### Simple Usage

 For basic video sendig, you can pass a string containing either the URL of the video or its Telegram `file_id`. If the `chat_id` is not specified, the BotFire automatically assigns the current client's `chat_id`.

 ```php
use Botfire\Bot;

// Send a video using a URL
Bot::sendVideo('https://example.com/sample-video.mp4');

Bot::sendVideo('AgACAgIAAxkBAAIB...');
 ```

You can also send a local file from the server useing the `Bot::inputFile` method:

```php
$file = Bot::inputFile('image-video.jpg');

Bot::sendVideo($file);
```




## Video Class Methods
The `Video` class provides a chainable interface to customize the video message.

### Basic Useing Video Class

```php
use Botfire\Bot;
use Botfire\Models\Video;

$video = Video::create('URL Or file_id');
$video->chatId(123456789);
$video->caption('This is video');
```

### Below is a detailed list of available methods:

 - **businessConnectionId(string $business_connection_id)**  
 Sets the business connection id for the message.  
  `Example: $video->businessConnectionId('biz_123');`

- **`chatId(string|int $chat_id)`**  
Sets the `chat_id` for the message.  
`Example: $video->chatId(123456789)`

- **messageThreadId(int $message_thread_id)**  
Specifies the message thread ID for sending in a thread.  
*Example*: `$video->messageThreadId(456);`

- **duration(int $duration)**  
Sets Duration of sent video in seconds  
*Example*: `$video->duration(10)`

- **width(int $width)**  
Sets Video width  
*Example*: `$video->width(400)`

- **height(int $height)**  
Sets Video height  
*Example*: `$video->height(400)`

- **cover($cover)**  
Sets Cover for the video in the message

- **startTimestamp(int start_timestamp)**  
Start timestamp for the video in the message


- **parseMode(string $parse_mode)**  
  Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).  
  *Example*: `$video->parseMode(ParseMode::MarkdownV2);`

- **caption(string|MarkdownBuilder $caption)**  
  Adds a caption to the video. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`.  
  *Example*: `$video->caption('This is a *bold* caption.');`

- **captionEntities($caption_entities)**  
  Specifies entities for the caption (e.g., for custom formatting).  
  *Example*: `$video->captionEntities([['type' => 'bold', 'offset' => 0, 'length' => 4]]);`

- **entities($entities)**  
  Sets entities for the message content.  
  *Example*: `$video->entities([['type' => 'text_link', 'offset' => 0, 'length' => 4, 'url' => 'https://example.com']]);`

- **disableNotification(bool $disable_notification)**  
  Disables notifications for the message if set to `true`.  
  *Example*: `$video->disableNotification(true);`

- **protectContent(bool $protect_content)**  
  Protects the content from being forwarded or saved if set to `true`.  
  *Example*: `$video->protectContent(true);`

- **allowPaidBroadcast(bool $allow_paid_broadcast)**  
  Allows the message to be sent as a paid broadcast if set to `true`.  
  *Example*: `$video->allowPaidBroadcast(true);`

- **messageEffectId(string $message_effect_id)**  
  Sets a message effect ID for visual effects.  
  *Example*: `$video->messageEffectId('effect_789');`

- **hasSpoiler(bool $has_spoiler)**  
  Marks the video as a spoiler, blurring it until viewed if set to `true`.  
  *Example*: `$video->hasSpoiler(true);`

- **showCaptionAboveMedia(bool $show_caption_above_media)**  
  Displays the caption above the video if set to `true`.  
  *Example*: `$video->showCaptionAboveMedia(true);`

- **replyParameters($reply_parameters)**  
  Configures reply parameters for the message.  
  *Example*: `$video->replyParameters(['message_id' => 123]);`

- **replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)**  
  Adds a custom keyboard or inline buttons to the message.  
[See the keyboard documentation](/keyboards.md)


### Example with Advanced Options

```php
use Botfire\Bot;
use Botfire\Models\Video;
use Botfire\Helper\ParseMode;
use Botfire\Keyboards\InlineKeyboard;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'action_click'),
    InlineButton::link('Visit Website', 'https://example.com'),
]);

$video = Video::create('https://example.com/sample-video.mp4');
$video->chatId(123456789)
      ->caption('Check out this *video*')
      ->parseMode(ParseMode::MarkdownV2)
      ->disableNotification(true)
      ->hasSpoiler(true)
      ->replyMarkup($keyboard);

Bot::sendVideo($video);
```