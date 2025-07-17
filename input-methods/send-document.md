# BotFire PHP Library: sendDocument Method

The `sendDocument` method in the **BotFire** PHP library provides a simple and flexible way to send general files (up to 50 MB) via a Telegram bot. This document explains how to use the `sendDocument` method, including its basic and advanced usage, supported parameters, and examples.

## Overview

The `sendDocument` method is a static method of the `Bot` class that sends a document to a Telegram chat. It accepts either a string (representing a file URL or `file_id`) or a `Document` object for advanced configuration. On success, it returns the sent `Message` object.

### Method Signature

```php
use Botfire\Bot;

Bot::sendDocument(Document|CURLFile|string $document);
```

- **Parameter**: `$document` - Can be a string (URL or `file_id`), a `CURLFile`, or a `Document` object.
- **Returns**: The sent `Message` object.
- **File Size Limit**: Up to 50 MB (subject to change by Telegram in the future).

## Basic Usage

For simple document sending, you can pass a string representing either a publicly accessible URL or a Telegram `file_id`. If no `chat_id` is specified, the library automatically sets it to the current client's chat ID.

### Example: Sending a Document via URL or file_id

```php
use Botfire\Bot;

Bot::sendDocument('https://your-site.com/test.pdf');
// or
Bot::sendDocument('YOUR_FILE_ID');
```

In this case, the document is sent to the current chat without additional configuration.

## Advanced Usage with Document Class

For more control over the message, use the `Document` class to configure parameters like `chat_id`, captions, and formatting. The `Document` class provides a fluent interface to customize the document message.

### Example: Sending a Document with Custom Parameters

```php
use Botfire\Bot;
use Botfire\Models\Document;

$doc = Document::create('https://your-site.com/test.pdf');
$doc->chatId(123456789);
$doc->caption('This is a test document.');

Bot::sendDocument($doc);
```

### Example: Sending a Local File

To send a document stored on your server, use the `Bot::inputFile` method to create a file reference, then pass it to the `Document` class.

```php
use Botfire\Bot;
use Botfire\Models\Document;

$file = Bot::inputFile('path/to/mydocument.pdf');

$doc = Document::create($file);
$doc->chatId(123456789);
$doc->caption('This is a test document with a caption.');

Bot::sendDocument($doc);
```

## Document Class Methods

The `Document` class provides a variety of methods to customize the document message. Below is a list of available methods:

- `businessConnectionId(string $business_connection_id)`: Sets the business connection ID for the message.
- `messageThreadId(int $message_thread_id)`: Specifies the message thread ID for sending the document in a specific thread.
- `parseMode(string $parse_mode)`: Sets the parse mode for the caption (`HTML`, `Markdown`, or `MarkdownV2`).
- `caption(string|MarkdownBuilder $caption)`: Adds a caption to the document. If a `MarkdownBuilder` object is provided, it automatically sets the parse mode to `MarkdownV2`.
- `captionEntities($caption_entities)`: Specifies entities for the caption (e.g., for custom formatting).
- `disableNotification(bool $disable_notification)`: Sends the message silently if set to `true`.
- `protectContent(bool $protect_content)`: Protects the content from being forwarded or saved if set to `true`.
- `allowPaidBroadcast(bool $allow_paid_broadcast)`: Allows the message to be sent as a paid broadcast if set to `true`.
- `messageEffectId(string $message_effect_id)`: Sets a visual effect ID for the message.
- `replyParameters($reply_parameters)`: Configures reply parameters (e.g., to reply to a specific message).
- `replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)`: Adds an inline or reply keyboard to the message.
- `thumbnail($thumbnail)`: Sets a thumbnail for the file (ignored if the file is not uploaded using `multipart/form-data`).

### Example: Sending a Document with Markdown Caption

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

Bot::sendDocument($doc);
```

### Supported Parse Modes

The `parseMode` method accepts one of the following values, available as constants in the `ParseMode` class:

- `ParseMode::HTML`: For HTML-formatted captions.
- `ParseMode::Markdown`: For legacy Markdown-formatted captions.
- `ParseMode::MarkdownV2`: For enhanced MarkdownV2-formatted captions.

### Example: Adding a Keyboard and Disabling Notifications

```php
use Botfire\Bot;
use Botfire\Models\Document;
use Botfire\Models\InlineKeyboard;

$file = Bot::inputFile('path/to/mydocument.pdf');

$keyboard = InlineKeyboard::create()->addButton('Visit Website', 'https://your-site.com');

$doc = Document::create($file);
$doc->chatId(123456789);
$doc->caption('Download this document!');
$doc->replyMarkup($keyboard);
$doc->disableNotification(true);

Bot::sendDocument($doc);
```
