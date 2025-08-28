# Send Photo Message in Telegram Bot

We use the `Photo` class for send images. We can set a caption, keyboards and other supported methods for it.


## Basic Usage : Send a photo

In the example below, we send a photo using its link within the Telegram bot:

```php
use Botfire\Photo;

// Send a photo using a URL
Photo::create('https://your-site.com/test.png')
    ->chatId(123456789)
    ->send();
```

To send an image that is located on our server:

```php
$image_file = Bot::inputFile(realpath('public/files/images/test.jpg'))

Photo::create($image_file)
    ->chatId(12345678)
    ->send();
```

Or, the image can be sent using its file_id :

```php
Photo::create('AgACAgIAAxkBAAIB...')
    ->chatId(12345678)
    ->send();
```
> [!NOTE]
> Explanation of the `file_id`:  
>  > When a user uploads and sends an image inside the Telegram bot, Telegram generates an identifier for that image called "file_id", which makes reusing that image easier.


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
$photo->send();
```

**Available Parse Modes** (defined in `ParseMode` class):
- `ParseMode::Markdown`
- `ParseMode::HTML`
- `ParseMode::MarkdownV2`

### Photo Class Methods

The `Photo` class provides a chainable interface to customize the photo message. Below is a detailed list of available methods, organized for clarity:
| Method Name                | Description                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------|
| `businessConnectionId($id)` | Sets the business connection ID for the message.                                                                  |
| `chatId(int\|string $chat_id)`          | Sets the `chat_id` for the message.                                                                               |
| `messageThreadId($id)`      | Specifies the message thread ID for sending in a thread.                                                          |
| `parseMode($mode)`          | Sets the parse mode for the caption (`Markdown`, `MarkdownV2`, or `HTML`).                                        |
| `caption($text)`            | Adds a caption to the photo. If a `MarkdownBuilder` instance is provided, it automatically sets `parseMode`.      |
| `captionEntities($entities)`| Specifies entities for the caption (e.g., for custom formatting).                                                |
| `entities($entities)`       | Sets entities for the message content.                                                                            |
| `linkPreviewOptions($options)`| Configures link preview options for the message, such as enabling or disabling link previews.                      |
| `disableNotification($bool)`| Disables notifications for the message if set to `true`.                                                          |
| `protectContent($bool)`     | Protects the content from being forwarded or saved if set to `true`.                                              |
| `allowPaidBroadcast($bool)` | Allows the message to be sent as a paid broadcast if set to `true`.                                               |
| `messageEffectId($id)`      | Sets a message effect ID for visual effects.                                                                      |
| `hasSpoiler($bool)`         | Marks the photo as a spoiler, blurring it until viewed if set to `true`.                                          |
| `showCaptionAboveMedia($bool)`| Displays the caption above the photo if set to `true`.                                                           |
| `replyParameters($params)`  | Configures reply parameters for the message.                                                                      |
| `replyMarkup($markup)`      | Adds a custom keyboard or inline buttons to the message. See [keyboard documentation](/keyboards.md) for details. |
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
      ->replyMarkup($keyboard)
      ->send();

```

