
# What is BotFire ?

Telegram is becoming one of the most popular messaging platforms in the world. Its focus on privacy and security, along with its diverse features, are among the factors contributing to its growing popularity.
One of its attractive features is its bots. In fact, you can create bots on the Telegram platform and use them to perform various tasks. You can utilize these bots to showcase your products, connect with your customers, or provide specific services to your users.
Botfire is a library developed in PHP that enables you to build and implement various types of bots.


A simple bot can be created with just a few lines of code.

```PHP
<?php
include_once __DIR__ . '/../vendor/autoload.php';
use Botfire\Bot;

Bot::setToken('12227****:***********************************');

$text = Bot::getMessage()->getText();

if(strtolower($text)  == '/start'){
    Bot::sendMessage("Hello From Telegram Bot");
}

```

Each bot has a unique token (a random string of a specific length) that is required to interact with the Telegram server.

In the example below, replace the phrase Your_Bot_Token with your bot's token:

```php
Bot::setToken('Your_Bot_Token');
```