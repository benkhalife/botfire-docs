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

The `Message` class provides a fluent interface to customize message properties. Below is a list of available methods for configuring a `Message` object, along with their descriptions based on the Telegram Bot API.

| Method | Parameter Type | Description | Optional |
| --- | --- | --- | --- |
| `businessConnectionId(string $business_connection_id)` | `string` | Unique identifier of the business connection on behalf of which the message is sent. | Yes |
| `chatId(int\|string $chat_id)` | `int\|string` | Unique identifier for the target chat or username of the target channel (e.g., `@channelusername`). | Yes (defaults to current client if not set) |
| `messageThreadId(int $message_thread_id)` | `int` | Unique identifier for the target message thread (topic) in forum supergroups. | Yes |
| `parseMode(string $parse_mode)` | `string` | Mode for parsing entities in the message text (e.g., `HTML`, `Markdown`, or `MarkdownV2`). See [Formatting Options](#formatting-options). | Yes |
| `entities($entities)` | `array` | A JSON-serialized list of special entities in the message text, used instead of `parse_mode`. | Yes |
| `linkPreviewOptions($link_preview_options)` | `LinkPreviewOptions` | Options for generating link previews in the message. | Yes |
| `disableNotification(bool $disable_notification)` | `bool` | Sends the message silently without sound notification if `true`. | Yes |
| `protectContent(bool $protect_content)` | `bool` | Protects the message content from forwarding and saving if `true`. | Yes |
| `allowPaidBroadcast(bool $allow_paid_broadcast)` | `bool` | Allows up to 1000 messages per second, ignoring broadcasting limits, for a fee of 0.1 Telegram Stars per message if `true`. | Yes |
| `messageEffectId(string $message_effect_id)` | `string` | Unique identifier of a message effect to be added (private chats only). | Yes |
| `replyParameters($reply_parameters)` | `ReplyParameters` | Description of the message to reply to. | Yes |
| `replyMarkup(InlineKeyboard\|ReplyKeyboard $reply_markup)` | `InlineKeyboard\|ReplyKeyboard` | Additional interface options, such as inline or custom reply keyboards. See [Keyboards](#keyboards). | Yes |

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
![Sending a Formatted Message with an Inline Keyboard](./assets/sendMessage-Image-sample.png)


## Notes
- If `chat_id` is not specified, the library automatically uses the ID of the user who triggered the bot.
- Ensure your bot has the necessary permissions to send messages to the specified chat or channel.
