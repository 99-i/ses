namespace Ses {
	export type ChannelMessages = {
		[key: string]: Message<any>[]
	}

	export type Channel<T extends ChannelMessages> = {
		subscribe<K extends keyof T>(message: K, callback: T[K][number]['callback']): () => void
		emit<K extends keyof T>(message: K, ...args: Parameters<T[K][number]['callback']>): void
	}

	export type Message<T extends any[]> = {
		callback: (...args: T) => void
	}

	export const createMessage = <T extends any[]>(): Message<T>[] => {
		return []
	}

	export const createChannel = <T extends ChannelMessages>(messages: T): Channel<T> => {
		const subscribers: { [K in keyof T]: Function[] } = {} as any

		const channel: Channel<T> = {
			subscribe<K extends keyof T>(message: K, callback: T[K][number]['callback']) {
				if (!subscribers[message]) {
					subscribers[message] = []
				}
				subscribers[message].push(callback)
				return () => {
					subscribers[message] = subscribers[message].filter((cb) => cb !== callback)
				}
			},
			emit<K extends keyof T>(message: K, ...args: Parameters<T[K][number]['callback']>) {
				const messageSubscribers = subscribers[message]
				if (messageSubscribers) {
					messageSubscribers.forEach((callback) => {
						callback(...(args as any))
					})
				}
			},
		}

		return channel
	}
}

export = Ses
