# BotFire: `sendMessage` Method Documentation

The `sendMessage` method in the BotFire PHP library provides a simple and flexible way to send text messages via a Telegram bot. This method supports both basic text messages and advanced message configurations using the `Message` class for enhanced control over message properties.

## Overview

The `sendMessage` method allows developers to send text messages to Telegram users or channels. It accepts either a simple string or a Message object, allowing for detailed message delivery and customization.

### Method Signature

```php
use Botfire\Bot;

Bot::sendMessage(Message|string $text);
```

- **Parameters**:
  - `$text` (`Message|string`): The message content to be sent. This can be a plain text string or a `Message` object for advanced configurations.
- **Returns**: The result of the send operation, typically a response from the Telegram Bot API.

### Basic Usage

For simple scenarios, you can send a text message directly to the current user (the one who triggered the bot) without specifying a `chat_id`. The BotFire library automatically sets the `chat_id` to the current client's ID if not provided.

```php
use Botfire\Bot;

Bot::sendMessage('Hello From Telegram Bot');
```

This sends the message "Hello From Telegram Bot" to the user who initiated the interaction.

### Advanced Usage with `Message` Class

For more control over the message, use the `Message` class to configure additional properties such as chat ID, parse mode, inline keyboards, and more.

```php
use Botfire\Bot;
use Botfire\Models\Message;

$message = Message::create('Hello From Telegram Bot');
$message->chatId(123456789);

Bot::sendMessage($message);
```

This example sends a message to a specific chat ID (`123456789`), allowing precise targeting of recipients.

## Configuring Messages with the `Message` Class

The `Message` class offers a fluent, chainable interface to customize properties of a message before sending it via the `Bot::sendMessage` method. This allows developers to fine-tune aspects like recipient targeting, text formatting, notifications, and interactive elements. Below is a detailed breakdown of the available configuration methods, designed for clarity and ease of use.

### Available Configuration Methods

- **Set Business Connection ID**  
  `businessConnectionId(string $business_connection_id)`  
  Specifies the unique identifier for a business connection on whose behalf the message is sent.  
  - **Parameter**: `string` – The business connection ID.  
  - **Optional**: Yes  
  - **Example**: `$message->businessConnectionId('biz_12345');`

- **Set Chat ID**  
  `chatId(int|string $chat_id)`  
  Defines the target chat or channel for the message. Use a numeric chat ID or a channel username (e.g., `@channelusername`). If not set, the message defaults to the current client who triggered the bot.  
  - **Parameter**: `int|string` – The chat ID or channel username.  
  - **Optional**: Yes (defaults to current client).  
  - **Example**: `$message->chatId(123456789);` or `$message->chatId('@MyChannel');`

- **Set Message Thread ID**  
  `messageThreadId(int $message_thread_id)`  
  Targets a specific message thread (topic) in forum supergroups.  
  - **Parameter**: `int` – The thread ID.  
  - **Optional**: Yes  
  - **Example**: `$message->messageThreadId(42);`

- **Set Parse Mode**  
  `parseMode(string $parse_mode)`  
  Controls how the message text is formatted. Supported modes are `HTML`, `Markdown`, or `MarkdownV2`. Refer to the [Formatting Options](#formatting-options) section for details.  
  - **Parameter**: `string` – The parse mode (e.g., `ParseMode::MarkdownV2`).  
  - **Optional**: Yes  
  - **Example**: `$message->parseMode(ParseMode::HTML);`

- **Set Message Entities**  
  `entities(array $entities)`  
  Allows manual specification of special entities (e.g., bold, italic, links) in the message text using a JSON-serialized array. Use this instead of `parseMode` for granular control.  
  - **Parameter**: `array` – A JSON-serializable array of entities.  
  - **Optional**: Yes  
  - **Example**: `$message->entities([['type' => 'bold', 'offset' => 0, 'length' => 5]]);`

- **Configure Link Previews**  
  `linkPreviewOptions(LinkPreviewOptions $link_preview_options)`  
  Customizes how link previews are displayed in the message (e.g., enabling/disabling previews or setting preview size).  
  - **Parameter**: `LinkPreviewOptions` – A LinkPreviewOptions object.  
  - **Optional**: Yes  
  - **Example**: `$message->linkPreviewOptions(new LinkPreviewOptions(['is_disabled' => false]));`

- **Disable Notification**  
  `disableNotification(bool $disable_notification)`  
  Sends the message silently, without triggering a notification sound on the recipient’s device.  
  - **Parameter**: `bool` – Set to `true` to disable notification.  
  - **Optional**: Yes  
  - **Example**: `$message->disableNotification(true);`

- **Protect Content**  
  `protectContent(bool $protect_content)`  
  Prevents the message content from being forwarded or saved by recipients.  
  - **Parameter**: `bool` – Set to `true` to protect content.  
  - **Optional**: Yes  
  - **Example**: `$message->protectContent(true);`

- **Allow Paid Broadcast**  
  `allowPaidBroadcast(bool $allow_paid_broadcast)`  
  Enables sending up to 1000 messages per second, bypassing broadcast limits, for a fee of 0.1 Telegram Stars per message.  
  - **Parameter**: `bool` – Set to `true` to allow paid broadcasting.  
  - **Optional**: Yes  
  - **Example**: `$message->allowPaidBroadcast(true);`

- **Set Message Effect**  
  `messageEffectId(string $message_effect_id)`  
  Adds a visual effect to the message (available in private chats only).  
  - **Parameter**: `string` – The effect ID.  
  - **Optional**: Yes  
  - **Example**: `$message->messageEffectId('effect_001');`

- **Set Reply Parameters**  
  `replyParameters(ReplyParameters $reply_parameters)`  
  Specifies details for replying to a specific message (e.g., quoting a message).  
  - **Parameter**: `ReplyParameters` – A ReplyParameters object.  
  - **Optional**: Yes  
  - **Example**: `$message->replyParameters(new ReplyParameters(['message_id' => 123]));`

- **Add Reply Markup**  
  `replyMarkup(InlineKeyboard|ReplyKeyboard $reply_markup)`  
  Attaches an interactive keyboard (inline or reply) to the message for user interaction. See the [Keyboards](#keyboards) section for more details.  
  - **Parameter**: `InlineKeyboard|ReplyKeyboard` – A keyboard object.  
  - **Optional**: Yes  
  - **Example**: `$message->replyMarkup(new InlineKeyboard([InlineButton::button('Click', 'action')]));`

### Usage Example

Here’s an example combining multiple configuration methods for a richly formatted message:

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Keyboard\InlineButton;
use Botfire\Keyboard\InlineKeyboard;
use Botfire\Models\Message;

$message = Message::create('Welcome to my *Telegram* bot!')
    ->chatId(123456789)
    ->parseMode(ParseMode::MarkdownV2)
    ->disableNotification(true)
    ->replyMarkup(
        (new InlineKeyboard())->row([
            InlineButton::button('Click Me', 'action_click'),
            InlineButton::link('Visit Website', 'https://example.com'),
        ])
    );

Bot::sendMessage($message);
```

This configuration sends a Markdown-formatted message to a specific chat, without a notification sound, and includes an inline keyboard with two buttons.

> [!TIP]
> Chain methods fluently to create concise and readable code. For example, `$message->chatId(123)->parseMode(ParseMode::HTML)->disableNotification(true);`

### Formatting Options

The `parseMode` method allows you to format message text using one of three modes: `HTML`, `Markdown`, or `MarkdownV2`. For convenience, the `ParseMode` class provides constants for these values.

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Models\Message;

$message = Message::create('Hello, this is a *test* message!');
$message->chatId(12345678);
$message->parseMode(ParseMode::MarkdownV2);

Bot::sendMessage($message);
```

**Available Parse Modes**:
- `ParseMode::HTML`: Formats text using HTML tags.
- `ParseMode::Markdown`: Formats text using Markdown syntax (legacy).
- `ParseMode::MarkdownV2`: Formats text using the updated MarkdownV2 syntax.

> [!TIP]
> For advanced MarkdownV2 formatting, BotFire provides a Markdown builder. Refer to the [Markdown Builder Documentation](/markdown-builder.html) for details on constructing formatted text programmatically.

### Adding Keyboards


You can enhance messages with interactive keyboards using the `replyMarkup` method. BotFire supports both `InlineKeyboard` and `ReplyKeyboard` for creating custom interfaces.

```php
use Botfire\Bot;
use Botfire\Keyboard\InlineButton;
use Botfire\Keyboard\InlineKeyboard;
use Botfire\Models\Message;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'callback data'),
    InlineButton::link('Open Google', 'https://www.google.com'),
]);

$message = Message::create('Hello, this is a *test* message!');
$message->chatId(12345678);
$message->replyMarkup($keyboard);

Bot::sendMessage($message);
```
> [!TIP]
> For more details on creating and customizing keyboards, refer to the [Keyboards Documentation](/keyboards.html).

## Example Scenarios

### Sending a Simple Message
```php
use Botfire\Bot;

Bot::sendMessage('Welcome to my Telegram bot!');
```

### Sending a Formatted Message with an Inline Keyboard
```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Keyboard\InlineButton;
use Botfire\Keyboard\InlineKeyboard;
use Botfire\Models\Message;

$keyboard = new InlineKeyboard();
$keyboard->row([
    InlineButton::button('Click Me', 'action_click'),
    InlineButton::link('Visit Website', 'https://example.com'),
]);

$message = Message::create('Welcome to my *Telegram* bot!');
$message->chatId(12345678);
$message->parseMode(ParseMode::MarkdownV2);
$message->replyMarkup($keyboard);

Bot::sendMessage($message);
```
Result in bot:
![Sending a Formatted Message with an Inline Keyboard](./../assets/sendMessage-Image-sample.png)


## Notes
- If `chat_id` is not specified, the library automatically uses the ID of the user who triggered the bot.
- Ensure your bot has the necessary permissions to send messages to the specified chat or channel.
