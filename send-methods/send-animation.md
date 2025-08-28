# Send Animation Message in Telegram Bot

Use the `Animation` class to send animation files (GIF or H.264/MPEG-4 AVC video without sound).  
Bots can currently send animation files of up to 50 MB in size.


## Basic usage


```php
use Botfire\Models\Animation;

Animation::create('https://your-site.com/test.gif')
    ->chatId(123456789)
    ->caption('This is a test document.')
    ->send();
```



## Available Methods :

The `Animation` class provides a variety of methods to customize the document message. Below is a list of available methods:

| Method Name                        | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `businessConnectionId(string $business_connection_id)` | Unique identifier of the business connection on behalf of which the message will be sent. |
| `messageThreadId(int $message_thread_id)` |  Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only. |
| `duration(int $duration)`           |  Optional. Duration of sent animation in seconds.                                                     |
| `width(int $width)`                | Optional. Animation width.                                                                            |
| `height(int $height)`              | Optional. Animation height.                                                                            |
| `thumbnail(InputFile\|String $thumbnail)` | Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. |
| `caption(string $caption)`         | Optional. Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing. |
| `parse_mode(string $parse_mode)`     | Optional. Mode for parsing entities in the animation caption. See formatting options for more details.         |
| `caption_entities($caption_entities)` | Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode |
| `show_caption_above_media(Boolean $show_caption_above_media)` | Optional. Pass True, if the caption must be shown above the message media |
| `has_spoiler(Boolean $has_spoiler)`  | Optional. Pass True if the animation needs to be covered with a spoiler animation |
| `disable_notification(Boolean $disable_notification)` | Optional. Sends the message silently. Users will receive a notification with no sound. |
| `protect_content(Boolean $protect_content)` | Optional. Protects the contents of the sent message from forwarding and saving |
| `allow_paid_broadcast(Boolean $allow_paid_broadcast)` | Optional. Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot’s balance |
| `message_effect_id(string $message_effect_id)` | Optional. Unique identifier of the message effect to be added to the message; for private chats only |
| `reply_parameters($reply_parameters)` | Optional. Description of the message to reply to |
| `reply_markup(InlineKeyboard\|ReplyKeyboard $reply_markup $reply_markup)` | Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user |



