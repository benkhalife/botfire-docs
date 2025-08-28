# Send Document in Telegram Bot

Use the `Document` class to send general files.  
 Bots can currently send files of any type of up to **50 MB** in size, 

## Basic usage


```php
use Botfire\Models\Document;

$doc = Document::create('https://your-site.com/test.pdf');

$doc->chatId(123456789)
    ->caption('This is a test document.')
    ->send();
```

### Example: Sending a Local File

To send a document stored on your server, use the `Bot::inputFile` method to create a file reference, then pass it to the `Document` class.

```php
use Botfire\Models\Document;

$file = Bot::inputFile('path/to/mydocument.pdf');

Document::create($file)
   ->chatId(123456789)
   ->caption('This is a test document with a caption.')
   ->send();
```

## Document Class Methods

The `Document` class provides a variety of methods to customize the document message. Below is a list of available methods:

| Method Name                        | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `businessConnectionId(string $business_connection_id)` | Sets the business connection ID for the message.                                                     |
| `messageThreadId(int $message_thread_id)` | Specifies the message thread ID for sending the document in a specific thread.                               |
| `parseMode(string $parse_mode)`      | Sets the parse mode for the caption (`HTML`, `Markdown`, or `MarkdownV2`).                               |
| `caption(string\|MarkdownBuilder $caption)` | Adds a caption to the document. If a `MarkdownBuilder` object is provided, it automatically sets the parse mode to `MarkdownV2`. |
| `captionEntities($caption_entities)` | Specifies entities for the caption (e.g., for custom formatting).                                         |
| `disableNotification(bool $disable_notification)` | Sends the message silently if set to `true`.                                                   |
| `protectContent(bool $protect_content)` | Protects the content from being forwarded or saved if set to `true`.                                       |
| `allowPaidBroadcast(bool $allow_paid_broadcast)` | Allows the message to be sent as a paid broadcast if set to `true`.                                         |
| `messageEffectId(string $message_effect_id)` | Sets a visual effect ID for the message.                                                            |
| `replyParameters($reply_parameters)` | Configures reply parameters (e.g., to reply to a specific message).                                          |
| `replyMarkup(InlineKeyboard\|ReplyKeyboard $reply_markup)` | Adds an inline or reply keyboard to the message.                                                        |
| `thumbnail($thumbnail)`          | Sets a thumbnail for the file (ignored if the file is not uploaded using `multipart/form-data`).          |


## Example: Sending a Document with Markdown Caption

To format the caption using Markdown, use the `parseMode` method with one of the supported parse modes (`HTML`, `Markdown`, or `MarkdownV2`). The `ParseMode` class provides constants for convenience.

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Models\Document;

$file = Bot::inputFile('path/to/mydocument.pdf');

$doc = Document::create($file);
$doc->chatId(123456789);
$doc->caption('This is a *test document* with a _caption_.');
$doc->parseMode(ParseMode::MarkdownV2);
$doc->send();
```

### Supported Parse Modes

The `parseMode` method accepts one of the following values, available as constants in the `ParseMode` class:

- `ParseMode::HTML`: For HTML-formatted captions.
- `ParseMode::Markdown`: For legacy Markdown-formatted captions.
- `ParseMode::MarkdownV2`: For enhanced MarkdownV2-formatted captions.
