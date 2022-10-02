import EventEmitter from 'events'

export type Unsubscriber = () => void

export type TypedEventEmitter<
  T extends EventEmitter,
  E extends { [key: string]: unknown },
> = Omit<T, 'on' | 'once' | 'off'> & {
  on<K extends keyof E>(s: K, listener: (v: E[K]) => void): Unsubscriber
  once<K extends keyof E>(s: K, listener: (v: E[K]) => void): Unsubscriber
  off<K extends keyof E>(s: K, listener: (v: E[K]) => void): void
}

export type DeepPartial<T extends {}> = { [K in keyof T]?: DeepPartial<T[K]> }

export class Subscribable<
  E extends { [key: string | symbol]: unknown } & { [key: number]: never },
> {
  protected emitter = new EventEmitter()
  public on<K extends keyof E>(
    s: K,
    listener: (v: E[K]) => void,
  ): Unsubscriber {
    this.emitter.on(s as string | symbol, listener)
    return () => this.off<K>(s, listener)
  }
  public once<K extends keyof E>(
    s: K,
    listener: (v: E[K]) => void,
  ): Unsubscriber {
    this.emitter.once(s as string | symbol, listener)
    return () => this.off<K>(s, listener)
  }
  protected off<K extends keyof E>(s: K, listener: (v: E[K]) => void): void {
    this.emitter.off(s as string | symbol, listener)
  }
  protected emit<K extends keyof E>(s: K, v: E[K]): void {
    this.emitter.emit(s as string | symbol, v)
  }
}
