# Ses
A simple messaging library for Roblox

### Example Usage
---
```ts
import { createChannel, createMessage } from '@rbxts/ses'

//channels can have multiple messages.
//messages can have multipler listeners, and they're called in the order that they subscribed in
const myChannel = createChannel({
    printPlusFive: createMessage<[num: number]>()
})

//Channel.subscribe returns a method which unsubscribes this listener from the message
const unsubscribe = myChannel.subscribe('printPlusFive', (num) => {
    print(num + 5)
})

myChannel.emit('printPlusFive', 10) //outputs: 15
unsubscribe()
myChannel.emit('printPlusFive', 5) //does nothing because we unsubscribed from the message

```