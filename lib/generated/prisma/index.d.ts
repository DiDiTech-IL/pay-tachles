
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model App
 * 
 */
export type App = $Result.DefaultSelection<Prisma.$AppPayload>
/**
 * Model Payup
 * 
 */
export type Payup = $Result.DefaultSelection<Prisma.$PayupPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model WebhookTemplate
 * 
 */
export type WebhookTemplate = $Result.DefaultSelection<Prisma.$WebhookTemplatePayload>
/**
 * Model WebhookLog
 * 
 */
export type WebhookLog = $Result.DefaultSelection<Prisma.$WebhookLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Apps
 * const apps = await prisma.app.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Apps
   * const apps = await prisma.app.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.app`: Exposes CRUD operations for the **App** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Apps
    * const apps = await prisma.app.findMany()
    * ```
    */
  get app(): Prisma.AppDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payup`: Exposes CRUD operations for the **Payup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payups
    * const payups = await prisma.payup.findMany()
    * ```
    */
  get payup(): Prisma.PayupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookTemplate`: Exposes CRUD operations for the **WebhookTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookTemplates
    * const webhookTemplates = await prisma.webhookTemplate.findMany()
    * ```
    */
  get webhookTemplate(): Prisma.WebhookTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookLog`: Exposes CRUD operations for the **WebhookLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookLogs
    * const webhookLogs = await prisma.webhookLog.findMany()
    * ```
    */
  get webhookLog(): Prisma.WebhookLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.0.1
   * Query Engine version: f09f2815f091dbba658cdcd2264306d88bb5bda6
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    App: 'App',
    Payup: 'Payup',
    Transaction: 'Transaction',
    WebhookTemplate: 'WebhookTemplate',
    WebhookLog: 'WebhookLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "app" | "payup" | "transaction" | "webhookTemplate" | "webhookLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      App: {
        payload: Prisma.$AppPayload<ExtArgs>
        fields: Prisma.AppFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findFirst: {
            args: Prisma.AppFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          findMany: {
            args: Prisma.AppFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          create: {
            args: Prisma.AppCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          createMany: {
            args: Prisma.AppCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          delete: {
            args: Prisma.AppDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          update: {
            args: Prisma.AppUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          deleteMany: {
            args: Prisma.AppDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>[]
          }
          upsert: {
            args: Prisma.AppUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppPayload>
          }
          aggregate: {
            args: Prisma.AppAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApp>
          }
          groupBy: {
            args: Prisma.AppGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppCountArgs<ExtArgs>
            result: $Utils.Optional<AppCountAggregateOutputType> | number
          }
        }
      }
      Payup: {
        payload: Prisma.$PayupPayload<ExtArgs>
        fields: Prisma.PayupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          findFirst: {
            args: Prisma.PayupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          findMany: {
            args: Prisma.PayupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>[]
          }
          create: {
            args: Prisma.PayupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          createMany: {
            args: Prisma.PayupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PayupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>[]
          }
          delete: {
            args: Prisma.PayupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          update: {
            args: Prisma.PayupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          deleteMany: {
            args: Prisma.PayupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PayupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>[]
          }
          upsert: {
            args: Prisma.PayupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayupPayload>
          }
          aggregate: {
            args: Prisma.PayupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayup>
          }
          groupBy: {
            args: Prisma.PayupGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayupGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayupCountArgs<ExtArgs>
            result: $Utils.Optional<PayupCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      WebhookTemplate: {
        payload: Prisma.$WebhookTemplatePayload<ExtArgs>
        fields: Prisma.WebhookTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          findFirst: {
            args: Prisma.WebhookTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          findMany: {
            args: Prisma.WebhookTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>[]
          }
          create: {
            args: Prisma.WebhookTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          createMany: {
            args: Prisma.WebhookTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>[]
          }
          delete: {
            args: Prisma.WebhookTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          update: {
            args: Prisma.WebhookTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          deleteMany: {
            args: Prisma.WebhookTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>[]
          }
          upsert: {
            args: Prisma.WebhookTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookTemplatePayload>
          }
          aggregate: {
            args: Prisma.WebhookTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookTemplate>
          }
          groupBy: {
            args: Prisma.WebhookTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookTemplateCountAggregateOutputType> | number
          }
        }
      }
      WebhookLog: {
        payload: Prisma.$WebhookLogPayload<ExtArgs>
        fields: Prisma.WebhookLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findFirst: {
            args: Prisma.WebhookLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findMany: {
            args: Prisma.WebhookLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          create: {
            args: Prisma.WebhookLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          createMany: {
            args: Prisma.WebhookLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          delete: {
            args: Prisma.WebhookLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          update: {
            args: Prisma.WebhookLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          deleteMany: {
            args: Prisma.WebhookLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          upsert: {
            args: Prisma.WebhookLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          aggregate: {
            args: Prisma.WebhookLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookLog>
          }
          groupBy: {
            args: Prisma.WebhookLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookLogCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    app?: AppOmit
    payup?: PayupOmit
    transaction?: TransactionOmit
    webhookTemplate?: WebhookTemplateOmit
    webhookLog?: WebhookLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AppCountOutputType
   */

  export type AppCountOutputType = {
    payups: number
    transactions: number
    webhook_logs: number
    webhook_templates: number
  }

  export type AppCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payups?: boolean | AppCountOutputTypeCountPayupsArgs
    transactions?: boolean | AppCountOutputTypeCountTransactionsArgs
    webhook_logs?: boolean | AppCountOutputTypeCountWebhook_logsArgs
    webhook_templates?: boolean | AppCountOutputTypeCountWebhook_templatesArgs
  }

  // Custom InputTypes
  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppCountOutputType
     */
    select?: AppCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountPayupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayupWhereInput
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountWebhook_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
  }

  /**
   * AppCountOutputType without action
   */
  export type AppCountOutputTypeCountWebhook_templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookTemplateWhereInput
  }


  /**
   * Count Type TransactionCountOutputType
   */

  export type TransactionCountOutputType = {
    webhook_logs: number
  }

  export type TransactionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    webhook_logs?: boolean | TransactionCountOutputTypeCountWebhook_logsArgs
  }

  // Custom InputTypes
  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TransactionCountOutputType
     */
    select?: TransactionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TransactionCountOutputType without action
   */
  export type TransactionCountOutputTypeCountWebhook_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model App
   */

  export type AggregateApp = {
    _count: AppCountAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  export type AppMinAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    api_key: string | null
    webhook_secret: string | null
    webhook_url: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppMaxAggregateOutputType = {
    id: string | null
    name: string | null
    provider: string | null
    api_key: string | null
    webhook_secret: string | null
    webhook_url: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AppCountAggregateOutputType = {
    id: number
    name: number
    provider: number
    api_key: number
    webhook_secret: number
    webhook_url: number
    is_active: number
    metadata: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AppMinAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    api_key?: true
    webhook_secret?: true
    webhook_url?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type AppMaxAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    api_key?: true
    webhook_secret?: true
    webhook_url?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type AppCountAggregateInputType = {
    id?: true
    name?: true
    provider?: true
    api_key?: true
    webhook_secret?: true
    webhook_url?: true
    is_active?: true
    metadata?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AppAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which App to aggregate.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Apps
    **/
    _count?: true | AppCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppMaxAggregateInputType
  }

  export type GetAppAggregateType<T extends AppAggregateArgs> = {
        [P in keyof T & keyof AggregateApp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApp[P]>
      : GetScalarType<T[P], AggregateApp[P]>
  }




  export type AppGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppWhereInput
    orderBy?: AppOrderByWithAggregationInput | AppOrderByWithAggregationInput[]
    by: AppScalarFieldEnum[] | AppScalarFieldEnum
    having?: AppScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppCountAggregateInputType | true
    _min?: AppMinAggregateInputType
    _max?: AppMaxAggregateInputType
  }

  export type AppGroupByOutputType = {
    id: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active: boolean
    metadata: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: AppCountAggregateOutputType | null
    _min: AppMinAggregateOutputType | null
    _max: AppMaxAggregateOutputType | null
  }

  type GetAppGroupByPayload<T extends AppGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppGroupByOutputType[P]>
            : GetScalarType<T[P], AppGroupByOutputType[P]>
        }
      >
    >


  export type AppSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    api_key?: boolean
    webhook_secret?: boolean
    webhook_url?: boolean
    is_active?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    payups?: boolean | App$payupsArgs<ExtArgs>
    transactions?: boolean | App$transactionsArgs<ExtArgs>
    webhook_logs?: boolean | App$webhook_logsArgs<ExtArgs>
    webhook_templates?: boolean | App$webhook_templatesArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["app"]>

  export type AppSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    api_key?: boolean
    webhook_secret?: boolean
    webhook_url?: boolean
    is_active?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["app"]>

  export type AppSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    provider?: boolean
    api_key?: boolean
    webhook_secret?: boolean
    webhook_url?: boolean
    is_active?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["app"]>

  export type AppSelectScalar = {
    id?: boolean
    name?: boolean
    provider?: boolean
    api_key?: boolean
    webhook_secret?: boolean
    webhook_url?: boolean
    is_active?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AppOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "provider" | "api_key" | "webhook_secret" | "webhook_url" | "is_active" | "metadata" | "created_at" | "updated_at", ExtArgs["result"]["app"]>
  export type AppInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payups?: boolean | App$payupsArgs<ExtArgs>
    transactions?: boolean | App$transactionsArgs<ExtArgs>
    webhook_logs?: boolean | App$webhook_logsArgs<ExtArgs>
    webhook_templates?: boolean | App$webhook_templatesArgs<ExtArgs>
    _count?: boolean | AppCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AppIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AppIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AppPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "App"
    objects: {
      payups: Prisma.$PayupPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      webhook_logs: Prisma.$WebhookLogPayload<ExtArgs>[]
      webhook_templates: Prisma.$WebhookTemplatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      provider: string
      api_key: string
      webhook_secret: string
      webhook_url: string
      is_active: boolean
      metadata: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["app"]>
    composites: {}
  }

  type AppGetPayload<S extends boolean | null | undefined | AppDefaultArgs> = $Result.GetResult<Prisma.$AppPayload, S>

  type AppCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppCountAggregateInputType | true
    }

  export interface AppDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['App'], meta: { name: 'App' } }
    /**
     * Find zero or one App that matches the filter.
     * @param {AppFindUniqueArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppFindUniqueArgs>(args: SelectSubset<T, AppFindUniqueArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one App that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppFindUniqueOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppFindUniqueOrThrowArgs>(args: SelectSubset<T, AppFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppFindFirstArgs>(args?: SelectSubset<T, AppFindFirstArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first App that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindFirstOrThrowArgs} args - Arguments to find a App
     * @example
     * // Get one App
     * const app = await prisma.app.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppFindFirstOrThrowArgs>(args?: SelectSubset<T, AppFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Apps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Apps
     * const apps = await prisma.app.findMany()
     * 
     * // Get first 10 Apps
     * const apps = await prisma.app.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appWithIdOnly = await prisma.app.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppFindManyArgs>(args?: SelectSubset<T, AppFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a App.
     * @param {AppCreateArgs} args - Arguments to create a App.
     * @example
     * // Create one App
     * const App = await prisma.app.create({
     *   data: {
     *     // ... data to create a App
     *   }
     * })
     * 
     */
    create<T extends AppCreateArgs>(args: SelectSubset<T, AppCreateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Apps.
     * @param {AppCreateManyArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppCreateManyArgs>(args?: SelectSubset<T, AppCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Apps and returns the data saved in the database.
     * @param {AppCreateManyAndReturnArgs} args - Arguments to create many Apps.
     * @example
     * // Create many Apps
     * const app = await prisma.app.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppCreateManyAndReturnArgs>(args?: SelectSubset<T, AppCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a App.
     * @param {AppDeleteArgs} args - Arguments to delete one App.
     * @example
     * // Delete one App
     * const App = await prisma.app.delete({
     *   where: {
     *     // ... filter to delete one App
     *   }
     * })
     * 
     */
    delete<T extends AppDeleteArgs>(args: SelectSubset<T, AppDeleteArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one App.
     * @param {AppUpdateArgs} args - Arguments to update one App.
     * @example
     * // Update one App
     * const app = await prisma.app.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppUpdateArgs>(args: SelectSubset<T, AppUpdateArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Apps.
     * @param {AppDeleteManyArgs} args - Arguments to filter Apps to delete.
     * @example
     * // Delete a few Apps
     * const { count } = await prisma.app.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppDeleteManyArgs>(args?: SelectSubset<T, AppDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppUpdateManyArgs>(args: SelectSubset<T, AppUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Apps and returns the data updated in the database.
     * @param {AppUpdateManyAndReturnArgs} args - Arguments to update many Apps.
     * @example
     * // Update many Apps
     * const app = await prisma.app.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Apps and only return the `id`
     * const appWithIdOnly = await prisma.app.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppUpdateManyAndReturnArgs>(args: SelectSubset<T, AppUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one App.
     * @param {AppUpsertArgs} args - Arguments to update or create a App.
     * @example
     * // Update or create a App
     * const app = await prisma.app.upsert({
     *   create: {
     *     // ... data to create a App
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the App we want to update
     *   }
     * })
     */
    upsert<T extends AppUpsertArgs>(args: SelectSubset<T, AppUpsertArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Apps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppCountArgs} args - Arguments to filter Apps to count.
     * @example
     * // Count the number of Apps
     * const count = await prisma.app.count({
     *   where: {
     *     // ... the filter for the Apps we want to count
     *   }
     * })
    **/
    count<T extends AppCountArgs>(
      args?: Subset<T, AppCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppAggregateArgs>(args: Subset<T, AppAggregateArgs>): Prisma.PrismaPromise<GetAppAggregateType<T>>

    /**
     * Group by App.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppGroupByArgs['orderBy'] }
        : { orderBy?: AppGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the App model
   */
  readonly fields: AppFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for App.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payups<T extends App$payupsArgs<ExtArgs> = {}>(args?: Subset<T, App$payupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends App$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, App$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    webhook_logs<T extends App$webhook_logsArgs<ExtArgs> = {}>(args?: Subset<T, App$webhook_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    webhook_templates<T extends App$webhook_templatesArgs<ExtArgs> = {}>(args?: Subset<T, App$webhook_templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the App model
   */
  interface AppFieldRefs {
    readonly id: FieldRef<"App", 'String'>
    readonly name: FieldRef<"App", 'String'>
    readonly provider: FieldRef<"App", 'String'>
    readonly api_key: FieldRef<"App", 'String'>
    readonly webhook_secret: FieldRef<"App", 'String'>
    readonly webhook_url: FieldRef<"App", 'String'>
    readonly is_active: FieldRef<"App", 'Boolean'>
    readonly metadata: FieldRef<"App", 'Json'>
    readonly created_at: FieldRef<"App", 'DateTime'>
    readonly updated_at: FieldRef<"App", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * App findUnique
   */
  export type AppFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findUniqueOrThrow
   */
  export type AppFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App findFirst
   */
  export type AppFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findFirstOrThrow
   */
  export type AppFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which App to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Apps.
     */
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App findMany
   */
  export type AppFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter, which Apps to fetch.
     */
    where?: AppWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Apps to fetch.
     */
    orderBy?: AppOrderByWithRelationInput | AppOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Apps.
     */
    cursor?: AppWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Apps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Apps.
     */
    skip?: number
    distinct?: AppScalarFieldEnum | AppScalarFieldEnum[]
  }

  /**
   * App create
   */
  export type AppCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to create a App.
     */
    data: XOR<AppCreateInput, AppUncheckedCreateInput>
  }

  /**
   * App createMany
   */
  export type AppCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * App createManyAndReturn
   */
  export type AppCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to create many Apps.
     */
    data: AppCreateManyInput | AppCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * App update
   */
  export type AppUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The data needed to update a App.
     */
    data: XOR<AppUpdateInput, AppUncheckedUpdateInput>
    /**
     * Choose, which App to update.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App updateMany
   */
  export type AppUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
  }

  /**
   * App updateManyAndReturn
   */
  export type AppUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * The data used to update Apps.
     */
    data: XOR<AppUpdateManyMutationInput, AppUncheckedUpdateManyInput>
    /**
     * Filter which Apps to update
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to update.
     */
    limit?: number
  }

  /**
   * App upsert
   */
  export type AppUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * The filter to search for the App to update in case it exists.
     */
    where: AppWhereUniqueInput
    /**
     * In case the App found by the `where` argument doesn't exist, create a new App with this data.
     */
    create: XOR<AppCreateInput, AppUncheckedCreateInput>
    /**
     * In case the App was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppUpdateInput, AppUncheckedUpdateInput>
  }

  /**
   * App delete
   */
  export type AppDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
    /**
     * Filter which App to delete.
     */
    where: AppWhereUniqueInput
  }

  /**
   * App deleteMany
   */
  export type AppDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Apps to delete
     */
    where?: AppWhereInput
    /**
     * Limit how many Apps to delete.
     */
    limit?: number
  }

  /**
   * App.payups
   */
  export type App$payupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    where?: PayupWhereInput
    orderBy?: PayupOrderByWithRelationInput | PayupOrderByWithRelationInput[]
    cursor?: PayupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayupScalarFieldEnum | PayupScalarFieldEnum[]
  }

  /**
   * App.transactions
   */
  export type App$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * App.webhook_logs
   */
  export type App$webhook_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    cursor?: WebhookLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * App.webhook_templates
   */
  export type App$webhook_templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    where?: WebhookTemplateWhereInput
    orderBy?: WebhookTemplateOrderByWithRelationInput | WebhookTemplateOrderByWithRelationInput[]
    cursor?: WebhookTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookTemplateScalarFieldEnum | WebhookTemplateScalarFieldEnum[]
  }

  /**
   * App without action
   */
  export type AppDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the App
     */
    select?: AppSelect<ExtArgs> | null
    /**
     * Omit specific fields from the App
     */
    omit?: AppOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppInclude<ExtArgs> | null
  }


  /**
   * Model Payup
   */

  export type AggregatePayup = {
    _count: PayupCountAggregateOutputType | null
    _avg: PayupAvgAggregateOutputType | null
    _sum: PayupSumAggregateOutputType | null
    _min: PayupMinAggregateOutputType | null
    _max: PayupMaxAggregateOutputType | null
  }

  export type PayupAvgAggregateOutputType = {
    amount: number | null
  }

  export type PayupSumAggregateOutputType = {
    amount: number | null
  }

  export type PayupMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    amount: number | null
    currency: string | null
    status: string | null
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    return_url: string | null
    cancel_url: string | null
    created_at: Date | null
    updated_at: Date | null
    expires_at: Date | null
    completed_at: Date | null
  }

  export type PayupMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    amount: number | null
    currency: string | null
    status: string | null
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    return_url: string | null
    cancel_url: string | null
    created_at: Date | null
    updated_at: Date | null
    expires_at: Date | null
    completed_at: Date | null
  }

  export type PayupCountAggregateOutputType = {
    id: number
    app_id: number
    amount: number
    currency: number
    status: number
    customer_email: number
    customer_name: number
    customer_id: number
    description: number
    return_url: number
    cancel_url: number
    metadata: number
    provider_data: number
    created_at: number
    updated_at: number
    expires_at: number
    completed_at: number
    _all: number
  }


  export type PayupAvgAggregateInputType = {
    amount?: true
  }

  export type PayupSumAggregateInputType = {
    amount?: true
  }

  export type PayupMinAggregateInputType = {
    id?: true
    app_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    return_url?: true
    cancel_url?: true
    created_at?: true
    updated_at?: true
    expires_at?: true
    completed_at?: true
  }

  export type PayupMaxAggregateInputType = {
    id?: true
    app_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    return_url?: true
    cancel_url?: true
    created_at?: true
    updated_at?: true
    expires_at?: true
    completed_at?: true
  }

  export type PayupCountAggregateInputType = {
    id?: true
    app_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    return_url?: true
    cancel_url?: true
    metadata?: true
    provider_data?: true
    created_at?: true
    updated_at?: true
    expires_at?: true
    completed_at?: true
    _all?: true
  }

  export type PayupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payup to aggregate.
     */
    where?: PayupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payups to fetch.
     */
    orderBy?: PayupOrderByWithRelationInput | PayupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payups
    **/
    _count?: true | PayupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayupAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayupSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayupMaxAggregateInputType
  }

  export type GetPayupAggregateType<T extends PayupAggregateArgs> = {
        [P in keyof T & keyof AggregatePayup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayup[P]>
      : GetScalarType<T[P], AggregatePayup[P]>
  }




  export type PayupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayupWhereInput
    orderBy?: PayupOrderByWithAggregationInput | PayupOrderByWithAggregationInput[]
    by: PayupScalarFieldEnum[] | PayupScalarFieldEnum
    having?: PayupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayupCountAggregateInputType | true
    _avg?: PayupAvgAggregateInputType
    _sum?: PayupSumAggregateInputType
    _min?: PayupMinAggregateInputType
    _max?: PayupMaxAggregateInputType
  }

  export type PayupGroupByOutputType = {
    id: string
    app_id: string
    amount: number
    currency: string
    status: string
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    return_url: string | null
    cancel_url: string | null
    metadata: JsonValue | null
    provider_data: JsonValue | null
    created_at: Date
    updated_at: Date
    expires_at: Date
    completed_at: Date | null
    _count: PayupCountAggregateOutputType | null
    _avg: PayupAvgAggregateOutputType | null
    _sum: PayupSumAggregateOutputType | null
    _min: PayupMinAggregateOutputType | null
    _max: PayupMaxAggregateOutputType | null
  }

  type GetPayupGroupByPayload<T extends PayupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayupGroupByOutputType[P]>
            : GetScalarType<T[P], PayupGroupByOutputType[P]>
        }
      >
    >


  export type PayupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    return_url?: boolean
    cancel_url?: boolean
    metadata?: boolean
    provider_data?: boolean
    created_at?: boolean
    updated_at?: boolean
    expires_at?: boolean
    completed_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | Payup$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["payup"]>

  export type PayupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    return_url?: boolean
    cancel_url?: boolean
    metadata?: boolean
    provider_data?: boolean
    created_at?: boolean
    updated_at?: boolean
    expires_at?: boolean
    completed_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payup"]>

  export type PayupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    return_url?: boolean
    cancel_url?: boolean
    metadata?: boolean
    provider_data?: boolean
    created_at?: boolean
    updated_at?: boolean
    expires_at?: boolean
    completed_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payup"]>

  export type PayupSelectScalar = {
    id?: boolean
    app_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    return_url?: boolean
    cancel_url?: boolean
    metadata?: boolean
    provider_data?: boolean
    created_at?: boolean
    updated_at?: boolean
    expires_at?: boolean
    completed_at?: boolean
  }

  export type PayupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_id" | "amount" | "currency" | "status" | "customer_email" | "customer_name" | "customer_id" | "description" | "return_url" | "cancel_url" | "metadata" | "provider_data" | "created_at" | "updated_at" | "expires_at" | "completed_at", ExtArgs["result"]["payup"]>
  export type PayupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | Payup$transactionArgs<ExtArgs>
  }
  export type PayupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type PayupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }

  export type $PayupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payup"
    objects: {
      app: Prisma.$AppPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string
      amount: number
      currency: string
      status: string
      customer_email: string | null
      customer_name: string | null
      customer_id: string | null
      description: string | null
      return_url: string | null
      cancel_url: string | null
      metadata: Prisma.JsonValue | null
      provider_data: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
      expires_at: Date
      completed_at: Date | null
    }, ExtArgs["result"]["payup"]>
    composites: {}
  }

  type PayupGetPayload<S extends boolean | null | undefined | PayupDefaultArgs> = $Result.GetResult<Prisma.$PayupPayload, S>

  type PayupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayupCountAggregateInputType | true
    }

  export interface PayupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payup'], meta: { name: 'Payup' } }
    /**
     * Find zero or one Payup that matches the filter.
     * @param {PayupFindUniqueArgs} args - Arguments to find a Payup
     * @example
     * // Get one Payup
     * const payup = await prisma.payup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayupFindUniqueArgs>(args: SelectSubset<T, PayupFindUniqueArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayupFindUniqueOrThrowArgs} args - Arguments to find a Payup
     * @example
     * // Get one Payup
     * const payup = await prisma.payup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayupFindUniqueOrThrowArgs>(args: SelectSubset<T, PayupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupFindFirstArgs} args - Arguments to find a Payup
     * @example
     * // Get one Payup
     * const payup = await prisma.payup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayupFindFirstArgs>(args?: SelectSubset<T, PayupFindFirstArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupFindFirstOrThrowArgs} args - Arguments to find a Payup
     * @example
     * // Get one Payup
     * const payup = await prisma.payup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayupFindFirstOrThrowArgs>(args?: SelectSubset<T, PayupFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payups
     * const payups = await prisma.payup.findMany()
     * 
     * // Get first 10 Payups
     * const payups = await prisma.payup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payupWithIdOnly = await prisma.payup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayupFindManyArgs>(args?: SelectSubset<T, PayupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payup.
     * @param {PayupCreateArgs} args - Arguments to create a Payup.
     * @example
     * // Create one Payup
     * const Payup = await prisma.payup.create({
     *   data: {
     *     // ... data to create a Payup
     *   }
     * })
     * 
     */
    create<T extends PayupCreateArgs>(args: SelectSubset<T, PayupCreateArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payups.
     * @param {PayupCreateManyArgs} args - Arguments to create many Payups.
     * @example
     * // Create many Payups
     * const payup = await prisma.payup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayupCreateManyArgs>(args?: SelectSubset<T, PayupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payups and returns the data saved in the database.
     * @param {PayupCreateManyAndReturnArgs} args - Arguments to create many Payups.
     * @example
     * // Create many Payups
     * const payup = await prisma.payup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payups and only return the `id`
     * const payupWithIdOnly = await prisma.payup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PayupCreateManyAndReturnArgs>(args?: SelectSubset<T, PayupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payup.
     * @param {PayupDeleteArgs} args - Arguments to delete one Payup.
     * @example
     * // Delete one Payup
     * const Payup = await prisma.payup.delete({
     *   where: {
     *     // ... filter to delete one Payup
     *   }
     * })
     * 
     */
    delete<T extends PayupDeleteArgs>(args: SelectSubset<T, PayupDeleteArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payup.
     * @param {PayupUpdateArgs} args - Arguments to update one Payup.
     * @example
     * // Update one Payup
     * const payup = await prisma.payup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayupUpdateArgs>(args: SelectSubset<T, PayupUpdateArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payups.
     * @param {PayupDeleteManyArgs} args - Arguments to filter Payups to delete.
     * @example
     * // Delete a few Payups
     * const { count } = await prisma.payup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayupDeleteManyArgs>(args?: SelectSubset<T, PayupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payups
     * const payup = await prisma.payup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayupUpdateManyArgs>(args: SelectSubset<T, PayupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payups and returns the data updated in the database.
     * @param {PayupUpdateManyAndReturnArgs} args - Arguments to update many Payups.
     * @example
     * // Update many Payups
     * const payup = await prisma.payup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payups and only return the `id`
     * const payupWithIdOnly = await prisma.payup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PayupUpdateManyAndReturnArgs>(args: SelectSubset<T, PayupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payup.
     * @param {PayupUpsertArgs} args - Arguments to update or create a Payup.
     * @example
     * // Update or create a Payup
     * const payup = await prisma.payup.upsert({
     *   create: {
     *     // ... data to create a Payup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payup we want to update
     *   }
     * })
     */
    upsert<T extends PayupUpsertArgs>(args: SelectSubset<T, PayupUpsertArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupCountArgs} args - Arguments to filter Payups to count.
     * @example
     * // Count the number of Payups
     * const count = await prisma.payup.count({
     *   where: {
     *     // ... the filter for the Payups we want to count
     *   }
     * })
    **/
    count<T extends PayupCountArgs>(
      args?: Subset<T, PayupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PayupAggregateArgs>(args: Subset<T, PayupAggregateArgs>): Prisma.PrismaPromise<GetPayupAggregateType<T>>

    /**
     * Group by Payup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PayupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayupGroupByArgs['orderBy'] }
        : { orderBy?: PayupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PayupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payup model
   */
  readonly fields: PayupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends Payup$transactionArgs<ExtArgs> = {}>(args?: Subset<T, Payup$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payup model
   */
  interface PayupFieldRefs {
    readonly id: FieldRef<"Payup", 'String'>
    readonly app_id: FieldRef<"Payup", 'String'>
    readonly amount: FieldRef<"Payup", 'Int'>
    readonly currency: FieldRef<"Payup", 'String'>
    readonly status: FieldRef<"Payup", 'String'>
    readonly customer_email: FieldRef<"Payup", 'String'>
    readonly customer_name: FieldRef<"Payup", 'String'>
    readonly customer_id: FieldRef<"Payup", 'String'>
    readonly description: FieldRef<"Payup", 'String'>
    readonly return_url: FieldRef<"Payup", 'String'>
    readonly cancel_url: FieldRef<"Payup", 'String'>
    readonly metadata: FieldRef<"Payup", 'Json'>
    readonly provider_data: FieldRef<"Payup", 'Json'>
    readonly created_at: FieldRef<"Payup", 'DateTime'>
    readonly updated_at: FieldRef<"Payup", 'DateTime'>
    readonly expires_at: FieldRef<"Payup", 'DateTime'>
    readonly completed_at: FieldRef<"Payup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payup findUnique
   */
  export type PayupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter, which Payup to fetch.
     */
    where: PayupWhereUniqueInput
  }

  /**
   * Payup findUniqueOrThrow
   */
  export type PayupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter, which Payup to fetch.
     */
    where: PayupWhereUniqueInput
  }

  /**
   * Payup findFirst
   */
  export type PayupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter, which Payup to fetch.
     */
    where?: PayupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payups to fetch.
     */
    orderBy?: PayupOrderByWithRelationInput | PayupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payups.
     */
    cursor?: PayupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payups.
     */
    distinct?: PayupScalarFieldEnum | PayupScalarFieldEnum[]
  }

  /**
   * Payup findFirstOrThrow
   */
  export type PayupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter, which Payup to fetch.
     */
    where?: PayupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payups to fetch.
     */
    orderBy?: PayupOrderByWithRelationInput | PayupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payups.
     */
    cursor?: PayupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payups.
     */
    distinct?: PayupScalarFieldEnum | PayupScalarFieldEnum[]
  }

  /**
   * Payup findMany
   */
  export type PayupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter, which Payups to fetch.
     */
    where?: PayupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payups to fetch.
     */
    orderBy?: PayupOrderByWithRelationInput | PayupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payups.
     */
    cursor?: PayupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payups.
     */
    skip?: number
    distinct?: PayupScalarFieldEnum | PayupScalarFieldEnum[]
  }

  /**
   * Payup create
   */
  export type PayupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * The data needed to create a Payup.
     */
    data: XOR<PayupCreateInput, PayupUncheckedCreateInput>
  }

  /**
   * Payup createMany
   */
  export type PayupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payups.
     */
    data: PayupCreateManyInput | PayupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payup createManyAndReturn
   */
  export type PayupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * The data used to create many Payups.
     */
    data: PayupCreateManyInput | PayupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payup update
   */
  export type PayupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * The data needed to update a Payup.
     */
    data: XOR<PayupUpdateInput, PayupUncheckedUpdateInput>
    /**
     * Choose, which Payup to update.
     */
    where: PayupWhereUniqueInput
  }

  /**
   * Payup updateMany
   */
  export type PayupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payups.
     */
    data: XOR<PayupUpdateManyMutationInput, PayupUncheckedUpdateManyInput>
    /**
     * Filter which Payups to update
     */
    where?: PayupWhereInput
    /**
     * Limit how many Payups to update.
     */
    limit?: number
  }

  /**
   * Payup updateManyAndReturn
   */
  export type PayupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * The data used to update Payups.
     */
    data: XOR<PayupUpdateManyMutationInput, PayupUncheckedUpdateManyInput>
    /**
     * Filter which Payups to update
     */
    where?: PayupWhereInput
    /**
     * Limit how many Payups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payup upsert
   */
  export type PayupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * The filter to search for the Payup to update in case it exists.
     */
    where: PayupWhereUniqueInput
    /**
     * In case the Payup found by the `where` argument doesn't exist, create a new Payup with this data.
     */
    create: XOR<PayupCreateInput, PayupUncheckedCreateInput>
    /**
     * In case the Payup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayupUpdateInput, PayupUncheckedUpdateInput>
  }

  /**
   * Payup delete
   */
  export type PayupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
    /**
     * Filter which Payup to delete.
     */
    where: PayupWhereUniqueInput
  }

  /**
   * Payup deleteMany
   */
  export type PayupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payups to delete
     */
    where?: PayupWhereInput
    /**
     * Limit how many Payups to delete.
     */
    limit?: number
  }

  /**
   * Payup.transaction
   */
  export type Payup$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * Payup without action
   */
  export type PayupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payup
     */
    select?: PayupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payup
     */
    omit?: PayupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayupInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
    fees: number | null
    net_amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
    fees: number | null
    net_amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    payup_id: string | null
    external_id: string | null
    amount: number | null
    currency: string | null
    status: string | null
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    failure_reason: string | null
    fees: number | null
    net_amount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    payup_id: string | null
    external_id: string | null
    amount: number | null
    currency: string | null
    status: string | null
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    failure_reason: string | null
    fees: number | null
    net_amount: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    app_id: number
    payup_id: number
    external_id: number
    amount: number
    currency: number
    status: number
    customer_email: number
    customer_name: number
    customer_id: number
    description: number
    metadata: number
    failure_reason: number
    provider_data: number
    fees: number
    net_amount: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    fees?: true
    net_amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    fees?: true
    net_amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    app_id?: true
    payup_id?: true
    external_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    failure_reason?: true
    fees?: true
    net_amount?: true
    created_at?: true
    updated_at?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    app_id?: true
    payup_id?: true
    external_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    failure_reason?: true
    fees?: true
    net_amount?: true
    created_at?: true
    updated_at?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    app_id?: true
    payup_id?: true
    external_id?: true
    amount?: true
    currency?: true
    status?: true
    customer_email?: true
    customer_name?: true
    customer_id?: true
    description?: true
    metadata?: true
    failure_reason?: true
    provider_data?: true
    fees?: true
    net_amount?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    app_id: string
    payup_id: string
    external_id: string | null
    amount: number
    currency: string
    status: string
    customer_email: string | null
    customer_name: string | null
    customer_id: string | null
    description: string | null
    metadata: JsonValue | null
    failure_reason: string | null
    provider_data: JsonValue | null
    fees: number | null
    net_amount: number | null
    created_at: Date
    updated_at: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    payup_id?: boolean
    external_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    metadata?: boolean
    failure_reason?: boolean
    provider_data?: boolean
    fees?: boolean
    net_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
    webhook_logs?: boolean | Transaction$webhook_logsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    payup_id?: boolean
    external_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    metadata?: boolean
    failure_reason?: boolean
    provider_data?: boolean
    fees?: boolean
    net_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    payup_id?: boolean
    external_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    metadata?: boolean
    failure_reason?: boolean
    provider_data?: boolean
    fees?: boolean
    net_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    app_id?: boolean
    payup_id?: boolean
    external_id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customer_email?: boolean
    customer_name?: boolean
    customer_id?: boolean
    description?: boolean
    metadata?: boolean
    failure_reason?: boolean
    provider_data?: boolean
    fees?: boolean
    net_amount?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_id" | "payup_id" | "external_id" | "amount" | "currency" | "status" | "customer_email" | "customer_name" | "customer_id" | "description" | "metadata" | "failure_reason" | "provider_data" | "fees" | "net_amount" | "created_at" | "updated_at", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
    webhook_logs?: boolean | Transaction$webhook_logsArgs<ExtArgs>
    _count?: boolean | TransactionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    payup?: boolean | PayupDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      app: Prisma.$AppPayload<ExtArgs>
      payup: Prisma.$PayupPayload<ExtArgs>
      webhook_logs: Prisma.$WebhookLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string
      payup_id: string
      external_id: string | null
      amount: number
      currency: string
      status: string
      customer_email: string | null
      customer_name: string | null
      customer_id: string | null
      description: string | null
      metadata: Prisma.JsonValue | null
      failure_reason: string | null
      provider_data: Prisma.JsonValue | null
      fees: number | null
      net_amount: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payup<T extends PayupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PayupDefaultArgs<ExtArgs>>): Prisma__PayupClient<$Result.GetResult<Prisma.$PayupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    webhook_logs<T extends Transaction$webhook_logsArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$webhook_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly app_id: FieldRef<"Transaction", 'String'>
    readonly payup_id: FieldRef<"Transaction", 'String'>
    readonly external_id: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly currency: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly customer_email: FieldRef<"Transaction", 'String'>
    readonly customer_name: FieldRef<"Transaction", 'String'>
    readonly customer_id: FieldRef<"Transaction", 'String'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly metadata: FieldRef<"Transaction", 'Json'>
    readonly failure_reason: FieldRef<"Transaction", 'String'>
    readonly provider_data: FieldRef<"Transaction", 'Json'>
    readonly fees: FieldRef<"Transaction", 'Int'>
    readonly net_amount: FieldRef<"Transaction", 'Int'>
    readonly created_at: FieldRef<"Transaction", 'DateTime'>
    readonly updated_at: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.webhook_logs
   */
  export type Transaction$webhook_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    cursor?: WebhookLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model WebhookTemplate
   */

  export type AggregateWebhookTemplate = {
    _count: WebhookTemplateCountAggregateOutputType | null
    _min: WebhookTemplateMinAggregateOutputType | null
    _max: WebhookTemplateMaxAggregateOutputType | null
  }

  export type WebhookTemplateMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    name: string | null
    event_type: string | null
    is_default: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookTemplateMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    name: string | null
    event_type: string | null
    is_default: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookTemplateCountAggregateOutputType = {
    id: number
    app_id: number
    name: number
    event_type: number
    is_default: number
    format: number
    headers: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WebhookTemplateMinAggregateInputType = {
    id?: true
    app_id?: true
    name?: true
    event_type?: true
    is_default?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookTemplateMaxAggregateInputType = {
    id?: true
    app_id?: true
    name?: true
    event_type?: true
    is_default?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookTemplateCountAggregateInputType = {
    id?: true
    app_id?: true
    name?: true
    event_type?: true
    is_default?: true
    format?: true
    headers?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WebhookTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookTemplate to aggregate.
     */
    where?: WebhookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookTemplates to fetch.
     */
    orderBy?: WebhookTemplateOrderByWithRelationInput | WebhookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookTemplates
    **/
    _count?: true | WebhookTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookTemplateMaxAggregateInputType
  }

  export type GetWebhookTemplateAggregateType<T extends WebhookTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookTemplate[P]>
      : GetScalarType<T[P], AggregateWebhookTemplate[P]>
  }




  export type WebhookTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookTemplateWhereInput
    orderBy?: WebhookTemplateOrderByWithAggregationInput | WebhookTemplateOrderByWithAggregationInput[]
    by: WebhookTemplateScalarFieldEnum[] | WebhookTemplateScalarFieldEnum
    having?: WebhookTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookTemplateCountAggregateInputType | true
    _min?: WebhookTemplateMinAggregateInputType
    _max?: WebhookTemplateMaxAggregateInputType
  }

  export type WebhookTemplateGroupByOutputType = {
    id: string
    app_id: string
    name: string
    event_type: string
    is_default: boolean
    format: JsonValue
    headers: JsonValue | null
    created_at: Date
    updated_at: Date
    _count: WebhookTemplateCountAggregateOutputType | null
    _min: WebhookTemplateMinAggregateOutputType | null
    _max: WebhookTemplateMaxAggregateOutputType | null
  }

  type GetWebhookTemplateGroupByPayload<T extends WebhookTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookTemplateGroupByOutputType[P]>
        }
      >
    >


  export type WebhookTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    name?: boolean
    event_type?: boolean
    is_default?: boolean
    format?: boolean
    headers?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookTemplate"]>

  export type WebhookTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    name?: boolean
    event_type?: boolean
    is_default?: boolean
    format?: boolean
    headers?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookTemplate"]>

  export type WebhookTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    name?: boolean
    event_type?: boolean
    is_default?: boolean
    format?: boolean
    headers?: boolean
    created_at?: boolean
    updated_at?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookTemplate"]>

  export type WebhookTemplateSelectScalar = {
    id?: boolean
    app_id?: boolean
    name?: boolean
    event_type?: boolean
    is_default?: boolean
    format?: boolean
    headers?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WebhookTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_id" | "name" | "event_type" | "is_default" | "format" | "headers" | "created_at" | "updated_at", ExtArgs["result"]["webhookTemplate"]>
  export type WebhookTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type WebhookTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }
  export type WebhookTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
  }

  export type $WebhookTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookTemplate"
    objects: {
      app: Prisma.$AppPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string
      name: string
      event_type: string
      is_default: boolean
      format: Prisma.JsonValue
      headers: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["webhookTemplate"]>
    composites: {}
  }

  type WebhookTemplateGetPayload<S extends boolean | null | undefined | WebhookTemplateDefaultArgs> = $Result.GetResult<Prisma.$WebhookTemplatePayload, S>

  type WebhookTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookTemplateCountAggregateInputType | true
    }

  export interface WebhookTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookTemplate'], meta: { name: 'WebhookTemplate' } }
    /**
     * Find zero or one WebhookTemplate that matches the filter.
     * @param {WebhookTemplateFindUniqueArgs} args - Arguments to find a WebhookTemplate
     * @example
     * // Get one WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookTemplateFindUniqueArgs>(args: SelectSubset<T, WebhookTemplateFindUniqueArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookTemplateFindUniqueOrThrowArgs} args - Arguments to find a WebhookTemplate
     * @example
     * // Get one WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateFindFirstArgs} args - Arguments to find a WebhookTemplate
     * @example
     * // Get one WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookTemplateFindFirstArgs>(args?: SelectSubset<T, WebhookTemplateFindFirstArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateFindFirstOrThrowArgs} args - Arguments to find a WebhookTemplate
     * @example
     * // Get one WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookTemplates
     * const webhookTemplates = await prisma.webhookTemplate.findMany()
     * 
     * // Get first 10 WebhookTemplates
     * const webhookTemplates = await prisma.webhookTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookTemplateWithIdOnly = await prisma.webhookTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookTemplateFindManyArgs>(args?: SelectSubset<T, WebhookTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookTemplate.
     * @param {WebhookTemplateCreateArgs} args - Arguments to create a WebhookTemplate.
     * @example
     * // Create one WebhookTemplate
     * const WebhookTemplate = await prisma.webhookTemplate.create({
     *   data: {
     *     // ... data to create a WebhookTemplate
     *   }
     * })
     * 
     */
    create<T extends WebhookTemplateCreateArgs>(args: SelectSubset<T, WebhookTemplateCreateArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookTemplates.
     * @param {WebhookTemplateCreateManyArgs} args - Arguments to create many WebhookTemplates.
     * @example
     * // Create many WebhookTemplates
     * const webhookTemplate = await prisma.webhookTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookTemplateCreateManyArgs>(args?: SelectSubset<T, WebhookTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookTemplates and returns the data saved in the database.
     * @param {WebhookTemplateCreateManyAndReturnArgs} args - Arguments to create many WebhookTemplates.
     * @example
     * // Create many WebhookTemplates
     * const webhookTemplate = await prisma.webhookTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookTemplates and only return the `id`
     * const webhookTemplateWithIdOnly = await prisma.webhookTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookTemplate.
     * @param {WebhookTemplateDeleteArgs} args - Arguments to delete one WebhookTemplate.
     * @example
     * // Delete one WebhookTemplate
     * const WebhookTemplate = await prisma.webhookTemplate.delete({
     *   where: {
     *     // ... filter to delete one WebhookTemplate
     *   }
     * })
     * 
     */
    delete<T extends WebhookTemplateDeleteArgs>(args: SelectSubset<T, WebhookTemplateDeleteArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookTemplate.
     * @param {WebhookTemplateUpdateArgs} args - Arguments to update one WebhookTemplate.
     * @example
     * // Update one WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookTemplateUpdateArgs>(args: SelectSubset<T, WebhookTemplateUpdateArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookTemplates.
     * @param {WebhookTemplateDeleteManyArgs} args - Arguments to filter WebhookTemplates to delete.
     * @example
     * // Delete a few WebhookTemplates
     * const { count } = await prisma.webhookTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookTemplateDeleteManyArgs>(args?: SelectSubset<T, WebhookTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookTemplates
     * const webhookTemplate = await prisma.webhookTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookTemplateUpdateManyArgs>(args: SelectSubset<T, WebhookTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookTemplates and returns the data updated in the database.
     * @param {WebhookTemplateUpdateManyAndReturnArgs} args - Arguments to update many WebhookTemplates.
     * @example
     * // Update many WebhookTemplates
     * const webhookTemplate = await prisma.webhookTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookTemplates and only return the `id`
     * const webhookTemplateWithIdOnly = await prisma.webhookTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookTemplate.
     * @param {WebhookTemplateUpsertArgs} args - Arguments to update or create a WebhookTemplate.
     * @example
     * // Update or create a WebhookTemplate
     * const webhookTemplate = await prisma.webhookTemplate.upsert({
     *   create: {
     *     // ... data to create a WebhookTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookTemplate we want to update
     *   }
     * })
     */
    upsert<T extends WebhookTemplateUpsertArgs>(args: SelectSubset<T, WebhookTemplateUpsertArgs<ExtArgs>>): Prisma__WebhookTemplateClient<$Result.GetResult<Prisma.$WebhookTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateCountArgs} args - Arguments to filter WebhookTemplates to count.
     * @example
     * // Count the number of WebhookTemplates
     * const count = await prisma.webhookTemplate.count({
     *   where: {
     *     // ... the filter for the WebhookTemplates we want to count
     *   }
     * })
    **/
    count<T extends WebhookTemplateCountArgs>(
      args?: Subset<T, WebhookTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookTemplateAggregateArgs>(args: Subset<T, WebhookTemplateAggregateArgs>): Prisma.PrismaPromise<GetWebhookTemplateAggregateType<T>>

    /**
     * Group by WebhookTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookTemplateGroupByArgs['orderBy'] }
        : { orderBy?: WebhookTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookTemplate model
   */
  readonly fields: WebhookTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookTemplate model
   */
  interface WebhookTemplateFieldRefs {
    readonly id: FieldRef<"WebhookTemplate", 'String'>
    readonly app_id: FieldRef<"WebhookTemplate", 'String'>
    readonly name: FieldRef<"WebhookTemplate", 'String'>
    readonly event_type: FieldRef<"WebhookTemplate", 'String'>
    readonly is_default: FieldRef<"WebhookTemplate", 'Boolean'>
    readonly format: FieldRef<"WebhookTemplate", 'Json'>
    readonly headers: FieldRef<"WebhookTemplate", 'Json'>
    readonly created_at: FieldRef<"WebhookTemplate", 'DateTime'>
    readonly updated_at: FieldRef<"WebhookTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookTemplate findUnique
   */
  export type WebhookTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which WebhookTemplate to fetch.
     */
    where: WebhookTemplateWhereUniqueInput
  }

  /**
   * WebhookTemplate findUniqueOrThrow
   */
  export type WebhookTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which WebhookTemplate to fetch.
     */
    where: WebhookTemplateWhereUniqueInput
  }

  /**
   * WebhookTemplate findFirst
   */
  export type WebhookTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which WebhookTemplate to fetch.
     */
    where?: WebhookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookTemplates to fetch.
     */
    orderBy?: WebhookTemplateOrderByWithRelationInput | WebhookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookTemplates.
     */
    cursor?: WebhookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookTemplates.
     */
    distinct?: WebhookTemplateScalarFieldEnum | WebhookTemplateScalarFieldEnum[]
  }

  /**
   * WebhookTemplate findFirstOrThrow
   */
  export type WebhookTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which WebhookTemplate to fetch.
     */
    where?: WebhookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookTemplates to fetch.
     */
    orderBy?: WebhookTemplateOrderByWithRelationInput | WebhookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookTemplates.
     */
    cursor?: WebhookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookTemplates.
     */
    distinct?: WebhookTemplateScalarFieldEnum | WebhookTemplateScalarFieldEnum[]
  }

  /**
   * WebhookTemplate findMany
   */
  export type WebhookTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter, which WebhookTemplates to fetch.
     */
    where?: WebhookTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookTemplates to fetch.
     */
    orderBy?: WebhookTemplateOrderByWithRelationInput | WebhookTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookTemplates.
     */
    cursor?: WebhookTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookTemplates.
     */
    skip?: number
    distinct?: WebhookTemplateScalarFieldEnum | WebhookTemplateScalarFieldEnum[]
  }

  /**
   * WebhookTemplate create
   */
  export type WebhookTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookTemplate.
     */
    data: XOR<WebhookTemplateCreateInput, WebhookTemplateUncheckedCreateInput>
  }

  /**
   * WebhookTemplate createMany
   */
  export type WebhookTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookTemplates.
     */
    data: WebhookTemplateCreateManyInput | WebhookTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookTemplate createManyAndReturn
   */
  export type WebhookTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookTemplates.
     */
    data: WebhookTemplateCreateManyInput | WebhookTemplateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookTemplate update
   */
  export type WebhookTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookTemplate.
     */
    data: XOR<WebhookTemplateUpdateInput, WebhookTemplateUncheckedUpdateInput>
    /**
     * Choose, which WebhookTemplate to update.
     */
    where: WebhookTemplateWhereUniqueInput
  }

  /**
   * WebhookTemplate updateMany
   */
  export type WebhookTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookTemplates.
     */
    data: XOR<WebhookTemplateUpdateManyMutationInput, WebhookTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WebhookTemplates to update
     */
    where?: WebhookTemplateWhereInput
    /**
     * Limit how many WebhookTemplates to update.
     */
    limit?: number
  }

  /**
   * WebhookTemplate updateManyAndReturn
   */
  export type WebhookTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * The data used to update WebhookTemplates.
     */
    data: XOR<WebhookTemplateUpdateManyMutationInput, WebhookTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WebhookTemplates to update
     */
    where?: WebhookTemplateWhereInput
    /**
     * Limit how many WebhookTemplates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookTemplate upsert
   */
  export type WebhookTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookTemplate to update in case it exists.
     */
    where: WebhookTemplateWhereUniqueInput
    /**
     * In case the WebhookTemplate found by the `where` argument doesn't exist, create a new WebhookTemplate with this data.
     */
    create: XOR<WebhookTemplateCreateInput, WebhookTemplateUncheckedCreateInput>
    /**
     * In case the WebhookTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookTemplateUpdateInput, WebhookTemplateUncheckedUpdateInput>
  }

  /**
   * WebhookTemplate delete
   */
  export type WebhookTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
    /**
     * Filter which WebhookTemplate to delete.
     */
    where: WebhookTemplateWhereUniqueInput
  }

  /**
   * WebhookTemplate deleteMany
   */
  export type WebhookTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookTemplates to delete
     */
    where?: WebhookTemplateWhereInput
    /**
     * Limit how many WebhookTemplates to delete.
     */
    limit?: number
  }

  /**
   * WebhookTemplate without action
   */
  export type WebhookTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookTemplate
     */
    select?: WebhookTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookTemplate
     */
    omit?: WebhookTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookTemplateInclude<ExtArgs> | null
  }


  /**
   * Model WebhookLog
   */

  export type AggregateWebhookLog = {
    _count: WebhookLogCountAggregateOutputType | null
    _avg: WebhookLogAvgAggregateOutputType | null
    _sum: WebhookLogSumAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  export type WebhookLogAvgAggregateOutputType = {
    status_code: number | null
    retry_count: number | null
    latency_ms: number | null
  }

  export type WebhookLogSumAggregateOutputType = {
    status_code: number | null
    retry_count: number | null
    latency_ms: number | null
  }

  export type WebhookLogMinAggregateOutputType = {
    id: string | null
    app_id: string | null
    transaction_id: string | null
    event_type: string | null
    direction: string | null
    status_code: number | null
    response_body: string | null
    error_message: string | null
    retry_count: number | null
    next_retry_at: Date | null
    processed_at: Date | null
    latency_ms: number | null
  }

  export type WebhookLogMaxAggregateOutputType = {
    id: string | null
    app_id: string | null
    transaction_id: string | null
    event_type: string | null
    direction: string | null
    status_code: number | null
    response_body: string | null
    error_message: string | null
    retry_count: number | null
    next_retry_at: Date | null
    processed_at: Date | null
    latency_ms: number | null
  }

  export type WebhookLogCountAggregateOutputType = {
    id: number
    app_id: number
    transaction_id: number
    event_type: number
    direction: number
    payload: number
    headers: number
    status_code: number
    response_body: number
    error_message: number
    retry_count: number
    next_retry_at: number
    processed_at: number
    latency_ms: number
    _all: number
  }


  export type WebhookLogAvgAggregateInputType = {
    status_code?: true
    retry_count?: true
    latency_ms?: true
  }

  export type WebhookLogSumAggregateInputType = {
    status_code?: true
    retry_count?: true
    latency_ms?: true
  }

  export type WebhookLogMinAggregateInputType = {
    id?: true
    app_id?: true
    transaction_id?: true
    event_type?: true
    direction?: true
    status_code?: true
    response_body?: true
    error_message?: true
    retry_count?: true
    next_retry_at?: true
    processed_at?: true
    latency_ms?: true
  }

  export type WebhookLogMaxAggregateInputType = {
    id?: true
    app_id?: true
    transaction_id?: true
    event_type?: true
    direction?: true
    status_code?: true
    response_body?: true
    error_message?: true
    retry_count?: true
    next_retry_at?: true
    processed_at?: true
    latency_ms?: true
  }

  export type WebhookLogCountAggregateInputType = {
    id?: true
    app_id?: true
    transaction_id?: true
    event_type?: true
    direction?: true
    payload?: true
    headers?: true
    status_code?: true
    response_body?: true
    error_message?: true
    retry_count?: true
    next_retry_at?: true
    processed_at?: true
    latency_ms?: true
    _all?: true
  }

  export type WebhookLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLog to aggregate.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookLogs
    **/
    _count?: true | WebhookLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookLogMaxAggregateInputType
  }

  export type GetWebhookLogAggregateType<T extends WebhookLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookLog[P]>
      : GetScalarType<T[P], AggregateWebhookLog[P]>
  }




  export type WebhookLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithAggregationInput | WebhookLogOrderByWithAggregationInput[]
    by: WebhookLogScalarFieldEnum[] | WebhookLogScalarFieldEnum
    having?: WebhookLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookLogCountAggregateInputType | true
    _avg?: WebhookLogAvgAggregateInputType
    _sum?: WebhookLogSumAggregateInputType
    _min?: WebhookLogMinAggregateInputType
    _max?: WebhookLogMaxAggregateInputType
  }

  export type WebhookLogGroupByOutputType = {
    id: string
    app_id: string
    transaction_id: string | null
    event_type: string
    direction: string
    payload: JsonValue
    headers: JsonValue | null
    status_code: number | null
    response_body: string | null
    error_message: string | null
    retry_count: number
    next_retry_at: Date | null
    processed_at: Date
    latency_ms: number | null
    _count: WebhookLogCountAggregateOutputType | null
    _avg: WebhookLogAvgAggregateOutputType | null
    _sum: WebhookLogSumAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  type GetWebhookLogGroupByPayload<T extends WebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
        }
      >
    >


  export type WebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    transaction_id?: boolean
    event_type?: boolean
    direction?: boolean
    payload?: boolean
    headers?: boolean
    status_code?: boolean
    response_body?: boolean
    error_message?: boolean
    retry_count?: boolean
    next_retry_at?: boolean
    processed_at?: boolean
    latency_ms?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    transaction_id?: boolean
    event_type?: boolean
    direction?: boolean
    payload?: boolean
    headers?: boolean
    status_code?: boolean
    response_body?: boolean
    error_message?: boolean
    retry_count?: boolean
    next_retry_at?: boolean
    processed_at?: boolean
    latency_ms?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    app_id?: boolean
    transaction_id?: boolean
    event_type?: boolean
    direction?: boolean
    payload?: boolean
    headers?: boolean
    status_code?: boolean
    response_body?: boolean
    error_message?: boolean
    retry_count?: boolean
    next_retry_at?: boolean
    processed_at?: boolean
    latency_ms?: boolean
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectScalar = {
    id?: boolean
    app_id?: boolean
    transaction_id?: boolean
    event_type?: boolean
    direction?: boolean
    payload?: boolean
    headers?: boolean
    status_code?: boolean
    response_body?: boolean
    error_message?: boolean
    retry_count?: boolean
    next_retry_at?: boolean
    processed_at?: boolean
    latency_ms?: boolean
  }

  export type WebhookLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "app_id" | "transaction_id" | "event_type" | "direction" | "payload" | "headers" | "status_code" | "response_body" | "error_message" | "retry_count" | "next_retry_at" | "processed_at" | "latency_ms", ExtArgs["result"]["webhookLog"]>
  export type WebhookLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }
  export type WebhookLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }
  export type WebhookLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    app?: boolean | AppDefaultArgs<ExtArgs>
    transaction?: boolean | WebhookLog$transactionArgs<ExtArgs>
  }

  export type $WebhookLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookLog"
    objects: {
      app: Prisma.$AppPayload<ExtArgs>
      transaction: Prisma.$TransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      app_id: string
      transaction_id: string | null
      event_type: string
      direction: string
      payload: Prisma.JsonValue
      headers: Prisma.JsonValue | null
      status_code: number | null
      response_body: string | null
      error_message: string | null
      retry_count: number
      next_retry_at: Date | null
      processed_at: Date
      latency_ms: number | null
    }, ExtArgs["result"]["webhookLog"]>
    composites: {}
  }

  type WebhookLogGetPayload<S extends boolean | null | undefined | WebhookLogDefaultArgs> = $Result.GetResult<Prisma.$WebhookLogPayload, S>

  type WebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookLogCountAggregateInputType | true
    }

  export interface WebhookLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookLog'], meta: { name: 'WebhookLog' } }
    /**
     * Find zero or one WebhookLog that matches the filter.
     * @param {WebhookLogFindUniqueArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookLogFindUniqueArgs>(args: SelectSubset<T, WebhookLogFindUniqueArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookLogFindUniqueOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookLogFindFirstArgs>(args?: SelectSubset<T, WebhookLogFindFirstArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany()
     * 
     * // Get first 10 WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookLogFindManyArgs>(args?: SelectSubset<T, WebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookLog.
     * @param {WebhookLogCreateArgs} args - Arguments to create a WebhookLog.
     * @example
     * // Create one WebhookLog
     * const WebhookLog = await prisma.webhookLog.create({
     *   data: {
     *     // ... data to create a WebhookLog
     *   }
     * })
     * 
     */
    create<T extends WebhookLogCreateArgs>(args: SelectSubset<T, WebhookLogCreateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookLogs.
     * @param {WebhookLogCreateManyArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookLogCreateManyArgs>(args?: SelectSubset<T, WebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookLogs and returns the data saved in the database.
     * @param {WebhookLogCreateManyAndReturnArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookLogs and only return the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookLog.
     * @param {WebhookLogDeleteArgs} args - Arguments to delete one WebhookLog.
     * @example
     * // Delete one WebhookLog
     * const WebhookLog = await prisma.webhookLog.delete({
     *   where: {
     *     // ... filter to delete one WebhookLog
     *   }
     * })
     * 
     */
    delete<T extends WebhookLogDeleteArgs>(args: SelectSubset<T, WebhookLogDeleteArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookLog.
     * @param {WebhookLogUpdateArgs} args - Arguments to update one WebhookLog.
     * @example
     * // Update one WebhookLog
     * const webhookLog = await prisma.webhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookLogUpdateArgs>(args: SelectSubset<T, WebhookLogUpdateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookLogs.
     * @param {WebhookLogDeleteManyArgs} args - Arguments to filter WebhookLogs to delete.
     * @example
     * // Delete a few WebhookLogs
     * const { count } = await prisma.webhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookLogDeleteManyArgs>(args?: SelectSubset<T, WebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookLogUpdateManyArgs>(args: SelectSubset<T, WebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookLogs and returns the data updated in the database.
     * @param {WebhookLogUpdateManyAndReturnArgs} args - Arguments to update many WebhookLogs.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookLogs and only return the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookLog.
     * @param {WebhookLogUpsertArgs} args - Arguments to update or create a WebhookLog.
     * @example
     * // Update or create a WebhookLog
     * const webhookLog = await prisma.webhookLog.upsert({
     *   create: {
     *     // ... data to create a WebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends WebhookLogUpsertArgs>(args: SelectSubset<T, WebhookLogUpsertArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogCountArgs} args - Arguments to filter WebhookLogs to count.
     * @example
     * // Count the number of WebhookLogs
     * const count = await prisma.webhookLog.count({
     *   where: {
     *     // ... the filter for the WebhookLogs we want to count
     *   }
     * })
    **/
    count<T extends WebhookLogCountArgs>(
      args?: Subset<T, WebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookLogAggregateArgs>(args: Subset<T, WebhookLogAggregateArgs>): Prisma.PrismaPromise<GetWebhookLogAggregateType<T>>

    /**
     * Group by WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: WebhookLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookLog model
   */
  readonly fields: WebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    app<T extends AppDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AppDefaultArgs<ExtArgs>>): Prisma__AppClient<$Result.GetResult<Prisma.$AppPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transaction<T extends WebhookLog$transactionArgs<ExtArgs> = {}>(args?: Subset<T, WebhookLog$transactionArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookLog model
   */
  interface WebhookLogFieldRefs {
    readonly id: FieldRef<"WebhookLog", 'String'>
    readonly app_id: FieldRef<"WebhookLog", 'String'>
    readonly transaction_id: FieldRef<"WebhookLog", 'String'>
    readonly event_type: FieldRef<"WebhookLog", 'String'>
    readonly direction: FieldRef<"WebhookLog", 'String'>
    readonly payload: FieldRef<"WebhookLog", 'Json'>
    readonly headers: FieldRef<"WebhookLog", 'Json'>
    readonly status_code: FieldRef<"WebhookLog", 'Int'>
    readonly response_body: FieldRef<"WebhookLog", 'String'>
    readonly error_message: FieldRef<"WebhookLog", 'String'>
    readonly retry_count: FieldRef<"WebhookLog", 'Int'>
    readonly next_retry_at: FieldRef<"WebhookLog", 'DateTime'>
    readonly processed_at: FieldRef<"WebhookLog", 'DateTime'>
    readonly latency_ms: FieldRef<"WebhookLog", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * WebhookLog findUnique
   */
  export type WebhookLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findUniqueOrThrow
   */
  export type WebhookLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findFirst
   */
  export type WebhookLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findFirstOrThrow
   */
  export type WebhookLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findMany
   */
  export type WebhookLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLogs to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog create
   */
  export type WebhookLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookLog.
     */
    data: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
  }

  /**
   * WebhookLog createMany
   */
  export type WebhookLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookLog createManyAndReturn
   */
  export type WebhookLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookLog update
   */
  export type WebhookLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookLog.
     */
    data: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
    /**
     * Choose, which WebhookLog to update.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog updateMany
   */
  export type WebhookLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to update.
     */
    limit?: number
  }

  /**
   * WebhookLog updateManyAndReturn
   */
  export type WebhookLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookLog upsert
   */
  export type WebhookLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookLog to update in case it exists.
     */
    where: WebhookLogWhereUniqueInput
    /**
     * In case the WebhookLog found by the `where` argument doesn't exist, create a new WebhookLog with this data.
     */
    create: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
    /**
     * In case the WebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
  }

  /**
   * WebhookLog delete
   */
  export type WebhookLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter which WebhookLog to delete.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog deleteMany
   */
  export type WebhookLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLogs to delete
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to delete.
     */
    limit?: number
  }

  /**
   * WebhookLog.transaction
   */
  export type WebhookLog$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
  }

  /**
   * WebhookLog without action
   */
  export type WebhookLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AppScalarFieldEnum: {
    id: 'id',
    name: 'name',
    provider: 'provider',
    api_key: 'api_key',
    webhook_secret: 'webhook_secret',
    webhook_url: 'webhook_url',
    is_active: 'is_active',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AppScalarFieldEnum = (typeof AppScalarFieldEnum)[keyof typeof AppScalarFieldEnum]


  export const PayupScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    customer_email: 'customer_email',
    customer_name: 'customer_name',
    customer_id: 'customer_id',
    description: 'description',
    return_url: 'return_url',
    cancel_url: 'cancel_url',
    metadata: 'metadata',
    provider_data: 'provider_data',
    created_at: 'created_at',
    updated_at: 'updated_at',
    expires_at: 'expires_at',
    completed_at: 'completed_at'
  };

  export type PayupScalarFieldEnum = (typeof PayupScalarFieldEnum)[keyof typeof PayupScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    payup_id: 'payup_id',
    external_id: 'external_id',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    customer_email: 'customer_email',
    customer_name: 'customer_name',
    customer_id: 'customer_id',
    description: 'description',
    metadata: 'metadata',
    failure_reason: 'failure_reason',
    provider_data: 'provider_data',
    fees: 'fees',
    net_amount: 'net_amount',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const WebhookTemplateScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    name: 'name',
    event_type: 'event_type',
    is_default: 'is_default',
    format: 'format',
    headers: 'headers',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WebhookTemplateScalarFieldEnum = (typeof WebhookTemplateScalarFieldEnum)[keyof typeof WebhookTemplateScalarFieldEnum]


  export const WebhookLogScalarFieldEnum: {
    id: 'id',
    app_id: 'app_id',
    transaction_id: 'transaction_id',
    event_type: 'event_type',
    direction: 'direction',
    payload: 'payload',
    headers: 'headers',
    status_code: 'status_code',
    response_body: 'response_body',
    error_message: 'error_message',
    retry_count: 'retry_count',
    next_retry_at: 'next_retry_at',
    processed_at: 'processed_at',
    latency_ms: 'latency_ms'
  };

  export type WebhookLogScalarFieldEnum = (typeof WebhookLogScalarFieldEnum)[keyof typeof WebhookLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AppWhereInput = {
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    id?: StringFilter<"App"> | string
    name?: StringFilter<"App"> | string
    provider?: StringFilter<"App"> | string
    api_key?: StringFilter<"App"> | string
    webhook_secret?: StringFilter<"App"> | string
    webhook_url?: StringFilter<"App"> | string
    is_active?: BoolFilter<"App"> | boolean
    metadata?: JsonNullableFilter<"App">
    created_at?: DateTimeFilter<"App"> | Date | string
    updated_at?: DateTimeFilter<"App"> | Date | string
    payups?: PayupListRelationFilter
    transactions?: TransactionListRelationFilter
    webhook_logs?: WebhookLogListRelationFilter
    webhook_templates?: WebhookTemplateListRelationFilter
  }

  export type AppOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    api_key?: SortOrder
    webhook_secret?: SortOrder
    webhook_url?: SortOrder
    is_active?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    payups?: PayupOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    webhook_logs?: WebhookLogOrderByRelationAggregateInput
    webhook_templates?: WebhookTemplateOrderByRelationAggregateInput
  }

  export type AppWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    api_key?: string
    AND?: AppWhereInput | AppWhereInput[]
    OR?: AppWhereInput[]
    NOT?: AppWhereInput | AppWhereInput[]
    name?: StringFilter<"App"> | string
    provider?: StringFilter<"App"> | string
    webhook_secret?: StringFilter<"App"> | string
    webhook_url?: StringFilter<"App"> | string
    is_active?: BoolFilter<"App"> | boolean
    metadata?: JsonNullableFilter<"App">
    created_at?: DateTimeFilter<"App"> | Date | string
    updated_at?: DateTimeFilter<"App"> | Date | string
    payups?: PayupListRelationFilter
    transactions?: TransactionListRelationFilter
    webhook_logs?: WebhookLogListRelationFilter
    webhook_templates?: WebhookTemplateListRelationFilter
  }, "id" | "api_key">

  export type AppOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    api_key?: SortOrder
    webhook_secret?: SortOrder
    webhook_url?: SortOrder
    is_active?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AppCountOrderByAggregateInput
    _max?: AppMaxOrderByAggregateInput
    _min?: AppMinOrderByAggregateInput
  }

  export type AppScalarWhereWithAggregatesInput = {
    AND?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    OR?: AppScalarWhereWithAggregatesInput[]
    NOT?: AppScalarWhereWithAggregatesInput | AppScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"App"> | string
    name?: StringWithAggregatesFilter<"App"> | string
    provider?: StringWithAggregatesFilter<"App"> | string
    api_key?: StringWithAggregatesFilter<"App"> | string
    webhook_secret?: StringWithAggregatesFilter<"App"> | string
    webhook_url?: StringWithAggregatesFilter<"App"> | string
    is_active?: BoolWithAggregatesFilter<"App"> | boolean
    metadata?: JsonNullableWithAggregatesFilter<"App">
    created_at?: DateTimeWithAggregatesFilter<"App"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"App"> | Date | string
  }

  export type PayupWhereInput = {
    AND?: PayupWhereInput | PayupWhereInput[]
    OR?: PayupWhereInput[]
    NOT?: PayupWhereInput | PayupWhereInput[]
    id?: StringFilter<"Payup"> | string
    app_id?: StringFilter<"Payup"> | string
    amount?: IntFilter<"Payup"> | number
    currency?: StringFilter<"Payup"> | string
    status?: StringFilter<"Payup"> | string
    customer_email?: StringNullableFilter<"Payup"> | string | null
    customer_name?: StringNullableFilter<"Payup"> | string | null
    customer_id?: StringNullableFilter<"Payup"> | string | null
    description?: StringNullableFilter<"Payup"> | string | null
    return_url?: StringNullableFilter<"Payup"> | string | null
    cancel_url?: StringNullableFilter<"Payup"> | string | null
    metadata?: JsonNullableFilter<"Payup">
    provider_data?: JsonNullableFilter<"Payup">
    created_at?: DateTimeFilter<"Payup"> | Date | string
    updated_at?: DateTimeFilter<"Payup"> | Date | string
    expires_at?: DateTimeFilter<"Payup"> | Date | string
    completed_at?: DateTimeNullableFilter<"Payup"> | Date | string | null
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type PayupOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrderInput | SortOrder
    customer_name?: SortOrderInput | SortOrder
    customer_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    return_url?: SortOrderInput | SortOrder
    cancel_url?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    provider_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    expires_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    app?: AppOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type PayupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayupWhereInput | PayupWhereInput[]
    OR?: PayupWhereInput[]
    NOT?: PayupWhereInput | PayupWhereInput[]
    app_id?: StringFilter<"Payup"> | string
    amount?: IntFilter<"Payup"> | number
    currency?: StringFilter<"Payup"> | string
    status?: StringFilter<"Payup"> | string
    customer_email?: StringNullableFilter<"Payup"> | string | null
    customer_name?: StringNullableFilter<"Payup"> | string | null
    customer_id?: StringNullableFilter<"Payup"> | string | null
    description?: StringNullableFilter<"Payup"> | string | null
    return_url?: StringNullableFilter<"Payup"> | string | null
    cancel_url?: StringNullableFilter<"Payup"> | string | null
    metadata?: JsonNullableFilter<"Payup">
    provider_data?: JsonNullableFilter<"Payup">
    created_at?: DateTimeFilter<"Payup"> | Date | string
    updated_at?: DateTimeFilter<"Payup"> | Date | string
    expires_at?: DateTimeFilter<"Payup"> | Date | string
    completed_at?: DateTimeNullableFilter<"Payup"> | Date | string | null
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id">

  export type PayupOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrderInput | SortOrder
    customer_name?: SortOrderInput | SortOrder
    customer_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    return_url?: SortOrderInput | SortOrder
    cancel_url?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    provider_data?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    expires_at?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    _count?: PayupCountOrderByAggregateInput
    _avg?: PayupAvgOrderByAggregateInput
    _max?: PayupMaxOrderByAggregateInput
    _min?: PayupMinOrderByAggregateInput
    _sum?: PayupSumOrderByAggregateInput
  }

  export type PayupScalarWhereWithAggregatesInput = {
    AND?: PayupScalarWhereWithAggregatesInput | PayupScalarWhereWithAggregatesInput[]
    OR?: PayupScalarWhereWithAggregatesInput[]
    NOT?: PayupScalarWhereWithAggregatesInput | PayupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payup"> | string
    app_id?: StringWithAggregatesFilter<"Payup"> | string
    amount?: IntWithAggregatesFilter<"Payup"> | number
    currency?: StringWithAggregatesFilter<"Payup"> | string
    status?: StringWithAggregatesFilter<"Payup"> | string
    customer_email?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    customer_name?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    customer_id?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    description?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    return_url?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    cancel_url?: StringNullableWithAggregatesFilter<"Payup"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Payup">
    provider_data?: JsonNullableWithAggregatesFilter<"Payup">
    created_at?: DateTimeWithAggregatesFilter<"Payup"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Payup"> | Date | string
    expires_at?: DateTimeWithAggregatesFilter<"Payup"> | Date | string
    completed_at?: DateTimeNullableWithAggregatesFilter<"Payup"> | Date | string | null
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    app_id?: StringFilter<"Transaction"> | string
    payup_id?: StringFilter<"Transaction"> | string
    external_id?: StringNullableFilter<"Transaction"> | string | null
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    customer_email?: StringNullableFilter<"Transaction"> | string | null
    customer_name?: StringNullableFilter<"Transaction"> | string | null
    customer_id?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    failure_reason?: StringNullableFilter<"Transaction"> | string | null
    provider_data?: JsonNullableFilter<"Transaction">
    fees?: IntNullableFilter<"Transaction"> | number | null
    net_amount?: IntNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    payup?: XOR<PayupScalarRelationFilter, PayupWhereInput>
    webhook_logs?: WebhookLogListRelationFilter
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrder
    payup_id?: SortOrder
    external_id?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrderInput | SortOrder
    customer_name?: SortOrderInput | SortOrder
    customer_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    failure_reason?: SortOrderInput | SortOrder
    provider_data?: SortOrderInput | SortOrder
    fees?: SortOrderInput | SortOrder
    net_amount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    app?: AppOrderByWithRelationInput
    payup?: PayupOrderByWithRelationInput
    webhook_logs?: WebhookLogOrderByRelationAggregateInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    payup_id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    app_id?: StringFilter<"Transaction"> | string
    external_id?: StringNullableFilter<"Transaction"> | string | null
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    customer_email?: StringNullableFilter<"Transaction"> | string | null
    customer_name?: StringNullableFilter<"Transaction"> | string | null
    customer_id?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    failure_reason?: StringNullableFilter<"Transaction"> | string | null
    provider_data?: JsonNullableFilter<"Transaction">
    fees?: IntNullableFilter<"Transaction"> | number | null
    net_amount?: IntNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    payup?: XOR<PayupScalarRelationFilter, PayupWhereInput>
    webhook_logs?: WebhookLogListRelationFilter
  }, "id" | "payup_id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrder
    payup_id?: SortOrder
    external_id?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrderInput | SortOrder
    customer_name?: SortOrderInput | SortOrder
    customer_id?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    failure_reason?: SortOrderInput | SortOrder
    provider_data?: SortOrderInput | SortOrder
    fees?: SortOrderInput | SortOrder
    net_amount?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    app_id?: StringWithAggregatesFilter<"Transaction"> | string
    payup_id?: StringWithAggregatesFilter<"Transaction"> | string
    external_id?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    currency?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    customer_email?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    customer_name?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    customer_id?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Transaction">
    failure_reason?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    provider_data?: JsonNullableWithAggregatesFilter<"Transaction">
    fees?: IntNullableWithAggregatesFilter<"Transaction"> | number | null
    net_amount?: IntNullableWithAggregatesFilter<"Transaction"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type WebhookTemplateWhereInput = {
    AND?: WebhookTemplateWhereInput | WebhookTemplateWhereInput[]
    OR?: WebhookTemplateWhereInput[]
    NOT?: WebhookTemplateWhereInput | WebhookTemplateWhereInput[]
    id?: StringFilter<"WebhookTemplate"> | string
    app_id?: StringFilter<"WebhookTemplate"> | string
    name?: StringFilter<"WebhookTemplate"> | string
    event_type?: StringFilter<"WebhookTemplate"> | string
    is_default?: BoolFilter<"WebhookTemplate"> | boolean
    format?: JsonFilter<"WebhookTemplate">
    headers?: JsonNullableFilter<"WebhookTemplate">
    created_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
    updated_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
  }

  export type WebhookTemplateOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrder
    name?: SortOrder
    event_type?: SortOrder
    is_default?: SortOrder
    format?: SortOrder
    headers?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    app?: AppOrderByWithRelationInput
  }

  export type WebhookTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    app_id_name_event_type?: WebhookTemplateApp_idNameEvent_typeCompoundUniqueInput
    AND?: WebhookTemplateWhereInput | WebhookTemplateWhereInput[]
    OR?: WebhookTemplateWhereInput[]
    NOT?: WebhookTemplateWhereInput | WebhookTemplateWhereInput[]
    app_id?: StringFilter<"WebhookTemplate"> | string
    name?: StringFilter<"WebhookTemplate"> | string
    event_type?: StringFilter<"WebhookTemplate"> | string
    is_default?: BoolFilter<"WebhookTemplate"> | boolean
    format?: JsonFilter<"WebhookTemplate">
    headers?: JsonNullableFilter<"WebhookTemplate">
    created_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
    updated_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
  }, "id" | "app_id_name_event_type">

  export type WebhookTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrder
    name?: SortOrder
    event_type?: SortOrder
    is_default?: SortOrder
    format?: SortOrder
    headers?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WebhookTemplateCountOrderByAggregateInput
    _max?: WebhookTemplateMaxOrderByAggregateInput
    _min?: WebhookTemplateMinOrderByAggregateInput
  }

  export type WebhookTemplateScalarWhereWithAggregatesInput = {
    AND?: WebhookTemplateScalarWhereWithAggregatesInput | WebhookTemplateScalarWhereWithAggregatesInput[]
    OR?: WebhookTemplateScalarWhereWithAggregatesInput[]
    NOT?: WebhookTemplateScalarWhereWithAggregatesInput | WebhookTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookTemplate"> | string
    app_id?: StringWithAggregatesFilter<"WebhookTemplate"> | string
    name?: StringWithAggregatesFilter<"WebhookTemplate"> | string
    event_type?: StringWithAggregatesFilter<"WebhookTemplate"> | string
    is_default?: BoolWithAggregatesFilter<"WebhookTemplate"> | boolean
    format?: JsonWithAggregatesFilter<"WebhookTemplate">
    headers?: JsonNullableWithAggregatesFilter<"WebhookTemplate">
    created_at?: DateTimeWithAggregatesFilter<"WebhookTemplate"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"WebhookTemplate"> | Date | string
  }

  export type WebhookLogWhereInput = {
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    id?: StringFilter<"WebhookLog"> | string
    app_id?: StringFilter<"WebhookLog"> | string
    transaction_id?: StringNullableFilter<"WebhookLog"> | string | null
    event_type?: StringFilter<"WebhookLog"> | string
    direction?: StringFilter<"WebhookLog"> | string
    payload?: JsonFilter<"WebhookLog">
    headers?: JsonNullableFilter<"WebhookLog">
    status_code?: IntNullableFilter<"WebhookLog"> | number | null
    response_body?: StringNullableFilter<"WebhookLog"> | string | null
    error_message?: StringNullableFilter<"WebhookLog"> | string | null
    retry_count?: IntFilter<"WebhookLog"> | number
    next_retry_at?: DateTimeNullableFilter<"WebhookLog"> | Date | string | null
    processed_at?: DateTimeFilter<"WebhookLog"> | Date | string
    latency_ms?: IntNullableFilter<"WebhookLog"> | number | null
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }

  export type WebhookLogOrderByWithRelationInput = {
    id?: SortOrder
    app_id?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    headers?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    response_body?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    retry_count?: SortOrder
    next_retry_at?: SortOrderInput | SortOrder
    processed_at?: SortOrder
    latency_ms?: SortOrderInput | SortOrder
    app?: AppOrderByWithRelationInput
    transaction?: TransactionOrderByWithRelationInput
  }

  export type WebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    app_id?: StringFilter<"WebhookLog"> | string
    transaction_id?: StringNullableFilter<"WebhookLog"> | string | null
    event_type?: StringFilter<"WebhookLog"> | string
    direction?: StringFilter<"WebhookLog"> | string
    payload?: JsonFilter<"WebhookLog">
    headers?: JsonNullableFilter<"WebhookLog">
    status_code?: IntNullableFilter<"WebhookLog"> | number | null
    response_body?: StringNullableFilter<"WebhookLog"> | string | null
    error_message?: StringNullableFilter<"WebhookLog"> | string | null
    retry_count?: IntFilter<"WebhookLog"> | number
    next_retry_at?: DateTimeNullableFilter<"WebhookLog"> | Date | string | null
    processed_at?: DateTimeFilter<"WebhookLog"> | Date | string
    latency_ms?: IntNullableFilter<"WebhookLog"> | number | null
    app?: XOR<AppScalarRelationFilter, AppWhereInput>
    transaction?: XOR<TransactionNullableScalarRelationFilter, TransactionWhereInput> | null
  }, "id">

  export type WebhookLogOrderByWithAggregationInput = {
    id?: SortOrder
    app_id?: SortOrder
    transaction_id?: SortOrderInput | SortOrder
    event_type?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    headers?: SortOrderInput | SortOrder
    status_code?: SortOrderInput | SortOrder
    response_body?: SortOrderInput | SortOrder
    error_message?: SortOrderInput | SortOrder
    retry_count?: SortOrder
    next_retry_at?: SortOrderInput | SortOrder
    processed_at?: SortOrder
    latency_ms?: SortOrderInput | SortOrder
    _count?: WebhookLogCountOrderByAggregateInput
    _avg?: WebhookLogAvgOrderByAggregateInput
    _max?: WebhookLogMaxOrderByAggregateInput
    _min?: WebhookLogMinOrderByAggregateInput
    _sum?: WebhookLogSumOrderByAggregateInput
  }

  export type WebhookLogScalarWhereWithAggregatesInput = {
    AND?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    OR?: WebhookLogScalarWhereWithAggregatesInput[]
    NOT?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookLog"> | string
    app_id?: StringWithAggregatesFilter<"WebhookLog"> | string
    transaction_id?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    event_type?: StringWithAggregatesFilter<"WebhookLog"> | string
    direction?: StringWithAggregatesFilter<"WebhookLog"> | string
    payload?: JsonWithAggregatesFilter<"WebhookLog">
    headers?: JsonNullableWithAggregatesFilter<"WebhookLog">
    status_code?: IntNullableWithAggregatesFilter<"WebhookLog"> | number | null
    response_body?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    error_message?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    retry_count?: IntWithAggregatesFilter<"WebhookLog"> | number
    next_retry_at?: DateTimeNullableWithAggregatesFilter<"WebhookLog"> | Date | string | null
    processed_at?: DateTimeWithAggregatesFilter<"WebhookLog"> | Date | string
    latency_ms?: IntNullableWithAggregatesFilter<"WebhookLog"> | number | null
  }

  export type AppCreateInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupCreateNestedManyWithoutAppInput
    transactions?: TransactionCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupUncheckedCreateNestedManyWithoutAppInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUpdateManyWithoutAppNestedInput
    transactions?: TransactionUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUncheckedUpdateManyWithoutAppNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUncheckedUpdateManyWithoutAppNestedInput
  }

  export type AppCreateManyInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AppUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayupCreateInput = {
    id?: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
    app: AppCreateNestedOneWithoutPayupsInput
    transaction?: TransactionCreateNestedOneWithoutPayupInput
  }

  export type PayupUncheckedCreateInput = {
    id?: string
    app_id: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
    transaction?: TransactionUncheckedCreateNestedOneWithoutPayupInput
  }

  export type PayupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app?: AppUpdateOneRequiredWithoutPayupsNestedInput
    transaction?: TransactionUpdateOneWithoutPayupNestedInput
  }

  export type PayupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transaction?: TransactionUncheckedUpdateOneWithoutPayupNestedInput
  }

  export type PayupCreateManyInput = {
    id?: string
    app_id: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
  }

  export type PayupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PayupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionCreateInput = {
    id?: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    app: AppCreateNestedOneWithoutTransactionsInput
    payup: PayupCreateNestedOneWithoutTransactionInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    app_id: string
    payup_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutTransactionsNestedInput
    payup?: PayupUpdateOneRequiredWithoutTransactionNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    payup_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionCreateManyInput = {
    id?: string
    app_id: string
    payup_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    payup_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookTemplateCreateInput = {
    id?: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    app: AppCreateNestedOneWithoutWebhook_templatesInput
  }

  export type WebhookTemplateUncheckedCreateInput = {
    id?: string
    app_id: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutWebhook_templatesNestedInput
  }

  export type WebhookTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookTemplateCreateManyInput = {
    id?: string
    app_id: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogCreateInput = {
    id?: string
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
    app: AppCreateNestedOneWithoutWebhook_logsInput
    transaction?: TransactionCreateNestedOneWithoutWebhook_logsInput
  }

  export type WebhookLogUncheckedCreateInput = {
    id?: string
    app_id: string
    transaction_id?: string | null
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
    app?: AppUpdateOneRequiredWithoutWebhook_logsNestedInput
    transaction?: TransactionUpdateOneWithoutWebhook_logsNestedInput
  }

  export type WebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WebhookLogCreateManyInput = {
    id?: string
    app_id: string
    transaction_id?: string | null
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PayupListRelationFilter = {
    every?: PayupWhereInput
    some?: PayupWhereInput
    none?: PayupWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type WebhookLogListRelationFilter = {
    every?: WebhookLogWhereInput
    some?: WebhookLogWhereInput
    none?: WebhookLogWhereInput
  }

  export type WebhookTemplateListRelationFilter = {
    every?: WebhookTemplateWhereInput
    some?: WebhookTemplateWhereInput
    none?: WebhookTemplateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PayupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    api_key?: SortOrder
    webhook_secret?: SortOrder
    webhook_url?: SortOrder
    is_active?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    api_key?: SortOrder
    webhook_secret?: SortOrder
    webhook_url?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AppMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    provider?: SortOrder
    api_key?: SortOrder
    webhook_secret?: SortOrder
    webhook_url?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AppScalarRelationFilter = {
    is?: AppWhereInput
    isNot?: AppWhereInput
  }

  export type TransactionNullableScalarRelationFilter = {
    is?: TransactionWhereInput | null
    isNot?: TransactionWhereInput | null
  }

  export type PayupCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    return_url?: SortOrder
    cancel_url?: SortOrder
    metadata?: SortOrder
    provider_data?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    expires_at?: SortOrder
    completed_at?: SortOrder
  }

  export type PayupAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PayupMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    return_url?: SortOrder
    cancel_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    expires_at?: SortOrder
    completed_at?: SortOrder
  }

  export type PayupMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    return_url?: SortOrder
    cancel_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    expires_at?: SortOrder
    completed_at?: SortOrder
  }

  export type PayupSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PayupScalarRelationFilter = {
    is?: PayupWhereInput
    isNot?: PayupWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    payup_id?: SortOrder
    external_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    metadata?: SortOrder
    failure_reason?: SortOrder
    provider_data?: SortOrder
    fees?: SortOrder
    net_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    fees?: SortOrder
    net_amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    payup_id?: SortOrder
    external_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    failure_reason?: SortOrder
    fees?: SortOrder
    net_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    payup_id?: SortOrder
    external_id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customer_email?: SortOrder
    customer_name?: SortOrder
    customer_id?: SortOrder
    description?: SortOrder
    failure_reason?: SortOrder
    fees?: SortOrder
    net_amount?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    fees?: SortOrder
    net_amount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type WebhookTemplateApp_idNameEvent_typeCompoundUniqueInput = {
    app_id: string
    name: string
    event_type: string
  }

  export type WebhookTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    name?: SortOrder
    event_type?: SortOrder
    is_default?: SortOrder
    format?: SortOrder
    headers?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    name?: SortOrder
    event_type?: SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    name?: SortOrder
    event_type?: SortOrder
    is_default?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type WebhookLogCountOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    transaction_id?: SortOrder
    event_type?: SortOrder
    direction?: SortOrder
    payload?: SortOrder
    headers?: SortOrder
    status_code?: SortOrder
    response_body?: SortOrder
    error_message?: SortOrder
    retry_count?: SortOrder
    next_retry_at?: SortOrder
    processed_at?: SortOrder
    latency_ms?: SortOrder
  }

  export type WebhookLogAvgOrderByAggregateInput = {
    status_code?: SortOrder
    retry_count?: SortOrder
    latency_ms?: SortOrder
  }

  export type WebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    transaction_id?: SortOrder
    event_type?: SortOrder
    direction?: SortOrder
    status_code?: SortOrder
    response_body?: SortOrder
    error_message?: SortOrder
    retry_count?: SortOrder
    next_retry_at?: SortOrder
    processed_at?: SortOrder
    latency_ms?: SortOrder
  }

  export type WebhookLogMinOrderByAggregateInput = {
    id?: SortOrder
    app_id?: SortOrder
    transaction_id?: SortOrder
    event_type?: SortOrder
    direction?: SortOrder
    status_code?: SortOrder
    response_body?: SortOrder
    error_message?: SortOrder
    retry_count?: SortOrder
    next_retry_at?: SortOrder
    processed_at?: SortOrder
    latency_ms?: SortOrder
  }

  export type WebhookLogSumOrderByAggregateInput = {
    status_code?: SortOrder
    retry_count?: SortOrder
    latency_ms?: SortOrder
  }

  export type PayupCreateNestedManyWithoutAppInput = {
    create?: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput> | PayupCreateWithoutAppInput[] | PayupUncheckedCreateWithoutAppInput[]
    connectOrCreate?: PayupCreateOrConnectWithoutAppInput | PayupCreateOrConnectWithoutAppInput[]
    createMany?: PayupCreateManyAppInputEnvelope
    connect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutAppInput = {
    create?: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput> | TransactionCreateWithoutAppInput[] | TransactionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAppInput | TransactionCreateOrConnectWithoutAppInput[]
    createMany?: TransactionCreateManyAppInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type WebhookLogCreateNestedManyWithoutAppInput = {
    create?: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput> | WebhookLogCreateWithoutAppInput[] | WebhookLogUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutAppInput | WebhookLogCreateOrConnectWithoutAppInput[]
    createMany?: WebhookLogCreateManyAppInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type WebhookTemplateCreateNestedManyWithoutAppInput = {
    create?: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput> | WebhookTemplateCreateWithoutAppInput[] | WebhookTemplateUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookTemplateCreateOrConnectWithoutAppInput | WebhookTemplateCreateOrConnectWithoutAppInput[]
    createMany?: WebhookTemplateCreateManyAppInputEnvelope
    connect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
  }

  export type PayupUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput> | PayupCreateWithoutAppInput[] | PayupUncheckedCreateWithoutAppInput[]
    connectOrCreate?: PayupCreateOrConnectWithoutAppInput | PayupCreateOrConnectWithoutAppInput[]
    createMany?: PayupCreateManyAppInputEnvelope
    connect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput> | TransactionCreateWithoutAppInput[] | TransactionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAppInput | TransactionCreateOrConnectWithoutAppInput[]
    createMany?: TransactionCreateManyAppInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type WebhookLogUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput> | WebhookLogCreateWithoutAppInput[] | WebhookLogUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutAppInput | WebhookLogCreateOrConnectWithoutAppInput[]
    createMany?: WebhookLogCreateManyAppInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type WebhookTemplateUncheckedCreateNestedManyWithoutAppInput = {
    create?: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput> | WebhookTemplateCreateWithoutAppInput[] | WebhookTemplateUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookTemplateCreateOrConnectWithoutAppInput | WebhookTemplateCreateOrConnectWithoutAppInput[]
    createMany?: WebhookTemplateCreateManyAppInputEnvelope
    connect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PayupUpdateManyWithoutAppNestedInput = {
    create?: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput> | PayupCreateWithoutAppInput[] | PayupUncheckedCreateWithoutAppInput[]
    connectOrCreate?: PayupCreateOrConnectWithoutAppInput | PayupCreateOrConnectWithoutAppInput[]
    upsert?: PayupUpsertWithWhereUniqueWithoutAppInput | PayupUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: PayupCreateManyAppInputEnvelope
    set?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    disconnect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    delete?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    connect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    update?: PayupUpdateWithWhereUniqueWithoutAppInput | PayupUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: PayupUpdateManyWithWhereWithoutAppInput | PayupUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: PayupScalarWhereInput | PayupScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutAppNestedInput = {
    create?: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput> | TransactionCreateWithoutAppInput[] | TransactionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAppInput | TransactionCreateOrConnectWithoutAppInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAppInput | TransactionUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: TransactionCreateManyAppInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAppInput | TransactionUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAppInput | TransactionUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type WebhookLogUpdateManyWithoutAppNestedInput = {
    create?: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput> | WebhookLogCreateWithoutAppInput[] | WebhookLogUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutAppInput | WebhookLogCreateOrConnectWithoutAppInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutAppInput | WebhookLogUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: WebhookLogCreateManyAppInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutAppInput | WebhookLogUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutAppInput | WebhookLogUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type WebhookTemplateUpdateManyWithoutAppNestedInput = {
    create?: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput> | WebhookTemplateCreateWithoutAppInput[] | WebhookTemplateUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookTemplateCreateOrConnectWithoutAppInput | WebhookTemplateCreateOrConnectWithoutAppInput[]
    upsert?: WebhookTemplateUpsertWithWhereUniqueWithoutAppInput | WebhookTemplateUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: WebhookTemplateCreateManyAppInputEnvelope
    set?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    disconnect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    delete?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    connect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    update?: WebhookTemplateUpdateWithWhereUniqueWithoutAppInput | WebhookTemplateUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: WebhookTemplateUpdateManyWithWhereWithoutAppInput | WebhookTemplateUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: WebhookTemplateScalarWhereInput | WebhookTemplateScalarWhereInput[]
  }

  export type PayupUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput> | PayupCreateWithoutAppInput[] | PayupUncheckedCreateWithoutAppInput[]
    connectOrCreate?: PayupCreateOrConnectWithoutAppInput | PayupCreateOrConnectWithoutAppInput[]
    upsert?: PayupUpsertWithWhereUniqueWithoutAppInput | PayupUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: PayupCreateManyAppInputEnvelope
    set?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    disconnect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    delete?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    connect?: PayupWhereUniqueInput | PayupWhereUniqueInput[]
    update?: PayupUpdateWithWhereUniqueWithoutAppInput | PayupUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: PayupUpdateManyWithWhereWithoutAppInput | PayupUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: PayupScalarWhereInput | PayupScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput> | TransactionCreateWithoutAppInput[] | TransactionUncheckedCreateWithoutAppInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAppInput | TransactionCreateOrConnectWithoutAppInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAppInput | TransactionUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: TransactionCreateManyAppInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAppInput | TransactionUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAppInput | TransactionUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type WebhookLogUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput> | WebhookLogCreateWithoutAppInput[] | WebhookLogUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutAppInput | WebhookLogCreateOrConnectWithoutAppInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutAppInput | WebhookLogUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: WebhookLogCreateManyAppInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutAppInput | WebhookLogUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutAppInput | WebhookLogUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type WebhookTemplateUncheckedUpdateManyWithoutAppNestedInput = {
    create?: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput> | WebhookTemplateCreateWithoutAppInput[] | WebhookTemplateUncheckedCreateWithoutAppInput[]
    connectOrCreate?: WebhookTemplateCreateOrConnectWithoutAppInput | WebhookTemplateCreateOrConnectWithoutAppInput[]
    upsert?: WebhookTemplateUpsertWithWhereUniqueWithoutAppInput | WebhookTemplateUpsertWithWhereUniqueWithoutAppInput[]
    createMany?: WebhookTemplateCreateManyAppInputEnvelope
    set?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    disconnect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    delete?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    connect?: WebhookTemplateWhereUniqueInput | WebhookTemplateWhereUniqueInput[]
    update?: WebhookTemplateUpdateWithWhereUniqueWithoutAppInput | WebhookTemplateUpdateWithWhereUniqueWithoutAppInput[]
    updateMany?: WebhookTemplateUpdateManyWithWhereWithoutAppInput | WebhookTemplateUpdateManyWithWhereWithoutAppInput[]
    deleteMany?: WebhookTemplateScalarWhereInput | WebhookTemplateScalarWhereInput[]
  }

  export type AppCreateNestedOneWithoutPayupsInput = {
    create?: XOR<AppCreateWithoutPayupsInput, AppUncheckedCreateWithoutPayupsInput>
    connectOrCreate?: AppCreateOrConnectWithoutPayupsInput
    connect?: AppWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutPayupInput = {
    create?: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutPayupInput
    connect?: TransactionWhereUniqueInput
  }

  export type TransactionUncheckedCreateNestedOneWithoutPayupInput = {
    create?: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutPayupInput
    connect?: TransactionWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AppUpdateOneRequiredWithoutPayupsNestedInput = {
    create?: XOR<AppCreateWithoutPayupsInput, AppUncheckedCreateWithoutPayupsInput>
    connectOrCreate?: AppCreateOrConnectWithoutPayupsInput
    upsert?: AppUpsertWithoutPayupsInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutPayupsInput, AppUpdateWithoutPayupsInput>, AppUncheckedUpdateWithoutPayupsInput>
  }

  export type TransactionUpdateOneWithoutPayupNestedInput = {
    create?: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutPayupInput
    upsert?: TransactionUpsertWithoutPayupInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutPayupInput, TransactionUpdateWithoutPayupInput>, TransactionUncheckedUpdateWithoutPayupInput>
  }

  export type TransactionUncheckedUpdateOneWithoutPayupNestedInput = {
    create?: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutPayupInput
    upsert?: TransactionUpsertWithoutPayupInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutPayupInput, TransactionUpdateWithoutPayupInput>, TransactionUncheckedUpdateWithoutPayupInput>
  }

  export type AppCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<AppCreateWithoutTransactionsInput, AppUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AppCreateOrConnectWithoutTransactionsInput
    connect?: AppWhereUniqueInput
  }

  export type PayupCreateNestedOneWithoutTransactionInput = {
    create?: XOR<PayupCreateWithoutTransactionInput, PayupUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: PayupCreateOrConnectWithoutTransactionInput
    connect?: PayupWhereUniqueInput
  }

  export type WebhookLogCreateNestedManyWithoutTransactionInput = {
    create?: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput> | WebhookLogCreateWithoutTransactionInput[] | WebhookLogUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutTransactionInput | WebhookLogCreateOrConnectWithoutTransactionInput[]
    createMany?: WebhookLogCreateManyTransactionInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type WebhookLogUncheckedCreateNestedManyWithoutTransactionInput = {
    create?: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput> | WebhookLogCreateWithoutTransactionInput[] | WebhookLogUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutTransactionInput | WebhookLogCreateOrConnectWithoutTransactionInput[]
    createMany?: WebhookLogCreateManyTransactionInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AppUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<AppCreateWithoutTransactionsInput, AppUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AppCreateOrConnectWithoutTransactionsInput
    upsert?: AppUpsertWithoutTransactionsInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutTransactionsInput, AppUpdateWithoutTransactionsInput>, AppUncheckedUpdateWithoutTransactionsInput>
  }

  export type PayupUpdateOneRequiredWithoutTransactionNestedInput = {
    create?: XOR<PayupCreateWithoutTransactionInput, PayupUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: PayupCreateOrConnectWithoutTransactionInput
    upsert?: PayupUpsertWithoutTransactionInput
    connect?: PayupWhereUniqueInput
    update?: XOR<XOR<PayupUpdateToOneWithWhereWithoutTransactionInput, PayupUpdateWithoutTransactionInput>, PayupUncheckedUpdateWithoutTransactionInput>
  }

  export type WebhookLogUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput> | WebhookLogCreateWithoutTransactionInput[] | WebhookLogUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutTransactionInput | WebhookLogCreateOrConnectWithoutTransactionInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutTransactionInput | WebhookLogUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: WebhookLogCreateManyTransactionInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutTransactionInput | WebhookLogUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutTransactionInput | WebhookLogUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type WebhookLogUncheckedUpdateManyWithoutTransactionNestedInput = {
    create?: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput> | WebhookLogCreateWithoutTransactionInput[] | WebhookLogUncheckedCreateWithoutTransactionInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutTransactionInput | WebhookLogCreateOrConnectWithoutTransactionInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutTransactionInput | WebhookLogUpsertWithWhereUniqueWithoutTransactionInput[]
    createMany?: WebhookLogCreateManyTransactionInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutTransactionInput | WebhookLogUpdateWithWhereUniqueWithoutTransactionInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutTransactionInput | WebhookLogUpdateManyWithWhereWithoutTransactionInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type AppCreateNestedOneWithoutWebhook_templatesInput = {
    create?: XOR<AppCreateWithoutWebhook_templatesInput, AppUncheckedCreateWithoutWebhook_templatesInput>
    connectOrCreate?: AppCreateOrConnectWithoutWebhook_templatesInput
    connect?: AppWhereUniqueInput
  }

  export type AppUpdateOneRequiredWithoutWebhook_templatesNestedInput = {
    create?: XOR<AppCreateWithoutWebhook_templatesInput, AppUncheckedCreateWithoutWebhook_templatesInput>
    connectOrCreate?: AppCreateOrConnectWithoutWebhook_templatesInput
    upsert?: AppUpsertWithoutWebhook_templatesInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutWebhook_templatesInput, AppUpdateWithoutWebhook_templatesInput>, AppUncheckedUpdateWithoutWebhook_templatesInput>
  }

  export type AppCreateNestedOneWithoutWebhook_logsInput = {
    create?: XOR<AppCreateWithoutWebhook_logsInput, AppUncheckedCreateWithoutWebhook_logsInput>
    connectOrCreate?: AppCreateOrConnectWithoutWebhook_logsInput
    connect?: AppWhereUniqueInput
  }

  export type TransactionCreateNestedOneWithoutWebhook_logsInput = {
    create?: XOR<TransactionCreateWithoutWebhook_logsInput, TransactionUncheckedCreateWithoutWebhook_logsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutWebhook_logsInput
    connect?: TransactionWhereUniqueInput
  }

  export type AppUpdateOneRequiredWithoutWebhook_logsNestedInput = {
    create?: XOR<AppCreateWithoutWebhook_logsInput, AppUncheckedCreateWithoutWebhook_logsInput>
    connectOrCreate?: AppCreateOrConnectWithoutWebhook_logsInput
    upsert?: AppUpsertWithoutWebhook_logsInput
    connect?: AppWhereUniqueInput
    update?: XOR<XOR<AppUpdateToOneWithWhereWithoutWebhook_logsInput, AppUpdateWithoutWebhook_logsInput>, AppUncheckedUpdateWithoutWebhook_logsInput>
  }

  export type TransactionUpdateOneWithoutWebhook_logsNestedInput = {
    create?: XOR<TransactionCreateWithoutWebhook_logsInput, TransactionUncheckedCreateWithoutWebhook_logsInput>
    connectOrCreate?: TransactionCreateOrConnectWithoutWebhook_logsInput
    upsert?: TransactionUpsertWithoutWebhook_logsInput
    disconnect?: TransactionWhereInput | boolean
    delete?: TransactionWhereInput | boolean
    connect?: TransactionWhereUniqueInput
    update?: XOR<XOR<TransactionUpdateToOneWithWhereWithoutWebhook_logsInput, TransactionUpdateWithoutWebhook_logsInput>, TransactionUncheckedUpdateWithoutWebhook_logsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PayupCreateWithoutAppInput = {
    id?: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
    transaction?: TransactionCreateNestedOneWithoutPayupInput
  }

  export type PayupUncheckedCreateWithoutAppInput = {
    id?: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
    transaction?: TransactionUncheckedCreateNestedOneWithoutPayupInput
  }

  export type PayupCreateOrConnectWithoutAppInput = {
    where: PayupWhereUniqueInput
    create: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput>
  }

  export type PayupCreateManyAppInputEnvelope = {
    data: PayupCreateManyAppInput | PayupCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutAppInput = {
    id?: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    payup: PayupCreateNestedOneWithoutTransactionInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutAppInput = {
    id?: string
    payup_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutAppInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput>
  }

  export type TransactionCreateManyAppInputEnvelope = {
    data: TransactionCreateManyAppInput | TransactionCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type WebhookLogCreateWithoutAppInput = {
    id?: string
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
    transaction?: TransactionCreateNestedOneWithoutWebhook_logsInput
  }

  export type WebhookLogUncheckedCreateWithoutAppInput = {
    id?: string
    transaction_id?: string | null
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookLogCreateOrConnectWithoutAppInput = {
    where: WebhookLogWhereUniqueInput
    create: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput>
  }

  export type WebhookLogCreateManyAppInputEnvelope = {
    data: WebhookLogCreateManyAppInput | WebhookLogCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type WebhookTemplateCreateWithoutAppInput = {
    id?: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookTemplateUncheckedCreateWithoutAppInput = {
    id?: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookTemplateCreateOrConnectWithoutAppInput = {
    where: WebhookTemplateWhereUniqueInput
    create: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput>
  }

  export type WebhookTemplateCreateManyAppInputEnvelope = {
    data: WebhookTemplateCreateManyAppInput | WebhookTemplateCreateManyAppInput[]
    skipDuplicates?: boolean
  }

  export type PayupUpsertWithWhereUniqueWithoutAppInput = {
    where: PayupWhereUniqueInput
    update: XOR<PayupUpdateWithoutAppInput, PayupUncheckedUpdateWithoutAppInput>
    create: XOR<PayupCreateWithoutAppInput, PayupUncheckedCreateWithoutAppInput>
  }

  export type PayupUpdateWithWhereUniqueWithoutAppInput = {
    where: PayupWhereUniqueInput
    data: XOR<PayupUpdateWithoutAppInput, PayupUncheckedUpdateWithoutAppInput>
  }

  export type PayupUpdateManyWithWhereWithoutAppInput = {
    where: PayupScalarWhereInput
    data: XOR<PayupUpdateManyMutationInput, PayupUncheckedUpdateManyWithoutAppInput>
  }

  export type PayupScalarWhereInput = {
    AND?: PayupScalarWhereInput | PayupScalarWhereInput[]
    OR?: PayupScalarWhereInput[]
    NOT?: PayupScalarWhereInput | PayupScalarWhereInput[]
    id?: StringFilter<"Payup"> | string
    app_id?: StringFilter<"Payup"> | string
    amount?: IntFilter<"Payup"> | number
    currency?: StringFilter<"Payup"> | string
    status?: StringFilter<"Payup"> | string
    customer_email?: StringNullableFilter<"Payup"> | string | null
    customer_name?: StringNullableFilter<"Payup"> | string | null
    customer_id?: StringNullableFilter<"Payup"> | string | null
    description?: StringNullableFilter<"Payup"> | string | null
    return_url?: StringNullableFilter<"Payup"> | string | null
    cancel_url?: StringNullableFilter<"Payup"> | string | null
    metadata?: JsonNullableFilter<"Payup">
    provider_data?: JsonNullableFilter<"Payup">
    created_at?: DateTimeFilter<"Payup"> | Date | string
    updated_at?: DateTimeFilter<"Payup"> | Date | string
    expires_at?: DateTimeFilter<"Payup"> | Date | string
    completed_at?: DateTimeNullableFilter<"Payup"> | Date | string | null
  }

  export type TransactionUpsertWithWhereUniqueWithoutAppInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutAppInput, TransactionUncheckedUpdateWithoutAppInput>
    create: XOR<TransactionCreateWithoutAppInput, TransactionUncheckedCreateWithoutAppInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutAppInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutAppInput, TransactionUncheckedUpdateWithoutAppInput>
  }

  export type TransactionUpdateManyWithWhereWithoutAppInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutAppInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    app_id?: StringFilter<"Transaction"> | string
    payup_id?: StringFilter<"Transaction"> | string
    external_id?: StringNullableFilter<"Transaction"> | string | null
    amount?: IntFilter<"Transaction"> | number
    currency?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    customer_email?: StringNullableFilter<"Transaction"> | string | null
    customer_name?: StringNullableFilter<"Transaction"> | string | null
    customer_id?: StringNullableFilter<"Transaction"> | string | null
    description?: StringNullableFilter<"Transaction"> | string | null
    metadata?: JsonNullableFilter<"Transaction">
    failure_reason?: StringNullableFilter<"Transaction"> | string | null
    provider_data?: JsonNullableFilter<"Transaction">
    fees?: IntNullableFilter<"Transaction"> | number | null
    net_amount?: IntNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type WebhookLogUpsertWithWhereUniqueWithoutAppInput = {
    where: WebhookLogWhereUniqueInput
    update: XOR<WebhookLogUpdateWithoutAppInput, WebhookLogUncheckedUpdateWithoutAppInput>
    create: XOR<WebhookLogCreateWithoutAppInput, WebhookLogUncheckedCreateWithoutAppInput>
  }

  export type WebhookLogUpdateWithWhereUniqueWithoutAppInput = {
    where: WebhookLogWhereUniqueInput
    data: XOR<WebhookLogUpdateWithoutAppInput, WebhookLogUncheckedUpdateWithoutAppInput>
  }

  export type WebhookLogUpdateManyWithWhereWithoutAppInput = {
    where: WebhookLogScalarWhereInput
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyWithoutAppInput>
  }

  export type WebhookLogScalarWhereInput = {
    AND?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
    OR?: WebhookLogScalarWhereInput[]
    NOT?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
    id?: StringFilter<"WebhookLog"> | string
    app_id?: StringFilter<"WebhookLog"> | string
    transaction_id?: StringNullableFilter<"WebhookLog"> | string | null
    event_type?: StringFilter<"WebhookLog"> | string
    direction?: StringFilter<"WebhookLog"> | string
    payload?: JsonFilter<"WebhookLog">
    headers?: JsonNullableFilter<"WebhookLog">
    status_code?: IntNullableFilter<"WebhookLog"> | number | null
    response_body?: StringNullableFilter<"WebhookLog"> | string | null
    error_message?: StringNullableFilter<"WebhookLog"> | string | null
    retry_count?: IntFilter<"WebhookLog"> | number
    next_retry_at?: DateTimeNullableFilter<"WebhookLog"> | Date | string | null
    processed_at?: DateTimeFilter<"WebhookLog"> | Date | string
    latency_ms?: IntNullableFilter<"WebhookLog"> | number | null
  }

  export type WebhookTemplateUpsertWithWhereUniqueWithoutAppInput = {
    where: WebhookTemplateWhereUniqueInput
    update: XOR<WebhookTemplateUpdateWithoutAppInput, WebhookTemplateUncheckedUpdateWithoutAppInput>
    create: XOR<WebhookTemplateCreateWithoutAppInput, WebhookTemplateUncheckedCreateWithoutAppInput>
  }

  export type WebhookTemplateUpdateWithWhereUniqueWithoutAppInput = {
    where: WebhookTemplateWhereUniqueInput
    data: XOR<WebhookTemplateUpdateWithoutAppInput, WebhookTemplateUncheckedUpdateWithoutAppInput>
  }

  export type WebhookTemplateUpdateManyWithWhereWithoutAppInput = {
    where: WebhookTemplateScalarWhereInput
    data: XOR<WebhookTemplateUpdateManyMutationInput, WebhookTemplateUncheckedUpdateManyWithoutAppInput>
  }

  export type WebhookTemplateScalarWhereInput = {
    AND?: WebhookTemplateScalarWhereInput | WebhookTemplateScalarWhereInput[]
    OR?: WebhookTemplateScalarWhereInput[]
    NOT?: WebhookTemplateScalarWhereInput | WebhookTemplateScalarWhereInput[]
    id?: StringFilter<"WebhookTemplate"> | string
    app_id?: StringFilter<"WebhookTemplate"> | string
    name?: StringFilter<"WebhookTemplate"> | string
    event_type?: StringFilter<"WebhookTemplate"> | string
    is_default?: BoolFilter<"WebhookTemplate"> | boolean
    format?: JsonFilter<"WebhookTemplate">
    headers?: JsonNullableFilter<"WebhookTemplate">
    created_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
    updated_at?: DateTimeFilter<"WebhookTemplate"> | Date | string
  }

  export type AppCreateWithoutPayupsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    transactions?: TransactionCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateWithoutPayupsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppCreateOrConnectWithoutPayupsInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutPayupsInput, AppUncheckedCreateWithoutPayupsInput>
  }

  export type TransactionCreateWithoutPayupInput = {
    id?: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    app: AppCreateNestedOneWithoutTransactionsInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutPayupInput = {
    id?: string
    app_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutTransactionInput
  }

  export type TransactionCreateOrConnectWithoutPayupInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
  }

  export type AppUpsertWithoutPayupsInput = {
    update: XOR<AppUpdateWithoutPayupsInput, AppUncheckedUpdateWithoutPayupsInput>
    create: XOR<AppCreateWithoutPayupsInput, AppUncheckedCreateWithoutPayupsInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutPayupsInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutPayupsInput, AppUncheckedUpdateWithoutPayupsInput>
  }

  export type AppUpdateWithoutPayupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateWithoutPayupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUncheckedUpdateManyWithoutAppNestedInput
  }

  export type TransactionUpsertWithoutPayupInput = {
    update: XOR<TransactionUpdateWithoutPayupInput, TransactionUncheckedUpdateWithoutPayupInput>
    create: XOR<TransactionCreateWithoutPayupInput, TransactionUncheckedCreateWithoutPayupInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutPayupInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutPayupInput, TransactionUncheckedUpdateWithoutPayupInput>
  }

  export type TransactionUpdateWithoutPayupInput = {
    id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutTransactionsNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutPayupInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type AppCreateWithoutTransactionsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupUncheckedCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppCreateOrConnectWithoutTransactionsInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutTransactionsInput, AppUncheckedCreateWithoutTransactionsInput>
  }

  export type PayupCreateWithoutTransactionInput = {
    id?: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
    app: AppCreateNestedOneWithoutPayupsInput
  }

  export type PayupUncheckedCreateWithoutTransactionInput = {
    id?: string
    app_id: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
  }

  export type PayupCreateOrConnectWithoutTransactionInput = {
    where: PayupWhereUniqueInput
    create: XOR<PayupCreateWithoutTransactionInput, PayupUncheckedCreateWithoutTransactionInput>
  }

  export type WebhookLogCreateWithoutTransactionInput = {
    id?: string
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
    app: AppCreateNestedOneWithoutWebhook_logsInput
  }

  export type WebhookLogUncheckedCreateWithoutTransactionInput = {
    id?: string
    app_id: string
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookLogCreateOrConnectWithoutTransactionInput = {
    where: WebhookLogWhereUniqueInput
    create: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput>
  }

  export type WebhookLogCreateManyTransactionInputEnvelope = {
    data: WebhookLogCreateManyTransactionInput | WebhookLogCreateManyTransactionInput[]
    skipDuplicates?: boolean
  }

  export type AppUpsertWithoutTransactionsInput = {
    update: XOR<AppUpdateWithoutTransactionsInput, AppUncheckedUpdateWithoutTransactionsInput>
    create: XOR<AppCreateWithoutTransactionsInput, AppUncheckedCreateWithoutTransactionsInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutTransactionsInput, AppUncheckedUpdateWithoutTransactionsInput>
  }

  export type AppUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUncheckedUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUncheckedUpdateManyWithoutAppNestedInput
  }

  export type PayupUpsertWithoutTransactionInput = {
    update: XOR<PayupUpdateWithoutTransactionInput, PayupUncheckedUpdateWithoutTransactionInput>
    create: XOR<PayupCreateWithoutTransactionInput, PayupUncheckedCreateWithoutTransactionInput>
    where?: PayupWhereInput
  }

  export type PayupUpdateToOneWithWhereWithoutTransactionInput = {
    where?: PayupWhereInput
    data: XOR<PayupUpdateWithoutTransactionInput, PayupUncheckedUpdateWithoutTransactionInput>
  }

  export type PayupUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    app?: AppUpdateOneRequiredWithoutPayupsNestedInput
  }

  export type PayupUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WebhookLogUpsertWithWhereUniqueWithoutTransactionInput = {
    where: WebhookLogWhereUniqueInput
    update: XOR<WebhookLogUpdateWithoutTransactionInput, WebhookLogUncheckedUpdateWithoutTransactionInput>
    create: XOR<WebhookLogCreateWithoutTransactionInput, WebhookLogUncheckedCreateWithoutTransactionInput>
  }

  export type WebhookLogUpdateWithWhereUniqueWithoutTransactionInput = {
    where: WebhookLogWhereUniqueInput
    data: XOR<WebhookLogUpdateWithoutTransactionInput, WebhookLogUncheckedUpdateWithoutTransactionInput>
  }

  export type WebhookLogUpdateManyWithWhereWithoutTransactionInput = {
    where: WebhookLogScalarWhereInput
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyWithoutTransactionInput>
  }

  export type AppCreateWithoutWebhook_templatesInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupCreateNestedManyWithoutAppInput
    transactions?: TransactionCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateWithoutWebhook_templatesInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupUncheckedCreateNestedManyWithoutAppInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAppInput
    webhook_logs?: WebhookLogUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppCreateOrConnectWithoutWebhook_templatesInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutWebhook_templatesInput, AppUncheckedCreateWithoutWebhook_templatesInput>
  }

  export type AppUpsertWithoutWebhook_templatesInput = {
    update: XOR<AppUpdateWithoutWebhook_templatesInput, AppUncheckedUpdateWithoutWebhook_templatesInput>
    create: XOR<AppCreateWithoutWebhook_templatesInput, AppUncheckedCreateWithoutWebhook_templatesInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutWebhook_templatesInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutWebhook_templatesInput, AppUncheckedUpdateWithoutWebhook_templatesInput>
  }

  export type AppUpdateWithoutWebhook_templatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUpdateManyWithoutAppNestedInput
    transactions?: TransactionUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateWithoutWebhook_templatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUncheckedUpdateManyWithoutAppNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAppNestedInput
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutAppNestedInput
  }

  export type AppCreateWithoutWebhook_logsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupCreateNestedManyWithoutAppInput
    transactions?: TransactionCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateCreateNestedManyWithoutAppInput
  }

  export type AppUncheckedCreateWithoutWebhook_logsInput = {
    id?: string
    name: string
    provider: string
    api_key: string
    webhook_secret: string
    webhook_url: string
    is_active?: boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    payups?: PayupUncheckedCreateNestedManyWithoutAppInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutAppInput
    webhook_templates?: WebhookTemplateUncheckedCreateNestedManyWithoutAppInput
  }

  export type AppCreateOrConnectWithoutWebhook_logsInput = {
    where: AppWhereUniqueInput
    create: XOR<AppCreateWithoutWebhook_logsInput, AppUncheckedCreateWithoutWebhook_logsInput>
  }

  export type TransactionCreateWithoutWebhook_logsInput = {
    id?: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    app: AppCreateNestedOneWithoutTransactionsInput
    payup: PayupCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateWithoutWebhook_logsInput = {
    id?: string
    app_id: string
    payup_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWebhook_logsInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWebhook_logsInput, TransactionUncheckedCreateWithoutWebhook_logsInput>
  }

  export type AppUpsertWithoutWebhook_logsInput = {
    update: XOR<AppUpdateWithoutWebhook_logsInput, AppUncheckedUpdateWithoutWebhook_logsInput>
    create: XOR<AppCreateWithoutWebhook_logsInput, AppUncheckedCreateWithoutWebhook_logsInput>
    where?: AppWhereInput
  }

  export type AppUpdateToOneWithWhereWithoutWebhook_logsInput = {
    where?: AppWhereInput
    data: XOR<AppUpdateWithoutWebhook_logsInput, AppUncheckedUpdateWithoutWebhook_logsInput>
  }

  export type AppUpdateWithoutWebhook_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUpdateManyWithoutAppNestedInput
    transactions?: TransactionUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUpdateManyWithoutAppNestedInput
  }

  export type AppUncheckedUpdateWithoutWebhook_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    api_key?: StringFieldUpdateOperationsInput | string
    webhook_secret?: StringFieldUpdateOperationsInput | string
    webhook_url?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payups?: PayupUncheckedUpdateManyWithoutAppNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutAppNestedInput
    webhook_templates?: WebhookTemplateUncheckedUpdateManyWithoutAppNestedInput
  }

  export type TransactionUpsertWithoutWebhook_logsInput = {
    update: XOR<TransactionUpdateWithoutWebhook_logsInput, TransactionUncheckedUpdateWithoutWebhook_logsInput>
    create: XOR<TransactionCreateWithoutWebhook_logsInput, TransactionUncheckedCreateWithoutWebhook_logsInput>
    where?: TransactionWhereInput
  }

  export type TransactionUpdateToOneWithWhereWithoutWebhook_logsInput = {
    where?: TransactionWhereInput
    data: XOR<TransactionUpdateWithoutWebhook_logsInput, TransactionUncheckedUpdateWithoutWebhook_logsInput>
  }

  export type TransactionUpdateWithoutWebhook_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    app?: AppUpdateOneRequiredWithoutTransactionsNestedInput
    payup?: PayupUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutWebhook_logsInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    payup_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayupCreateManyAppInput = {
    id?: string
    amount: number
    currency?: string
    status?: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    return_url?: string | null
    cancel_url?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    expires_at: Date | string
    completed_at?: Date | string | null
  }

  export type TransactionCreateManyAppInput = {
    id?: string
    payup_id: string
    external_id?: string | null
    amount: number
    currency?: string
    status: string
    customer_email?: string | null
    customer_name?: string | null
    customer_id?: string | null
    description?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: number | null
    net_amount?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookLogCreateManyAppInput = {
    id?: string
    transaction_id?: string | null
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookTemplateCreateManyAppInput = {
    id?: string
    name: string
    event_type: string
    is_default?: boolean
    format: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type PayupUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transaction?: TransactionUpdateOneWithoutPayupNestedInput
  }

  export type PayupUncheckedUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transaction?: TransactionUncheckedUpdateOneWithoutPayupNestedInput
  }

  export type PayupUncheckedUpdateManyWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    return_url?: NullableStringFieldUpdateOperationsInput | string | null
    cancel_url?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TransactionUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    payup?: PayupUpdateOneRequiredWithoutTransactionNestedInput
    webhook_logs?: WebhookLogUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    payup_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    webhook_logs?: WebhookLogUncheckedUpdateManyWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateManyWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    payup_id?: StringFieldUpdateOperationsInput | string
    external_id?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customer_email?: NullableStringFieldUpdateOperationsInput | string | null
    customer_name?: NullableStringFieldUpdateOperationsInput | string | null
    customer_id?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    failure_reason?: NullableStringFieldUpdateOperationsInput | string | null
    provider_data?: NullableJsonNullValueInput | InputJsonValue
    fees?: NullableIntFieldUpdateOperationsInput | number | null
    net_amount?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
    transaction?: TransactionUpdateOneWithoutWebhook_logsNestedInput
  }

  export type WebhookLogUncheckedUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WebhookLogUncheckedUpdateManyWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    transaction_id?: NullableStringFieldUpdateOperationsInput | string | null
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WebhookTemplateUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookTemplateUncheckedUpdateWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookTemplateUncheckedUpdateManyWithoutAppInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    is_default?: BoolFieldUpdateOperationsInput | boolean
    format?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogCreateManyTransactionInput = {
    id?: string
    app_id: string
    event_type: string
    direction: string
    payload: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: number | null
    response_body?: string | null
    error_message?: string | null
    retry_count?: number
    next_retry_at?: Date | string | null
    processed_at?: Date | string
    latency_ms?: number | null
  }

  export type WebhookLogUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
    app?: AppUpdateOneRequiredWithoutWebhook_logsNestedInput
  }

  export type WebhookLogUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type WebhookLogUncheckedUpdateManyWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    app_id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    direction?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    headers?: NullableJsonNullValueInput | InputJsonValue
    status_code?: NullableIntFieldUpdateOperationsInput | number | null
    response_body?: NullableStringFieldUpdateOperationsInput | string | null
    error_message?: NullableStringFieldUpdateOperationsInput | string | null
    retry_count?: IntFieldUpdateOperationsInput | number
    next_retry_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    latency_ms?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}