import { Buffer } from "buffer";

import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  u64,
  i128,
  Option,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CBUXVRFKKHVAOVSDSSROQPU6YOVXRRE7I6HRAVRY3LI7FC2X7RVBND6T",
  }
} as const


export interface CertificateRecord {
  amount: i128;
  id: u32;
  location: string;
  metadata_url: string;
  owner: string;
  project_name: string;
  timestamp: u64;
  vintage: string;
}

export const Errors = {
  /**
   * The provided amount is negative.
   */
  1: {message:"NegativeAmount"},
  /**
   * The account does not have enough balance.
   */
  2: {message:"InsufficientBalance"},
  /**
   * The allowance is not enough for the transfer.
   */
  3: {message:"InsufficientAllowance"},
  /**
   * The contract is already initialized.
   */
  4: {message:"AlreadyInitialized"},
  /**
   * The provided expiration ledger is invalid (in the past).
   */
  5: {message:"InvalidExpirationLedger"},
  /**
   * The address is blacklisted.
   */
  6: {message:"Blacklisted"},
  /**
   * Caller is not authorized.
   */
  7: {message:"Unauthorized"},
  /**
   * Retirement amount must be greater than zero.
   */
  8: {message:"ZeroRetirementAmount"},
  /**
   * The successor address for super admin is invalid.
   */
  9: {message:"InvalidSuccessor"},
  /**
   * Only the SuperAdmin can blacklist/unblacklist themselves.
   */
  10: {message:"CannotBlacklistSelf"},
  /**
   * The report hash has already been used.
   */
  11: {message:"ReportHashUsed"}
}


export interface BurnEvent {
  amount: i128;
  from: string;
}


export interface MintEvent {
  amount: i128;
  to: string;
}


export interface ApproveEvent {
  amount: i128;
  expiration_ledger: u32;
  from: string;
  spender: string;
}


export interface TransferEvent {
  amount: i128;
  from: string;
  to: string;
}


export interface RetirementEvent {
  amount: i128;
  from: string;
  timestamp: u64;
}


export interface CertificateMintedEvent {
  amount: i128;
  id: u32;
  owner: string;
}

export type DataKey = {tag: "Admin", values: void} | {tag: "SuperAdmin", values: void} | {tag: "RbacContract", values: void} | {tag: "Verifier", values: readonly [string]} | {tag: "Blacklisted", values: readonly [string]} | {tag: "Balance", values: readonly [string]} | {tag: "Allowance", values: readonly [AllowanceDataKey]} | {tag: "TotalSupply", values: void} | {tag: "TotalRetired", values: void} | {tag: "UsedReportHash", values: readonly [Buffer]} | {tag: "Name", values: void} | {tag: "Symbol", values: void} | {tag: "Decimals", values: void} | {tag: "Initialized", values: void} | {tag: "ProjectName", values: void} | {tag: "Vintage", values: void} | {tag: "Location", values: void} | {tag: "MetadataUrl", values: void} | {tag: "NextCertificateID", values: void} | {tag: "Certificate", values: readonly [u32]};


export interface AllowanceValue {
  amount: i128;
  expiration_ledger: u32;
}


export interface AllowanceDataKey {
  from: string;
  spender: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Client {
  /**
   * Construct and simulate a burn transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  burn: ({from, amount}: {from: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  mint: ({verifier, to, amount, report_hash}: {verifier: string, to: string, amount: i128, report_hash: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  name: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  admin: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a retire transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Retires tokens and mints a Soulbound NFT certificate.
   */
  retire: ({from, amount, _report_hash, _methodology}: {from: string, amount: i128, _report_hash: Buffer, _methodology: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  symbol: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a approve transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  approve: ({from, spender, amount, expiration_ledger}: {from: string, spender: string, amount: i128, expiration_ledger: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  balance: ({id}: {id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a decimals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  decimals: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer: ({from, to, amount}: {from: string, to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a allowance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  allowance: ({from, spender}: {from: string, spender: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a blacklist transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  blacklist: ({target}: {target: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a burn_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  burn_from: ({spender, from, amount}: {spender: string, from: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Initializes the contract with admin roles, RBAC address, and metadata.
   */
  initialize: ({admin, rbac_contract, name, symbol, decimals, project_name, vintage, location, metadata_url}: {admin: string, rbac_contract: string, name: string, symbol: string, decimals: u32, project_name: string, vintage: string, location: string, metadata_url: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a is_verifier transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  is_verifier: ({addr}: {addr: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a unblacklist transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  unblacklist: ({target}: {target: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a add_verifier transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_verifier: ({verifier}: {verifier: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a total_supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  total_supply: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a rbac_contract transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  rbac_contract: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<string>>

  /**
   * Construct and simulate a total_retired transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  total_retired: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer_from: ({spender, from, to, amount}: {spender: string, from: string, to: string, amount: i128}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_certificate transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_certificate: ({id}: {id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<CertificateRecord>>>

  /**
   * Construct and simulate a remove_verifier transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_verifier: ({verifier}: {verifier: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a certificate_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  certificate_count: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a transfer_super_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer_super_admin: ({successor}: {successor: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAEUNlcnRpZmljYXRlUmVjb3JkAAAAAAAACAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAJpZAAAAAAABAAAAAAAAAAIbG9jYXRpb24AAAAQAAAAAAAAAAxtZXRhZGF0YV91cmwAAAAQAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAADHByb2plY3RfbmFtZQAAABAAAAAAAAAACXRpbWVzdGFtcAAAAAAAAAYAAAAAAAAAB3ZpbnRhZ2UAAAAAEA==",
        "AAAAAAAAAAAAAAAEYnVybgAAAAIAAAAAAAAABGZyb20AAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAEbWludAAAAAQAAAAAAAAACHZlcmlmaWVyAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAALcmVwb3J0X2hhc2gAAAAADgAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==",
        "AAAAAAAAAAAAAAAFYWRtaW4AAAAAAAAAAAAAAQAAABM=",
        "AAAAAAAAADVSZXRpcmVzIHRva2VucyBhbmQgbWludHMgYSBTb3VsYm91bmQgTkZUIGNlcnRpZmljYXRlLgAAAAAAAAZyZXRpcmUAAAAAAAQAAAAAAAAABGZyb20AAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAADF9yZXBvcnRfaGFzaAAAAA4AAAAAAAAADF9tZXRob2RvbG9neQAAABAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=",
        "AAAAAAAAAAAAAAAHYXBwcm92ZQAAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAJpZAAAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAAIZGVjaW1hbHMAAAAAAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAJYWxsb3dhbmNlAAAAAAAAAgAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAEAAAAL",
        "AAAAAAAAAAAAAAAJYmxhY2tsaXN0AAAAAAAAAQAAAAAAAAAGdGFyZ2V0AAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAJYnVybl9mcm9tAAAAAAAAAwAAAAAAAAAHc3BlbmRlcgAAAAATAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAEZJbml0aWFsaXplcyB0aGUgY29udHJhY3Qgd2l0aCBhZG1pbiByb2xlcywgUkJBQyBhZGRyZXNzLCBhbmQgbWV0YWRhdGEuAAAAAAAKaW5pdGlhbGl6ZQAAAAAACQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAAAAAA1yYmFjX2NvbnRyYWN0AAAAAAAAEwAAAAAAAAAEbmFtZQAAABAAAAAAAAAABnN5bWJvbAAAAAAAEAAAAAAAAAAIZGVjaW1hbHMAAAAEAAAAAAAAAAxwcm9qZWN0X25hbWUAAAAQAAAAAAAAAAd2aW50YWdlAAAAABAAAAAAAAAACGxvY2F0aW9uAAAAEAAAAAAAAAAMbWV0YWRhdGFfdXJsAAAAEAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAALaXNfdmVyaWZpZXIAAAAAAQAAAAAAAAAEYWRkcgAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAALdW5ibGFja2xpc3QAAAAAAQAAAAAAAAAGdGFyZ2V0AAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMYWRkX3ZlcmlmaWVyAAAAAQAAAAAAAAAIdmVyaWZpZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMdG90YWxfc3VwcGx5AAAAAAAAAAEAAAAL",
        "AAAAAAAAAAAAAAANcmJhY19jb250cmFjdAAAAAAAAAAAAAABAAAAEw==",
        "AAAAAAAAAAAAAAANdG90YWxfcmV0aXJlZAAAAAAAAAAAAAABAAAACw==",
        "AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAQAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAZhbW91bnQAAAAAAAsAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAPZ2V0X2NlcnRpZmljYXRlAAAAAAEAAAAAAAAAAmlkAAAAAAAEAAAAAQAAA+gAAAfQAAAAEUNlcnRpZmljYXRlUmVjb3JkAAAA",
        "AAAAAAAAAAAAAAAPcmVtb3ZlX3ZlcmlmaWVyAAAAAAEAAAAAAAAACHZlcmlmaWVyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAARY2VydGlmaWNhdGVfY291bnQAAAAAAAAAAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAUdHJhbnNmZXJfc3VwZXJfYWRtaW4AAAABAAAAAAAAAAlzdWNjZXNzb3IAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAACwAAACBUaGUgcHJvdmlkZWQgYW1vdW50IGlzIG5lZ2F0aXZlLgAAAA5OZWdhdGl2ZUFtb3VudAAAAAAAAQAAAClUaGUgYWNjb3VudCBkb2VzIG5vdCBoYXZlIGVub3VnaCBiYWxhbmNlLgAAAAAAABNJbnN1ZmZpY2llbnRCYWxhbmNlAAAAAAIAAAAtVGhlIGFsbG93YW5jZSBpcyBub3QgZW5vdWdoIGZvciB0aGUgdHJhbnNmZXIuAAAAAAAAFUluc3VmZmljaWVudEFsbG93YW5jZQAAAAAAAAMAAAAkVGhlIGNvbnRyYWN0IGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQuAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAABAAAADhUaGUgcHJvdmlkZWQgZXhwaXJhdGlvbiBsZWRnZXIgaXMgaW52YWxpZCAoaW4gdGhlIHBhc3QpLgAAABdJbnZhbGlkRXhwaXJhdGlvbkxlZGdlcgAAAAAFAAAAG1RoZSBhZGRyZXNzIGlzIGJsYWNrbGlzdGVkLgAAAAALQmxhY2tsaXN0ZWQAAAAABgAAABlDYWxsZXIgaXMgbm90IGF1dGhvcml6ZWQuAAAAAAAADFVuYXV0aG9yaXplZAAAAAcAAAAsUmV0aXJlbWVudCBhbW91bnQgbXVzdCBiZSBncmVhdGVyIHRoYW4gemVyby4AAAAUWmVyb1JldGlyZW1lbnRBbW91bnQAAAAIAAAAMVRoZSBzdWNjZXNzb3IgYWRkcmVzcyBmb3Igc3VwZXIgYWRtaW4gaXMgaW52YWxpZC4AAAAAAAAQSW52YWxpZFN1Y2Nlc3NvcgAAAAkAAAA5T25seSB0aGUgU3VwZXJBZG1pbiBjYW4gYmxhY2tsaXN0L3VuYmxhY2tsaXN0IHRoZW1zZWx2ZXMuAAAAAAAAE0Nhbm5vdEJsYWNrbGlzdFNlbGYAAAAACgAAACZUaGUgcmVwb3J0IGhhc2ggaGFzIGFscmVhZHkgYmVlbiB1c2VkLgAAAAAADlJlcG9ydEhhc2hVc2VkAAAAAAAL",
        "AAAAAQAAAAAAAAAAAAAACUJ1cm5FdmVudAAAAAAAAAIAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAEZnJvbQAAABM=",
        "AAAAAQAAAAAAAAAAAAAACU1pbnRFdmVudAAAAAAAAAIAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAACdG8AAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAADEFwcHJvdmVFdmVudAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAARZXhwaXJhdGlvbl9sZWRnZXIAAAAAAAAEAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT",
        "AAAAAQAAAAAAAAAAAAAADVRyYW5zZmVyRXZlbnQAAAAAAAADAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEw==",
        "AAAAAQAAAAAAAAAAAAAAD1JldGlyZW1lbnRFdmVudAAAAAADAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAABGZyb20AAAATAAAAAAAAAAl0aW1lc3RhbXAAAAAAAAAG",
        "AAAAAQAAAAAAAAAAAAAAFkNlcnRpZmljYXRlTWludGVkRXZlbnQAAAAAAAMAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAACaWQAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAAEw==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAFAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAKU3VwZXJBZG1pbgAAAAAAAAAAAAAAAAAMUmJhY0NvbnRyYWN0AAAAAQAAAAAAAAAIVmVyaWZpZXIAAAABAAAAEwAAAAEAAAAAAAAAC0JsYWNrbGlzdGVkAAAAAAEAAAATAAAAAQAAAAAAAAAHQmFsYW5jZQAAAAABAAAAEwAAAAEAAAAAAAAACUFsbG93YW5jZQAAAAAAAAEAAAfQAAAAEEFsbG93YW5jZURhdGFLZXkAAAAAAAAAAAAAAAtUb3RhbFN1cHBseQAAAAAAAAAAAAAAAAxUb3RhbFJldGlyZWQAAAABAAAAAAAAAA5Vc2VkUmVwb3J0SGFzaAAAAAAAAQAAAA4AAAAAAAAAAAAAAAROYW1lAAAAAAAAAAAAAAAGU3ltYm9sAAAAAAAAAAAAAAAAAAhEZWNpbWFscwAAAAAAAAAAAAAAC0luaXRpYWxpemVkAAAAAAAAAAAAAAAAC1Byb2plY3ROYW1lAAAAAAAAAAAAAAAAB1ZpbnRhZ2UAAAAAAAAAAAAAAAAITG9jYXRpb24AAAAAAAAAAAAAAAtNZXRhZGF0YVVybAAAAAAAAAAAAAAAABFOZXh0Q2VydGlmaWNhdGVJRAAAAAAAAAEAAAAAAAAAC0NlcnRpZmljYXRlAAAAAAEAAAAE",
        "AAAAAQAAAAAAAAAAAAAADkFsbG93YW5jZVZhbHVlAAAAAAACAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAAAAAAEWV4cGlyYXRpb25fbGVkZ2VyAAAAAAAABA==",
        "AAAAAQAAAAAAAAAAAAAAEEFsbG93YW5jZURhdGFLZXkAAAACAAAAAAAAAARmcm9tAAAAEwAAAAAAAAAHc3BlbmRlcgAAAAAT" ]),
      options
    )
  }
  public readonly fromJSON = {
    burn: this.txFromJSON<Result<void>>,
        mint: this.txFromJSON<Result<void>>,
        name: this.txFromJSON<string>,
        admin: this.txFromJSON<string>,
        retire: this.txFromJSON<Result<void>>,
        symbol: this.txFromJSON<string>,
        approve: this.txFromJSON<Result<void>>,
        balance: this.txFromJSON<i128>,
        decimals: this.txFromJSON<u32>,
        transfer: this.txFromJSON<Result<void>>,
        allowance: this.txFromJSON<i128>,
        blacklist: this.txFromJSON<Result<void>>,
        burn_from: this.txFromJSON<Result<void>>,
        initialize: this.txFromJSON<Result<void>>,
        is_verifier: this.txFromJSON<boolean>,
        unblacklist: this.txFromJSON<Result<void>>,
        add_verifier: this.txFromJSON<Result<void>>,
        total_supply: this.txFromJSON<i128>,
        rbac_contract: this.txFromJSON<string>,
        total_retired: this.txFromJSON<i128>,
        transfer_from: this.txFromJSON<Result<void>>,
        get_certificate: this.txFromJSON<Option<CertificateRecord>>,
        remove_verifier: this.txFromJSON<Result<void>>,
        certificate_count: this.txFromJSON<u32>,
        transfer_super_admin: this.txFromJSON<Result<void>>
  }
}