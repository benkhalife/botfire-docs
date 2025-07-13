# Botfire: `getEvent` Method Documentation

## Overview
The `getEvent` method is a core component of the Botfire library for creating Telegram bots. It allows developers to  process events received via Telegram webhooks, identifying the type of event and extracting relevant data for further handling.

## Usage
To access the `getEvent` method, use the `Bot` class as follows:

```php
use Botfire\Bot;

$event = Bot::getEvent();
```

This method processes incoming webhook data from Telegram and provides a structured way to interact with the event.

## Methods
The `getEvent` method returns an object with several methods to extract specific information about the event:

### 1. `getName()`
Returns the name of the event, which corresponds to one of the predefined event types.

#### Example
```php
$event_name = Bot::getEvent()->getName();
```

#### Possible Event Names
The event name can be one of the following constants:
- `message` - A standard message sent to the bot.
- `edited_message` - An edited message.
- `channel_post` - A post in a channel.
- `edited_channel_post` - An edited channel post.
- `business_connection` - A business connection event.
- `business_message` - A message in a business context.
- `edited_business_message` - An edited business message.
- `deleted_business_messages` - Deleted business messages.
- `message_reaction` - A reaction to a message.
- `message_reaction_count` - The count of reactions to a message.
- `inline_query` - An inline query from a user.
- `chosen_inline_result` - A chosen inline query result.
- `callback_query` - A callback query from an inline button.
- `shipping_query` - A shipping query for payments.
- `pre_checkout_query` - A pre-checkout query for payments.
- `purchased_paid_media` - Purchased paid media.
- `poll` - A poll created in a chat.
- `poll_answer` - A user's answer to a poll.
- `my_chat_member` - Updates related to the bot's chat member status.
- `chat_member` - Updates related to a chat member's status.
- `chat_join_request` - A request to join a chat.
- `chat_boost` - A chat boost event.
- `removed_chat_boost` - A removed chat boost.

#### Example Usage
If a client sends a standard message to the bot, the following will return `'message'`:
```php
$event_name = Bot::getEvent()->getName(); // Returns 'message'
```

### 2. `getType()`
Returns the general type of the event. Some events with different names may share the same type. For example, both `edited_message` and `channel_post` are of type `message`.

#### Example
```php
$type = Bot::getEvent()->getType(); // e.g., Returns 'message' for edited_message or channel_post
```



### 3. Event Type Checks
The following methods check whether the message corresponds to a specific event type, based on the `getEvent()->getName()` method from the `GetEvent` class:

- `isCallbackQuery(): bool` - Returns `true` if the event is a callback query.
- `isEditedMessage(): bool` - Returns `true` if the event is an edited message.
- `isEditedChannelPost(): bool` - Returns `true` if the event is an edited channel post.
- `isMessage(): bool` - Returns `true` if the event is a standard message and the message is valid.
- `isChannelPost(): bool` - Returns `true` if the event is a channel post.
- `isBusinessMessage(): bool` - Returns `true` if the event is a business message.
- `isEditedBusinessMessage(): bool` - Returns `true` if the event is an edited business message.

#### Example
To check if the message is a callback query:
```php
if (Bot::getEvent()->isCallbackQuery()) {
    // Handle callback query
}
```


### 4. `getBody()`
Returns the full data payload of the event, regardless of its type. This method provides access to the detailed information contained within the Telegram webhook update.

#### Example
```php
$event_data = Bot::getEvent()->getBody();
```

### 5. `getUpdateId()`
Returns the unique identifier for the update, as described by the Telegram API:
> The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then the identifier of the next update will be chosen randomly instead of sequentially.

#### Example
```php
$update_id = Bot::getEvent()->getUpdateId();
```

## Notes
- The `getEvent` method is designed to handle incoming Telegram webhook updates, making it essential for real-time bot interactions.
- Use the `getName()` method to identify the specific event and handle it accordingly in your bot logic.
- The `getType()` method is useful for grouping similar events (e.g., treating `edited_message` and `channel_post` as `message` types).
- The `getBody()` method provides raw event data, which can be processed based on the event type.
