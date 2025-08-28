# Send Text Message in Telegram Bot

Text messages are one of the first and easiest ways to intract with a user.  
To create and send text messages to users in the bot or Telegram channels, we use the `Message` class, which allows for message customization



### Basic Usage : Simple example of sending a message

```php
use Botfire\Models\Message;

Message::create('Hello From Telegram Bot')
    ->chatId('1234567')
    ->send();
```
This sends the message "Hello From Telegram Bot" to the user who initiated the interaction.

For simple scenarios, you can send a text message directly to the current user (the one who triggered the bot) without specifying a `chat_id`. The BotFire library automatically sets the `chat_id` to the current client's ID if not provided.



```php
Message::create('Hello From Telegram Bot')->send();
```



## Advanced Usage with `Message` Class

For more control over the message, use the `Message` class to configure additional properties such as chat ID, parse mode, inline keyboards, and more.


### Configuring Messages with the `Message` Class

The `Message` class offers a fluent, chainable interface to customize properties of a message. This allows developers to fine-tune aspects like recipient targeting, text formatting, notifications, and interactive elements. Below is a detailed breakdown of the available configuration methods.

### Available Configuration Methods


| Method Name                | Description                                                                                                                  |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `businessConnectionId($id)` | Specifies the unique identifier for a business connection on whose behalf the message is sent.                               |
| `chatId($chat_id)`           | Defines the target chat or channel for the message. Use a numeric chat ID or a channel username (e.g., @channelusername).     |
| `messageThreadId($id)`       | Targets a specific message thread (topic) in forum supergroups.                                                              |
| `parseMode($mode)`           | Controls how the message text is formatted. Supported modes are HTML, Markdown, or MarkdownV2. Refer to the Formatting Options section for details. |
| `entities($entities)`        | Allows manual specification of special entities (e.g., bold, italic, links) in the message text using a JSON-serialized array. Use this instead of parseMode for granular control. |
| `linkPreviewOptions($options)`| Customizes how link previews are displayed in the message (e.g., enabling/disabling previews or setting preview size).       |
| `disableNotification($bool)` | Sends the message silently, without triggering a notification sound on the recipient’s device.                                |
| `protectContent($bool)`      | Prevents the message content from being forwarded or saved by recipients.                                                   |
| `allowPaidBroadcast($bool)`  | Enables sending up to 1000 messages per second, bypassing broadcast limits, for a fee of 0.1 Telegram Stars per message.    |
| `messageEffectId($id)`       | Adds a visual effect to the message (available in private chats only).                                                       |
| `replyParameters($params)`   | Specifies details for replying to a specific message (e.g., quoting a message).                                              |
| `replyMarkup($markup)`       | Attaches an interactive keyboard (inline or reply) to the message for user interaction. See the Keyboards section for more details. |

### Usage Example

Here’s an example combining multiple configuration methods for a richly formatted message:

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Keyboard\InlineButton;
use Botfire\Keyboard\InlineKeyboard;
use Botfire\Models\Message;

$message = Message::create('Welcome to my **Telegram** bot!')
    ->chatId(123456789)
    ->parseMode(ParseMode::MarkdownV2)
    ->disableNotification(true)
    ->replyMarkup(
        (new InlineKeyboard())->row([
            InlineButton::button('Click Me', 'action_click'),
            InlineButton::link('Visit Website', 'https://example.com'),
        ])
    );

$message->send();
```

This configuration sends a Markdown-formatted message to a specific chat, without a notification sound, and includes an inline keyboard with two buttons.

> [!TIP]
> Chain methods fluently to create concise and readable code. For example :  
`$message->chatId(123)->parseMode(ParseMode::HTML)->disableNotification(true);`

### Formatting Options

The `parseMode` method allows you to format message text using one of three modes: `HTML`, `Markdown`, or `MarkdownV2`. For convenience, the `ParseMode` class provides constants for these values.

```php
use Botfire\Bot;
use Botfire\Helper\ParseMode;
use Botfire\Models\Message;

Message::create('Hello, this is a *test* message!')
    ->chatId(12345678);
    ->parseMode(ParseMode::MarkdownV2)
    ->send();

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
$message->send();
```
Result in bot:
![Sending a Formatted Message with an Inline Keyboard](./../assets/sendMessage-Image-sample.png)


## Notes
- If `chat_id` is not specified, the library automatically uses the ID of the user who triggered the bot.
- Ensure your bot has the necessary permissions to send messages to the specified chat or channel.
