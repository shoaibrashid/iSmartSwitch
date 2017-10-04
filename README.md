
# Plugin for NodeMCU

Control relay attached to NodeMCU v.1.0 on HomeBridge Platform. NodeMCU is runnig a WebServer to expose RESTful API call. API expose following method.

1. Get (Gets state of Switch)
2. Post (Sets state of Switch) 


## Installation
1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-mcu-ismartswitch
3. Update your configuration file. See sample-config.json in this repository for a sample.

## Configuration

 ```
"accessories": [
        {
            "accessory": "ismartswitch",
            "name": "Bedroom Switch",
            "getUrl": "http://IP-Address/status",
            "postUrl": "http://IP-Address/relay"
        }
    ]

```


