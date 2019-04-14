# homebridge-gpio-ledstrip
[RPi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-gpio-ledstrip-white-only
3. Update your configuration file. See sample config.json snippet below. 

# Configuration

Configuration sample:

 ```
    "accessories": [
      {
        "accessory": "GPIOWhiteLEDStrip",
        "name": "Kitchen Cabinet Strip",
        "pin": 22
      }
    ]
```

Fields: 

* "accessory": Must always be "GPIORGBLEDStrip" (required)
* "name": Can be anything (required)
* "pin": GPIO pin that is used to set value (required)
