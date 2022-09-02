# Smart App

Application for IoT devices

API description

Paths description

| Action                     | Path     | Method |
|----------------------------|----------|--------|
| Send a command to a device | /command | POST   |

Request and response examples

| Path     | Method | Request                                                                            | Response                                                       |
|----------|--------|------------------------------------------------------------------------------------|----------------------------------------------------------------|
| /command | POST   | { boardId: 0,<br/> deviceId: 0,<br/> command: 5,<br/> params: { 4: 255, 5: 125 } } | usual command {}<br/> or<br/> sensor response { 0: 25, 1: 76 } |
