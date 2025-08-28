# Send Video Message in Telegram Bot


Use the `Video` class to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, Bots can currently send video files of up to 50 MB in size

The `Video` class provides a chainable interface to customize the video message.

### Basic Useing Video Class

```php
use Botfire\Bot;
use Botfire\Models\Video;

$video = Video::create('URL Or file_id')
             ->chatId(123456789);
             ->caption('This is video')
             ->send();
```

To send an image that is located on our server:

```php
$video_file = Bot::inputFile(realpath('public/files/audios/test-video.mp4'))

Video::create($video_file)
    ->chatId(12345678)
    ->send();
```


### Below is a detailed list of available methods:
| Method Name                     | Description                                                                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `businessConnectionId(string $business_connection_id)` | Sets the business connection id for the message. |
| `chatId(string\|int $chat_id)`       | Sets the `chat_id` for the message.                                              |
| `messageThreadId(int $message_thread_id)` | Specifies the message thread ID for sending in a thread.                     |
| `duration(int $duration)`          | Sets Duration of sent video in seconds                                                 |
| `width(int $width)`               | Sets Video width                                                                          |
| `height(int $height)`             | Sets Video height                                                              |
| `cover($cover)`                  | Sets Cover for the video in the message                                                                                                 |
| `startTimestamp(int start_timestamp)` | Start timestamp for the video in the message                                                                                         |
| `parseMode(string $parse_mode)`    | Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).  |
| `caption(string\|MarkdownBuilder $caption)` | Adds a caption to the video. If a [`MarkdownBuilder`](/markdown-builder.md) instance is provided, it automatically sets `parseMode` to `MarkdownV2`. |
| `captionEntities($caption_entities)` | Specifies entities for the caption (e.g., for custom formatting). |
| `entities($entities)`             | Sets entities for the message content.  <br> *Example*: ` $video->entities([['type' => 'text_link', 'offset' => 0, 'length' => 4, 'url' => 'https://example.com']]);`|
| `disableNotification(bool $disable_notification)` | Disables notifications for the message if set to `true`.                          |
| `protectContent(bool $protect_content)` | Protects the content from being forwarded or saved if set to `true`.                      |
| `allowPaidBroadcast(bool $allow_paid_broadcast)` | Allows the message to be sent as a paid broadcast if set to `true`.                       |
| `messageEffectId(string $message_effect_id)` | Sets a message effect ID for visual effects.                               |
| `hasSpoiler(bool $has_spoiler)`      | Marks the video as a spoiler, blurring it until viewed if set to `true`.                       |
| `showCaptionAboveMedia(bool $show_caption_above_media)` | Displays the caption above the video if set to `true`.                             |
| `replyParameters($reply_parameters)` | Configures reply parameters for the message.                          |
| `replyMarkup(InlineKeyboard\|ReplyKeyboard $reply_markup)` | Adds a custom keyboard or inline buttons to the message.  [See the keyboard documentation](/keyboards.md)                 |

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
      ->replyMarkup($keyboard)
      ->send();

```