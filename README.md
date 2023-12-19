# Ses

A simple messaging library for Roblox

### Example Usage

---

```ts
import { createChannel, createMessage } from '@rbxts/ses'

//channels can have multiple messages.
//messages can have multipler listeners, and they're called in the order that they subscribed in
const myChannel = createChannel({
	myMessage: createMessage<[myNumber: number]>(),
})

//Channel.subscribe returns a method which unsubscribes this listener from the message
const unsubscribe = myChannel.subscribe('myMessage', (myNumber) => {
	print('got myMessage with number: ' + myNumber)
})

myChannel.emit('myMessage', 10)
//output:
// got myMessage with number: 10
unsubscribe()
myChannel.emit('myMessage', 5) //no output, because we unsubscribed.
```

