## Instalation

### Prerequisites
 - PHP version 8.1 or higher
 - Composer (A Dependency Manager for PHP)


 ### Install With Composer

 ```bash
 composer require botfire/botfire
```

To get started, you can create two files named `app.php` and `setwebhook.php`

## Set a Webhook

Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, Telegram will send an HTTPS POST request to the specified URL

> [!NOTE]
> See more about the [setWebhook method]()

`setwebhook.php`
```php
<?php
include_once __DIR__ . '/../vendor/autoload.php';

use Botfire\Bot;


// Replace your bot token
Bot::setToken('12227****:***********************************');

// We set the webhook to the address that executes app.php.
$result = Bot::setWebhook('https://your-domain.com/app.php');

// Show Output
echo json_encode($result);
```

Output like this:
```

```

You can run the `setwebhook.php` file (after uploading the file to your host, you can do this via your host address that points to the setwebhook.php file)

If successful, we receive the events including their information from the Telegram server to the address we set in the webhook.

At this point, we are ready to send the appropriate client response to the received messages.

## Send First Message

Now we write the `app.php` file like this:

```php
<?php
include_once __DIR__ . '/../vendor/autoload.php';
use Botfire\Bot;

// Replace your bot token
Bot::setToken('12227****:***********************************');

// Send a message to the current user
Bot::sendMessage('Hello World ✅');
```

✅ Now if you send a message to the bot. The bot will send you a message with the text Hello World in response.

> Now we are ready to develop our robot.