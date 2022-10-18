export type StoreItemKey =
  | 'app'
  | 'wallets'
  | 'wallet'
  | 'tx_status'
  | 'daemon'
  | 'pool'

export enum AppStatus {
  FirstBoot = -1,
  WalletSelect = 0,
  ConnectingToBackend = 1,
  LoadingSettings = 2,
  StartingDaemon = 3,
  // 4
  StartingWallet = 6,
  ReadingWallet = 7,
  ShuttingDown = 99,
}

export type SingleAddress = {
  address: string
  address_index: number
  label: string
  used: boolean
  balance: number | null
  unlocked_balance: number | null
  num_unspent_outputs: number | null
}

export type SingleTransaction = {
  address: string
  amount: number
  double_spend_seen: boolean
  fee: number
  height: number
  note: string
  payment_id: string
  subaddr_index: {
    major: number
    minor: number
  }
  timestamp: number
  txid: string
  type: 'in' | 'out' | 'pool' | 'pending' | 'failed'
  unlock_time: number
}

export type StoreState = {
  app: { pending_config: Partial<StoreStateSingle> }
} & StoreStateSingle

type StoreStateSingle = {
  app: {
    data_dir: string
    ws_bind_port: number
    testnet: boolean

    status: {
      code: AppStatus
    }

    config: {
      preference: {
        notify_no_payment_id: boolean
        notify_empty_password: boolean
        minimize_to_tray: boolean
        autostart: boolean
        timeout: number
      }
    }

    network_interfaces: [
      {
        address: string
        label: string
      },
      {
        address: string
        label: string
      },
    ]
  }

  wallets: {
    list: { address: string; name: string; password_protected: never }[]
    legacy: never[]
  }
  wallet: {
    rpc_bind_port: number
    log_level: number
    status: {
      code: number
      message: string | null
    }
    info: {
      name: string
      address: string
      height: number
      balance: number
      unlocked_balance: number
      view_only: boolean
    }
    secret: {
      mnemonic: string
      view_key: string
      spend_key: string
    }
    transactions: {
      tx_list: SingleTransaction[]
    }
    address_list: {
      used: SingleAddress[]
      unused: SingleAddress[]
      address_book: never[]
      primary: [SingleAddress]
    }
  }
  tx_status: {
    code: number
    message: string
    sending: boolean
  }
  daemon: {
    type: 'remote' | 'local' | 'local_remote'
    remote_host: string
    remote_port: number
    p2p_bind_ip: string
    p2p_bind_port: number
    rpc_bind_ip: string
    rpc_bind_port: number
    zmq_rpc_bind_ip: string
    zmq_rpc_bind_port: number
    out_peers: number
    in_peers: number
    limit_rate_up: number
    limit_rate_down: number
    log_level: number
    enhanced_ip_privacy: boolean
    info: {
      alt_blocks_count: number
      cumulative_difficulty: number
      difficulty: number
      grey_peerlist_size: number
      height: number
      height_without_bootstrap: number
      incoming_connections_count: number
      is_ready: boolean
      outgoing_connections_count: number
      status: string
      target: number
      target_height: number
      testnet: boolean
      top_block_hash: string | null
      tx_count: number
      tx_pool_size: number
      white_peerlist_size: number
    }
    connections: never[]
    bans: never[]
    tx_pool_backlog: never[]
  }
  pool: {
    status: number
    desynced: boolean
    system_clock_error: boolean
    stats: {
      currentEffort: number
    }
    blocks: never[]
    workers: never[]
    server: {
      enabled: boolean
      bindIP: string
      bindPort: number
    }
    mining: {
      address: string
      enableBlockRefreshInterval: boolean
      blockRefreshInterval: number
      minerTimeout: number
      uniform: boolean
    }
    varDiff: {
      enabled: boolean
      startDiff: number
      minDiff: number
      maxDiff: number
      targetTime: number
      retargetTime: number
      variancePercent: number
      maxJump: number
      fixedDiffSeparator: string
    }
  }
}
