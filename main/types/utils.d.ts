import EventEmitter from 'events'

export type TypedEventEmitter<
  T extends EventEmitter,
  E extends { [key: string]: unknown },
> = Omit<T, 'on' | 'off'> & {
  on<K extends keyof E>(s: K, listener: (v: E[K]) => void)
  once<K extends keyof E>(s: K, listener: (v: E[K]) => void)
  off<K extends keyof E>(s: K, listener: (v: E[K]) => void)
}
