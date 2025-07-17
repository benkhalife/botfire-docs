
# What is BotFire ?

Botfire is a standard library based on Telegram's documentation and APIs that includes additional features for easier management and faster bot development.


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
